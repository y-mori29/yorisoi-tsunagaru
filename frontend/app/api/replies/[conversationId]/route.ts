import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { mockMessages } from "@/lib/mock/messages";
import { mockConversations } from "@/lib/mock/conversations";
import type { ReplySuggestion } from "@/lib/api/types";

/**
 * AI 返信候補を Gemini 3.1 Flash Lite で生成する API。
 *
 * 入力：conversationId（params）
 * 出力：{ suggestions: ReplySuggestion[] }
 *
 * 設計：
 *  - server side でのみ GEMINI_API_KEY を扱う（client に露出しない）
 *  - 最後のメッセージが自分（u-mori）の場合は空配列を返す
 *  - 公式アカウント（c-004）も空配列
 *  - JSON Schema で 3 案構造を強制
 */

const MY_ID = "u-mori";

const SYSTEM_PROMPT = `あなたは、患者向け SNS「よりそい つながる」の返信補助 AI です。

このアプリは慢性疾患（潰瘍性大腸炎・クローン病・SLE 等）の患者さんが、
匿名で穏やかに繋がる場所です。森さん（わたし）が、相手のメッセージに
返信するための候補を、3 つ生成してください。

【トーン・ルール】
- 穏やか、明朝風。「そっと」「ゆっくり」「ふっと」「ちいさく」などの柔らかい言葉
- 相手の状態をラベリングしない（「しんどい人」「病気の方」と決めつけない）
- 共感ベース：自分の経験や気持ちを少しだけ重ねる
- 短く：2〜3 行（合計 80 文字以内）
- 改行は \\n（自然な間で）
- 「、」を多めに、間 を 取る感じで
- 一部の言葉に半角スペースで間を入れる（例：「いい 時間」「ベランダで 風」「ゆっくり 話せたら」）
- 病気のアドバイス・診断・治療方針には触れない
- 「頑張って」「大丈夫」など励まし系の決まり文句は避ける

【3 案の方向】
- "empathy": そっと寄り添う（相手の気持ちを静かに受け止める）
- "question": 聞いてみる（軽く問いかけて会話を続ける）
- "thanks": ありがとうを返す（感謝で受け止める）`;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  const { conversationId } = await params;

  const messages = mockMessages[conversationId] ?? [];
  const conv = mockConversations.find((c) => c.id === conversationId);

  if (messages.length === 0 || !conv) {
    return NextResponse.json({ suggestions: [] });
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.senderId === MY_ID) {
    // 最新が自分の発言 → 候補不要
    return NextResponse.json({ suggestions: [] });
  }

  if (conv.category === "official") {
    // 運営アカウント → 候補なし
    return NextResponse.json({ suggestions: [] });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY が設定されていません。" },
      { status: 500 },
    );
  }

  // 直近 8 通までを履歴として渡す（context 節約）
  const history = messages
    .slice(-8)
    .map((m) => {
      const who = m.senderId === MY_ID ? "わたし" : conv.partner.name;
      return `${who}：${m.body}`;
    })
    .join("\n\n");

  const userPrompt = `相手（${conv.partner.name}・${conv.partner.roomName ?? "ルーム未設定"}）との 会話履歴：

${history}

上記の 最後のメッセージへの 返信候補を、3 つ 生成してください。
empathy / question / thanks の 3 種類が それぞれ 1 案ずつ になるようにしてください。`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tone: {
                    type: Type.STRING,
                    enum: ["empathy", "question", "thanks"],
                  },
                  body: { type: Type.STRING },
                },
                required: ["tone", "body"],
              },
            },
          },
          required: ["suggestions"],
        },
        temperature: 0.8,
      },
    });

    const text = result.text ?? "{}";
    const parsed = JSON.parse(text) as {
      suggestions?: Array<{ tone: ReplySuggestion["tone"]; body: string }>;
    };

    const suggestions: ReplySuggestion[] = (parsed.suggestions ?? []).map(
      (s, i) => ({
        id: `r-${conversationId}-${i}-${Date.now()}`,
        tone: s.tone,
        body: s.body,
      }),
    );

    return NextResponse.json({ suggestions });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Gemini 呼び出しに失敗しました: ${message}` },
      { status: 500 },
    );
  }
}
