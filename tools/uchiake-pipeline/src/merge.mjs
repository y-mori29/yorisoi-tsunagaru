/**
 * composer-extracted-*.jsonl を元レコードと結合して extracted-100.jsonl を生成。
 * （review.mjs が読む形式 = 元レコード + extracted フィールド）
 * 使い方: node src/merge.mjs 4   （チャンク数）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const chunkCount = Number(process.argv[2] ?? 4);

const sample = fs
  .readFileSync(path.join(dataDir, "sample-100.jsonl"), "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));
const byId = new Map(sample.map((r) => [r.id, r]));

const merged = [];
for (let n = 1; n <= chunkCount; n++) {
  const lines = fs
    .readFileSync(path.join(dataDir, `composer-extracted-${n}.jsonl`), "utf8")
    .trim()
    .split("\n");
  for (const line of lines) {
    const o = JSON.parse(line);
    const rec = byId.get(o.id);
    if (!rec) throw new Error(`unknown id ${o.id} in chunk ${n}`);
    merged.push({ ...rec, extracted: o.extracted });
  }
}

if (merged.length !== sample.length) {
  throw new Error(`count mismatch: merged ${merged.length} vs sample ${sample.length}`);
}

const out = path.join(dataDir, "extracted-100.jsonl");
fs.writeFileSync(out, merged.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf8");
console.log(`merged ${merged.length} -> ${out}`);
