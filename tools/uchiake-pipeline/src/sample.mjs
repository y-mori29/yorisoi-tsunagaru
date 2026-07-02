/**
 * normalized.jsonl からジャンル比率を保った100件を抽出 → data/sample-100.jsonl
 * 乱数はシード固定（再現可能）。同一作業者の複数投稿ペアを最低2組含める。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const IN = path.join(here, "..", "data", "normalized.jsonl");
const OUT = path.join(here, "..", "data", "sample-100.jsonl");
const TARGET = 100;

// 単純な決定的乱数（mulberry32）
function rng(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(20260703);

const records = fs
  .readFileSync(IN, "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));

// ジャンル別にグループ化
const byGenre = new Map();
for (const r of records) {
  const g = r.genre || "（ジャンル空欄）";
  if (!byGenre.has(g)) byGenre.set(g, []);
  byGenre.get(g).push(r);
}

// 比例配分（各ジャンル最低1件）
const genres = [...byGenre.entries()].sort((a, b) => b[1].length - a[1].length);
const picked = [];
const pickedIds = new Set();
for (const [, list] of genres) {
  const quota = Math.max(1, Math.round((list.length / records.length) * TARGET));
  const shuffled = [...list].sort(() => rand() - 0.5);
  for (const r of shuffled.slice(0, quota)) {
    if (picked.length >= TARGET) break;
    picked.push(r);
    pickedIds.add(r.id);
  }
}

// 同一作業者の複数投稿ペアを2組確保（同一ペルソナ検証用）
const byWorker = new Map();
for (const r of records) {
  if (!byWorker.has(r.workerId)) byWorker.set(r.workerId, []);
  byWorker.get(r.workerId).push(r);
}
const multiWorkers = [...byWorker.values()].filter((v) => v.length >= 2);
let pairsIncluded = 0;
for (const posts of multiWorkers) {
  if (pairsIncluded >= 2) break;
  const inSample = posts.filter((p) => pickedIds.has(p.id)).length;
  if (inSample >= 2) {
    pairsIncluded++;
    continue;
  }
  for (const p of posts.slice(0, 2)) {
    if (!pickedIds.has(p.id)) {
      // 末尾から非ペア投稿を押し出して差し替え
      const evictIdx = picked.findLastIndex(
        (x) => byWorker.get(x.workerId).length === 1,
      );
      if (evictIdx >= 0) {
        pickedIds.delete(picked[evictIdx].id);
        picked.splice(evictIdx, 1);
      }
      picked.push(p);
      pickedIds.add(p.id);
    }
  }
  pairsIncluded++;
}

const final = picked.slice(0, TARGET);
fs.writeFileSync(OUT, final.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf8");

const genreCount = {};
for (const r of final) genreCount[r.genre] = (genreCount[r.genre] ?? 0) + 1;
console.log(`sampled ${final.length} -> ${OUT}`);
console.log("genre distribution:", JSON.stringify(genreCount, null, 1));
const workerCounts = {};
for (const r of final) workerCounts[r.workerId] = (workerCounts[r.workerId] ?? 0) + 1;
const multi = Object.entries(workerCounts).filter(([, c]) => c >= 2);
console.log("same-worker pairs in sample:", multi.length);
