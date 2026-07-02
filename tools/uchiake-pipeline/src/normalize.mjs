/**
 * うちあけCSV → 正規化JSONL
 *
 * ヘッダー名に改行が混入しているため、ヘッダー文字列の「含む文字列」で列を特定する。
 * 使い方:
 *   node src/normalize.mjs --inspect   ヘッダーと1行目の対応を表示するだけ
 *   node src/normalize.mjs             全件を data/normalized.jsonl へ出力
 */
import { parse } from "csv-parse/sync";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = "C:/Users/green/Projects/.tmp/uchiake-data.csv";
const OUT_DIR = path.join(here, "..", "data");
const OUT_PATH = path.join(OUT_DIR, "normalized.jsonl");

const raw = fs.readFileSync(CSV_PATH, "utf8");
const records = parse(raw, { relax_quotes: true, relax_column_count: true });
const header = records[0];
const rows = records.slice(1);

// ヘッダー内容 → 論理列名
// 注: 先頭列はヘッダーが壊れている（「 のみ）が、データは数値の作業者ID。
//     [1]の「作業者」はCrowdWorksユーザー名のため匿名化の観点で取り込まない。
const columnMatchers = [
  ["approvedAt", (h) => /承認日時/.test(h)],
  ["title", (h) => /タイトル/.test(h)],
  ["q1_overview", (h) => /^1\./.test(h.trim()) || /あなたの症状/.test(h)],
  ["q2_complaint", (h) => /^2\./.test(h.trim()) || /不満や不安/.test(h) || /不便/.test(h)],
  ["q3_course", (h) => /^3\./.test(h.trim()) || /経過/.test(h)],
  ["q4_treatment", (h) => /^4\./.test(h.trim()) || /治療|薬/.test(h)],
  ["q5_issue", (h) => /^5\./.test(h.trim()) || /課題/.test(h)],
  ["genre", (h) => /ジャンル/.test(h)],
  ["age", (h) => /^6\./.test(h.trim()) || /年齢/.test(h)],
  ["gender", (h) => /^7\./.test(h.trim()) || /性別/.test(h)],
];

const mapping = { workerId: 0 };
header.forEach((h, i) => {
  for (const [name, test] of columnMatchers) {
    if (mapping[name] === undefined && test(h)) {
      mapping[name] = i;
      break;
    }
  }
});

if (process.argv.includes("--inspect")) {
  console.log(`total rows (excl header): ${rows.length}`);
  console.log(`header cells: ${header.length}`);
  header.forEach((h, i) => {
    const clean = h.replace(/\r?\n/g, "⏎").slice(0, 60);
    const logical = Object.entries(mapping).find(([, v]) => v === i)?.[0] ?? "-";
    console.log(`[${i}] (${logical}) ${clean}`);
  });
  console.log("--- first data row ---");
  rows[0].forEach((v, i) => {
    console.log(`[${i}] ${String(v).replace(/\r?\n/g, "⏎").slice(0, 80)}`);
  });
  process.exit(0);
}

const required = ["workerId", "title", "q1_overview", "q2_complaint", "q3_course", "q4_treatment", "q5_issue", "genre", "age", "gender"];
const missing = required.filter((k) => mapping[k] === undefined);
if (missing.length > 0) {
  console.error(`column mapping failed for: ${missing.join(", ")} — run with --inspect`);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const out = fs.createWriteStream(OUT_PATH, { encoding: "utf8" });
let n = 0;
let skipped = 0;
const clean = (s) => String(s ?? "").replace(/\r\n/g, "\n").trim();
for (const row of rows) {
  // 設問回答がすべて空（未記入行）はスキップ
  const answers = [mapping.q1_overview, mapping.q2_complaint, mapping.q3_course, mapping.q4_treatment, mapping.q5_issue]
    .map((i) => clean(row[i]));
  if (answers.every((a) => a.length === 0)) {
    skipped++;
    continue;
  }
  const rec = {
    id: `uchiake-${String(n + 1).padStart(4, "0")}`,
    workerId: clean(row[mapping.workerId]),
    approvedAt: mapping.approvedAt !== undefined ? clean(row[mapping.approvedAt]) : "",
    title: clean(row[mapping.title]),
    q1_overview: clean(row[mapping.q1_overview]),
    q2_complaint: clean(row[mapping.q2_complaint]),
    q3_course: clean(row[mapping.q3_course]),
    q4_treatment: clean(row[mapping.q4_treatment]),
    q5_issue: clean(row[mapping.q5_issue]),
    genre: clean(row[mapping.genre]),
    age: clean(row[mapping.age]),
    gender: clean(row[mapping.gender]),
  };
  out.write(JSON.stringify(rec) + "\n");
  n++;
}
out.end(() => {
  console.log(`wrote ${n} records (skipped ${skipped} empty) -> ${OUT_PATH}`);
});
