import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { mockLetters } from "@/lib/mock/letters";
import { mockComments } from "@/lib/mock/comments";
import type { CommentSuggestion } from "@/lib/api/types";

/**
 * 投稿（Voice / Letter）に対する AI コメント候補を Gemini 3.1 Flash Lite で生成する API（Phase 7C）。
 *
 * 入力：parentId（Voice/Letter の id）
 * 出力：{ suggestions: CommentSuggestion[] }
 *
 * 設計：
 *  - server side でのみ GEMINI_API_KEY を扱う
 *  - 既存コメントを context として渡し、同じ語り口に重ならないよう「変化」を促す
 *  - JSON Schema で empathy / question / thanks の 3 案を強制
 *
 * 既存 /api/replies は 1on1 DM 用、こちらは公開投稿のコメント用。
 * トーンも DM より さらに穏やか・短文・押し付け禁止に寄せる（みんなの目に触れるため）。
 */

const SYSTEM_PROMPT = `あなたは、患者向け SNS「よりそい つながる」のコメント補助 AI です。

このアプリは慢性疾患（潰瘍性大腸炎・クローン病・SLE 等）の患者さんが、
匿名で穏やかに繋がる場所です。森さん（わたし）が、公開投稿に対して
コメントを書くための候補を、3 つ生成してください。

【トーン・ルール】
- 穏やか、明朝風。「そっと」「ゆっくり」「ふっと」「ちいさく」などの柔らかい言葉
- 相手の状態をラベリングしない（「しんどい人」「病気の方」と決めつけない）
- 共感ベース：自分の経験や気持ちを少しだけ重ねる
- 短く：1〜2 行（合計 60 文字以内 — 公開コメントは DM より さらに短く）
- 改行は \\n（自然な間で）
- 「、」を多めに、間 を 取る感じで
- 一部の言葉に半角スペースで間を入れる（例：「いい 時間」「ベランダで 風」）
- 病気のアドバイス・診断・治療方針には触れない
- 「頑張って」「大丈夫」など励まし系の決まり文句は避ける
- 公開投稿のコメントなので、第三者にも違和感のない範囲で
- 既存のコメントと同じ言い回しを避け、新しい角度から

【3 案の方向】
- "empathy": そっと寄り添う（相手の気持ちを静かに受け止める）
- "question": 聞いてみる（軽く問いかけて会話を続ける）
- "thanks": ありがとうを返す（投稿してくれたこと自体への感謝）`;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ parentId: string }> },
) {
  const { parentId } = await params;

  const letter = mockLetters[parentId];
  if (!letter) {
    return NextResponse.json({ suggestions: [] });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY が設定されていません。" },
      { status: 500 },
    );
  }

  const existingComments = mockComments[parentId] ?? [];
  const existingLines = existingComments
    .map((c) => `- ${c.authorName}: ${c.body.replace(/\n/g, " / ")}`)
    .join("\n");

  const userPrompt = `投稿者：${letter.fromName}${
    letter.fromMeta ? `（${letter.fromMeta}）` : ""
  }
投稿本文：
${letter.body}

${
  existingComments.length > 0
    ? `これまでに付いているコメント：\n${existingLines}\n\n`
    : ""
}上記の 投稿への コメント候補を、3 つ 生成してください。
empathy / question / thanks の 3 種類が それぞれ 1 案ずつ になるようにしてください。
既存のコメントと表現が重ならないよう、新しい角度から書いてください。`;

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
        temperature: 0.85,
      },
    });

    const text = result.text ?? "{}";
    const parsed = JSON.parse(text) as {
      suggestions?: Array<{ tone: CommentSuggestion["tone"]; body: string }>;
    };

    const suggestions: CommentSuggestion[] = (parsed.suggestions ?? []).map(
      (s, i) => ({
        id: `cs-${parentId}-${i}-${Date.now()}`,
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
