/**
 * extracted-100.jsonl から森さん目視確認用レビューMarkdownを生成。
 * - 統計（病名抽出率・品質分布・安全フラグ）
 * - 原文と抽出結果の対比 10件
 * - フィード完成イメージ（声＋ペルソナ名）10件
 * 出力: data/review-100.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assignPersonaNames } from "./persona.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const IN = path.join(here, "..", "data", "extracted-100.jsonl");
const OUT = path.join(here, "..", "data", "review-100.md");

const records = fs
  .readFileSync(IN, "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));

const ok = records.filter((r) => r.extracted);
const personaMap = assignPersonaNames(ok.map((r) => r.workerId));

// --- 統計 ---
const stats = {
  total: records.length,
  extracted: ok.length,
  withDisease: ok.filter((r) => r.extracted.primaryDisease).length,
  quality: { good: 0, ok: 0, poor: 0 },
  safetyFlagged: [],
  voiceLengths: [],
};
for (const r of ok) {
  stats.quality[r.extracted.quality] = (stats.quality[r.extracted.quality] ?? 0) + 1;
  const s = r.extracted.safety;
  if (s.personalInfo || s.aggressive || s.medicalMisinfo) {
    stats.safetyFlagged.push({ id: r.id, title: r.title, safety: s });
  }
  stats.voiceLengths.push(r.extracted.voice.length);
}
const avgVoice = Math.round(stats.voiceLengths.reduce((a, b) => a + b, 0) / stats.voiceLengths.length);

const diseaseCount = {};
for (const r of ok) {
  const d = r.extracted.primaryDisease;
  if (d) diseaseCount[d] = (diseaseCount[d] ?? 0) + 1;
}
const topDiseases = Object.entries(diseaseCount).sort((a, b) => b[1] - a[1]).slice(0, 20);

// --- 対比サンプル: 品質good から病名あり/なし・ジャンル散らして10件 ---
const seenGenre = new Set();
const detailSamples = [];
for (const r of ok) {
  if (detailSamples.length >= 10) break;
  if (r.extracted.quality === "poor") continue;
  if (seenGenre.has(r.genre) && detailSamples.length < 8) continue;
  seenGenre.add(r.genre);
  detailSamples.push(r);
}

// --- 同一作業者ペア ---
const byWorker = new Map();
for (const r of ok) {
  if (!byWorker.has(r.workerId)) byWorker.set(r.workerId, []);
  byWorker.get(r.workerId).push(r);
}
const pairs = [...byWorker.entries()]
  .filter(([workerId, posts]) => workerId && posts.length >= 2)
  .map(([, posts]) => posts);

let md = `# うちあけ→つながる 抽出バッチ レビュー（100件試作）

生成日: ${new Date().toISOString().slice(0, 10)}
抽出: Cursorサブエージェント（composer-2.5-fast）×4並列 / 対象: ジャンル層化サンプル100件

## 1. 統計

- 抽出成功: ${stats.extracted}/${stats.total}
- 病名（診断名）が特定できたもの: ${stats.withDisease}/${stats.extracted}（残りは症状のみ→症状・悩みトピックで流す）
- 品質: good ${stats.quality.good} / ok ${stats.quality.ok} / poor ${stats.quality.poor}（poorは組み込み対象外の候補）
- 安全フラグ: ${stats.safetyFlagged.length}件（下記）
- 「声」の平均文字数: ${avgVoice}字

### 病名の抽出上位

| 病名 | 件数 |
|---|---|
${topDiseases.map(([d, c]) => `| ${d} | ${c} |`).join("\n")}

### 安全フラグつき（目視確認をお願いします）

${stats.safetyFlagged.length === 0 ? "なし" : stats.safetyFlagged.map((f) => `- ${f.id}「${f.title}」 personalInfo=${f.safety.personalInfo} aggressive=${f.safety.aggressive} medicalMisinfo=${f.safety.medicalMisinfo} ${f.safety.note ?? ""}`).join("\n")}

## 2. フィード完成イメージ（このままホームに流れる想定）

`;

for (const r of detailSamples) {
  const e = r.extracted;
  const persona = personaMap.get(r.workerId);
  const tag = e.primaryDisease ?? e.symptoms[0] ?? r.genre;
  md += `> **${persona}** ・ ${tag}
> ${e.voice.replace(/\n/g, " ")}

`;
}

md += `## 3. 原文と抽出の対比（10件）

`;

for (const r of detailSamples) {
  const e = r.extracted;
  md += `### ${r.id}「${r.title}」（${r.genre} / ${r.age} / ${r.gender}）→ ペルソナ名: ${personaMap.get(r.workerId)}

- 病名: ${e.diseases.join("、") || "（診断名なし）"} / 中心: ${e.primaryDisease ?? "なし"}
- 症状: ${e.symptoms.join("、")}
- トピック: ${e.topics.join("、")}
- 品質: ${e.quality}
- 切り出した声（${e.voiceSource}から）:
  - ${e.voice.replace(/\n/g, " ")}
- 元のQ2原文: ${r.q2_complaint.replace(/\n/g, " ").slice(0, 200)}
- 元のQ5原文: ${r.q5_issue.replace(/\n/g, " ").slice(0, 200)}

`;
}

md += `## 4. 同一作業者ペア（同一ペルソナになることの確認）

`;
for (const posts of pairs) {
  const persona = personaMap.get(posts[0].workerId);
  md += `- ペルソナ「${persona}」（作業者 ${posts[0].workerId}）: ${posts.map((p) => `「${p.title}」(${p.extracted?.primaryDisease ?? p.genre})`).join(" / ")}\n`;
}

md += `
## 5. 確認をお願いしたい点

1. 「声」の長さ・生の声感はこれで良いか（2026-07-03改訂: 原文から2〜6文・120〜300字目安・整えすぎない。今回平均${avgVoice}字）

（決定済み: ペルソナ名=人名系のみ／病名なし=症状タグで流す／poor判定・安全フラグは組み込み除外）
`;

fs.writeFileSync(OUT, md, "utf8");
console.log(`review -> ${OUT}`);
console.log(`stats: extracted=${stats.extracted} withDisease=${stats.withDisease} quality=${JSON.stringify(stats.quality)} flagged=${stats.safetyFlagged.length}`);
