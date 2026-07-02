/**
 * sample-100.jsonl の各体験談に Gemini で構造情報を付与 → data/extracted-100.jsonl
 *
 * 付与するもの: 病名（正規化）・症状・悩みトピック・フィード用の「声」切り出し・安全フラグ・品質評価
 * 方針: 体験の中身は改変しない。「声」は原文からの抜き出し（文頭文末の軽い調整のみ可）。
 *
 * 使い方: node src/extract.mjs [--limit N]
 */
import { GoogleGenAI, Type } from "@google/genai";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const IN = path.join(here, "..", "data", "sample-100.jsonl");
const OUT = path.join(here, "..", "data", "extracted-100.jsonl");
const ENV_PATH = path.join(here, "..", "..", "..", "secure", ".env");

function loadApiKey() {
  const env = fs.readFileSync(ENV_PATH, "utf8");
  const m = env.match(/^\s*GEMINI_API_KEY\s*=\s*(.+)\s*$/m);
  if (!m) throw new Error("GEMINI_API_KEY not found in secure/.env");
  return m[1].trim();
}

const SYSTEM_PROMPT = `あなたは、患者向けコミュニティ「よりそい つながる」のデータ整備を行うアシスタントです。
入力は、実在の方が書いた病気・症状の体験談（5問の設問に沿った回答）です。
以下を抽出・分類してください。**本文の内容を創作・改変してはいけません。**

【抽出項目】
1. diseases: 本文中に出てくる病名・診断名。正式名称に正規化する（例:「UC」→「潰瘍性大腸炎」）。診断名が明記されていない場合は空配列。
2. primaryDisease: この体験談の中心となる病名1つ。診断名がなく症状のみの場合は null。
3. symptoms: 本文に出てくる症状（短い名詞句。例:「手の震え」「下痢」「不眠」）。最大6個。
4. topics: 悩みの種類。次から該当するものすべて: 仕事・学校 / 家族・パートナー / お金 / 通院・治療 / 薬との付き合い / 診断がつくまで / 眠り / 食事 / 外出・移動 / 見た目・周囲の目 / 気持ちのゆらぎ / 妊娠・出産 / その他
5. voice: フィードに流す短い「声」。Q2（不満・不安）またはQ5（課題）を中心に、**原文から1〜3文をそのまま抜き出す**。文頭・文末を整えるための最小限の調整（接続詞の削除、句点の追加）のみ可。改変・要約・創作は禁止。80〜160字程度が理想。
6. voiceSource: voice をどの設問から取ったか（"q1"〜"q5"）。
7. safety: 除外判定。personalInfo=個人が特定できる情報（実名・勤務先名・地名の細かい組合せ等）を含む / aggressive=特定個人・属性への攻撃的表現を含む / medicalMisinfo=明らかに危険な医療デマを断定的に勧めている。**ネガティブな感情（不満・不安・苛立ち）は除外理由にしない。**
8. quality: good=そのまま使える / ok=使えるが声の候補が弱い / poor=短すぎる・内容が薄い・体験談として成立していない`;

async function extractOne(ai, rec) {
  const userPrompt = `タイトル: ${rec.title}
ジャンル: ${rec.genre} / 年代: ${rec.age} / 性別: ${rec.gender}

Q1 症状・状態の概要:
${rec.q1_overview}

Q2 不満・不安・苛立ち・大変なこと:
${rec.q2_complaint}

Q3 きっかけから現在までの経過:
${rec.q3_course}

Q4 薬・治療:
${rec.q4_treatment}

Q5 抱えている課題・困りごと:
${rec.q5_issue}`;

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: userPrompt,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseases: { type: Type.ARRAY, items: { type: Type.STRING } },
          primaryDisease: { type: Type.STRING, nullable: true },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
          topics: { type: Type.ARRAY, items: { type: Type.STRING } },
          voice: { type: Type.STRING },
          voiceSource: { type: Type.STRING, enum: ["q1", "q2", "q3", "q4", "q5"] },
          safety: {
            type: Type.OBJECT,
            properties: {
              personalInfo: { type: Type.BOOLEAN },
              aggressive: { type: Type.BOOLEAN },
              medicalMisinfo: { type: Type.BOOLEAN },
              note: { type: Type.STRING },
            },
            required: ["personalInfo", "aggressive", "medicalMisinfo"],
          },
          quality: { type: Type.STRING, enum: ["good", "ok", "poor"] },
        },
        required: ["diseases", "primaryDisease", "symptoms", "topics", "voice", "voiceSource", "safety", "quality"],
      },
      temperature: 0.2,
    },
  });
  return JSON.parse(result.text ?? "{}");
}

const limitArg = process.argv.indexOf("--limit");
const limit = limitArg >= 0 ? Number(process.argv[limitArg + 1]) : Infinity;

const records = fs
  .readFileSync(IN, "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l))
  .slice(0, limit);

const ai = new GoogleGenAI({ apiKey: loadApiKey() });
const CONCURRENCY = 5;
const results = new Array(records.length);
const errors = [];
let done = 0;

async function worker(queue) {
  for (;;) {
    const idx = queue.shift();
    if (idx === undefined) return;
    const rec = records[idx];
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const extracted = await extractOne(ai, rec);
        results[idx] = { ...rec, extracted };
        break;
      } catch (err) {
        if (attempt === 2) {
          errors.push({ id: rec.id, error: String(err).slice(0, 300) });
          results[idx] = { ...rec, extracted: null };
        } else {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }
    done++;
    if (done % 10 === 0) console.log(`progress: ${done}/${records.length}`);
  }
}

const queue = records.map((_, i) => i);
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

fs.writeFileSync(OUT, results.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf8");
console.log(`extracted ${results.filter((r) => r.extracted).length}/${records.length} -> ${OUT}`);
if (errors.length > 0) {
  console.log("errors:", JSON.stringify(errors, null, 1));
}
