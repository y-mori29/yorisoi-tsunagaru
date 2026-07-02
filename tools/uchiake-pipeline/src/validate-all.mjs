/** 全チャンクを一括再検証する。使い方: node src/validate-all.mjs */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const nums = fs
  .readdirSync(dataDir)
  .map((f) => f.match(/^composer-extracted-(\d+)\.jsonl$/)?.[1])
  .filter(Boolean)
  .map(Number)
  .sort((a, b) => a - b);

let pass = 0;
const fails = [];
for (const n of nums) {
  try {
    execFileSync("node", [path.join(here, "validate.mjs"), String(n)], { stdio: "pipe" });
    pass++;
  } catch (err) {
    fails.push({ n, out: String(err.stdout ?? "").slice(0, 500) });
  }
}
console.log(`validated ${nums.length} chunks: PASS ${pass}, FAIL ${fails.length}`);
for (const f of fails) {
  console.log(`--- chunk ${f.n} ---`);
  console.log(f.out);
}
if (fails.length > 0) process.exit(1);
