/**
 * ペルソナ付与の検証:
 * 1) 同じ名前の投稿はすべて同一人物（personKey）のもの
 * 2) 1つの名前あたりの投稿数が上限(6)以内
 * 3) 全投稿に名前が付いている
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MAX = 6;
const here = path.dirname(fileURLToPath(import.meta.url));
const out = fs
  .readFileSync(path.join(here, "..", "data", "extracted-full.jsonl"), "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));

const noName = out.filter((r) => !r.personaName);
const byName = new Map();
for (const r of out) {
  if (!byName.has(r.personaName)) byName.set(r.personaName, []);
  byName.get(r.personaName).push(r);
}

let crossPerson = 0;
let overCap = 0;
for (const [, posts] of byName) {
  const keys = new Set(posts.map((r) => r.personKey || r.workerId));
  if (keys.size > 1) crossPerson++;
  if (posts.length > MAX) overCap++;
}

console.log(`posts: ${out.length}, personas: ${byName.size}, no-name: ${noName.length}`);
console.log(`names shared across persons: ${crossPerson} (must be 0)`);
console.log(`names over cap ${MAX}: ${overCap} (must be 0)`);
const top = [...byName.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 5);
console.log(
  "top personas:",
  top
    .map(([n, ps]) => `${n}(${ps.length}件: ${[...new Set(ps.map((p) => p.extracted?.primaryDisease || "症状のみ"))].slice(0, 3).join("/")})`)
    .join(", "),
);
if (noName.length > 0 || crossPerson > 0 || overCap > 0) process.exit(1);
