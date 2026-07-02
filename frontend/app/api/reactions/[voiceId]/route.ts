import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { mockVoices } from "@/lib/mock/voices";
import { myVoices } from "@/lib/mock/me";

/**
 * 投稿（Voice）に対する AI リアクション候補を Gemini 3.1 Flash Lite で生成。
 *
 * 入力：voiceId（mockVoices / myVoices から検索）
 * 出力：{ suggestions: { id, icon, label }[] }
 *
 * icon は既存のリアクションアイコン辞書から AI に選ばせる（enum 制約）。
 * label は AI 生成（5 字以内・素直な動詞または感情ラベル）。
 */

/** 投稿リアクションに使えるアイコン名（lib/icons.ts と一致） */
const REACTION_ICONS = [
  "acknowledge", // うなずき
  "leaf",        // 葉（わかる・そっと）
  "understand",  // 読んだよ
  "thanks",      // ありがとう
  "hand",        // 受け取る
  "flower",      // 咲く
  "heart",       // いいね
  "sparkle",     // きらり
] as const;
type ReactionIconName = (typeof REACTION_ICONS)[number];

const SYSTEM_PROMPT = `あなたは、患者向け SNS「よりそい つながる」のリアクション補助 AI です。

このアプリは慢性疾患の患者さんが、匿名で穏やかに繋がる場所です。
投稿に対して、押すだけで返せる「やさしい リアクション」を 3 つ提案してください。

【トーン・ルール】
- 短い：label は 4〜6 文字（例：「そう」「わかる」「読んだよ」「ありがとう」「あたたかい」「いいね」）
- 穏やか：「がんばって」「だいじょうぶ」などの押し付け系は避ける
- 投稿の感情に合わせる：同調・受け止め・小さな喜び・労い・共感
- 既存のリアクション（「そう」「わかる」「読んだよ」など）と重ならない方向で 3 案

【icon の選び方】
- "acknowledge"：うなずき・同意（「そう」「わかる」）
- "leaf"：葉・そっと添える（「わかる」「ふっと」）
- "understand"：見守る（「読んだよ」「気づいた」）
- "thanks"：ありがとう・感謝（「ありがとう」「あたたかい」）
- "hand"：そっと差し出す（「届いた」「受け取った」）
- "flower"：咲く・喜び（「いいね」「ふんわり」「ほっこり」）
- "heart"：愛しい（「いとおしい」「すき」）
- "sparkle"：きらめき（「きらり」「ふしぎ」）

3 案は同じトーンに偏らないようにしてください。`;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ voiceId: string }> },
) {
  const { voiceId } = await params;

  const all = [...mockVoices, ...myVoices];
  const voice = all.find((v) => v.id === voiceId);
  if (!voice) {
    return NextResponse.json({ suggestions: [] });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY が設定されていません。" },
      { status: 500 },
    );
  }

  const existingLabels = voice.reactions.map((r) => r.label).join("・") || "（無し）";
  const userPrompt = `投稿者：${voice.authorName}（${voice.roomName ?? "ルーム未設定"}）

投稿本文：
${voice.body}

既に押されている リアクション：${existingLabels}

上記の 投稿に対する、新しい リアクション 候補 を 3 つ 生成してください。
既存と 同じ 言葉は 避けてください。`;

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
                  icon: {
                    type: Type.STRING,
                    enum: [...REACTION_ICONS],
                  },
                  label: { type: Type.STRING },
                },
                required: ["icon", "label"],
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
      suggestions?: Array<{ icon: ReactionIconName; label: string }>;
    };

    // 既存ラベルと重複するものを除外
    const existing = new Set(voice.reactions.map((r) => r.label));
    const suggestions = (parsed.suggestions ?? [])
      .filter((s) => !existing.has(s.label))
      .map((s, i) => ({
        id: `react-${voiceId}-${i}-${Date.now()}`,
        icon: s.icon,
        label: s.label,
      }));

    return NextResponse.json({ suggestions });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Gemini 呼び出しに失敗しました: ${message}` },
      { status: 500 },
    );
  }
}
