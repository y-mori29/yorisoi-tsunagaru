/**
 * 全件処理用チャンク準備。
 * normalized.jsonl から、sample-100.jsonl で処理済みのIDを除いた残りを
 * chunk-5.jsonl 以降に40件ずつ分割する（chunk-1〜4は試作100件で使用済み）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const CHUNK_SIZE = 40;
const START_INDEX = 5;

const readJsonl = (p) =>
  fs.readFileSync(p, "utf8").trim().split("\n").map((l) => JSON.parse(l));

const all = readJsonl(path.join(dataDir, "normalized.jsonl"));
const doneIds = new Set(readJsonl(path.join(dataDir, "sample-100.jsonl")).map((r) => r.id));
const remaining = all.filter((r) => !doneIds.has(r.id));

let chunkNo = START_INDEX;
for (let i = 0; i < remaining.length; i += CHUNK_SIZE) {
  const chunk = remaining.slice(i, i + CHUNK_SIZE);
  fs.writeFileSync(
    path.join(dataDir, `chunk-${chunkNo}.jsonl`),
    chunk.map((r) => JSON.stringify(r)).join("\n") + "\n",
    "utf8",
  );
  chunkNo++;
}
console.log(`total normalized: ${all.length}`);
console.log(`already done (sample): ${[...doneIds].filter((id) => all.some((r) => r.id === id)).length} of ${doneIds.size}`);
console.log(`remaining: ${remaining.length} -> chunks ${START_INDEX}..${chunkNo - 1} (${CHUNK_SIZE}/chunk)`);
