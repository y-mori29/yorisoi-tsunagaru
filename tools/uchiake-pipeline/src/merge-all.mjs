/**
 * 全チャンクの composer-extracted-*.jsonl を normalized.jsonl と結合し、
 * ペルソナ名を付与して extracted-full.jsonl を生成。統計も出力する。
 * 使い方: node src/merge-all.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assignPersonaNames } from "./persona.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");

const readJsonl = (p) =>
  fs.readFileSync(p, "utf8").trim().split("\n").map((l) => JSON.parse(l));

const normalized = readJsonl(path.join(dataDir, "normalized.jsonl"));
const byId = new Map(normalized.map((r) => [r.id, r]));

const chunkFiles = fs
  .readdirSync(dataDir)
  .filter((f) => /^composer-extracted-\d+\.jsonl$/.test(f))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

const merged = new Map();
for (const f of chunkFiles) {
  for (const o of readJsonl(path.join(dataDir, f))) {
    const rec = byId.get(o.id);
    if (!rec) continue; // 旧採番の空回答行（サンプル内のpoor 3件など）は破棄
    if (merged.has(o.id)) throw new Error(`duplicate id ${o.id} in ${f}`);
    merged.set(o.id, { ...rec, extracted: o.extracted });
  }
}

// 人物キーは作業者ページURL由来の personKey（同一人物の複数投稿に同じ名前を付ける）。
// ただし多投稿者は1名に見せると不自然（最多88件・多疾患）なので、
// 上限 MAX_POSTS_PER_PERSONA 件ごとに仮想ペルソナへ分割する（2026-07-03 森さん承認・案1）。
// 分割時は疾患→ジャンル→id順に並べてから区切ることで、同じ病気の投稿が同じ名前にまとまりやすくする。
const MAX_POSTS_PER_PERSONA = 6;
const keyOf = (r) => r.personKey || r.workerId;

const byPerson = new Map();
for (const r of merged.values()) {
  const k = keyOf(r);
  if (!byPerson.has(k)) byPerson.set(k, []);
  byPerson.get(k).push(r);
}
const virtualKeyById = new Map();
for (const [k, posts] of byPerson) {
  posts.sort((a, b) => {
    const da = a.extracted?.primaryDisease ?? "";
    const db = b.extracted?.primaryDisease ?? "";
    if (da !== db) return da < db ? -1 : 1;
    const ga = a.genre ?? "";
    const gb = b.genre ?? "";
    if (ga !== gb) return ga < gb ? -1 : 1;
    return a.id < b.id ? -1 : 1;
  });
  posts.forEach((r, i) => {
    const part = Math.floor(i / MAX_POSTS_PER_PERSONA);
    virtualKeyById.set(r.id, part === 0 ? k : `${k}#${part}`);
  });
}

const personaMap = assignPersonaNames([...virtualKeyById.values()]);
const out = [...merged.values()].map((r) => ({
  ...r,
  personaName: personaMap.get(virtualKeyById.get(r.id)),
}));

fs.writeFileSync(
  path.join(dataDir, "extracted-full.jsonl"),
  out.map((r) => JSON.stringify(r)).join("\n") + "\n",
  "utf8",
);

// 統計
const stats = { total: out.length, withDisease: 0, good: 0, ok: 0, poor: 0, flagged: 0 };
const flaggedIds = [];
const diseaseCount = {};
let voiceLenSum = 0;
let voiceCount = 0;
for (const r of out) {
  const e = r.extracted;
  if (!e) continue;
  if (e.primaryDisease) {
    stats.withDisease++;
    diseaseCount[e.primaryDisease] = (diseaseCount[e.primaryDisease] ?? 0) + 1;
  }
  stats[e.quality] = (stats[e.quality] ?? 0) + 1;
  if (e.safety?.personalInfo || e.safety?.aggressive || e.safety?.medicalMisinfo) {
    stats.flagged++;
    flaggedIds.push(r.id);
  }
  if (e.quality !== "poor") {
    voiceLenSum += e.voice.trim().length;
    voiceCount++;
  }
}

const missing = normalized.filter((r) => !merged.has(r.id));
console.log(`merged: ${out.length} / normalized: ${normalized.length} (missing: ${missing.length})`);
if (missing.length > 0) console.log("missing ids:", missing.slice(0, 20).map((r) => r.id).join(", "));
console.log(`unique personas: ${new Set(out.map((r) => r.personaName)).size}`);
console.log(`withDisease: ${stats.withDisease}, quality good/ok/poor: ${stats.good}/${stats.ok}/${stats.poor}`);
console.log(`avg voice length (excl poor): ${Math.round(voiceLenSum / voiceCount)}`);
console.log(`safety flagged: ${stats.flagged} -> ${flaggedIds.join(", ")}`);
const top = Object.entries(diseaseCount).sort((a, b) => b[1] - a[1]).slice(0, 15);
console.log("top diseases:", top.map(([d, c]) => `${d}(${c})`).join(", "));
