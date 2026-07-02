/**
 * サブエージェント出力の機械検証。
 * 使い方: node src/validate.mjs N   （data/composer-extracted-N.jsonl を data/chunk-N.jsonl と突き合わせ）
 *
 * チェック内容:
 * - 件数・ID・順序の一致
 * - スキーマ（必須キー・enum値）
 * - voice が元テキスト（q1〜q5いずれか）に実在するか（ハルシネーション検出。空白・改行差は無視）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const n = process.argv[2];
if (!n) {
  console.error("usage: node src/validate.mjs <chunk-number>");
  process.exit(1);
}
const chunkPath = path.join(here, "..", "data", `chunk-${n}.jsonl`);
const outPath = path.join(here, "..", "data", `composer-extracted-${n}.jsonl`);

const read = (p) => fs.readFileSync(p, "utf8").trim().split("\n").map((l, i) => {
  try {
    return JSON.parse(l);
  } catch {
    throw new Error(`${path.basename(p)} line ${i + 1}: invalid JSON`);
  }
});

const inputs = read(chunkPath);
const outputs = read(outPath);
const inputById = new Map(inputs.map((r) => [r.id, r]));

const TOPICS = new Set(["仕事・学校", "家族・パートナー", "お金", "通院・治療", "薬との付き合い", "診断がつくまで", "眠り", "食事", "外出・移動", "見た目・周囲の目", "気持ちのゆらぎ", "妊娠・出産", "その他"]);
const SOURCES = new Set(["q1", "q2", "q3", "q4", "q5"]);
const QUALITY = new Set(["good", "ok", "poor"]);

const norm = (s) => String(s ?? "").replace(/\s+/g, "");
const problems = [];

if (inputs.length !== outputs.length) {
  problems.push(`count mismatch: input ${inputs.length} vs output ${outputs.length}`);
}

outputs.forEach((o, i) => {
  const tag = `line ${i + 1} (${o.id ?? "no-id"})`;
  const input = inputById.get(o.id);
  if (!input) {
    problems.push(`${tag}: id not in chunk`);
    return;
  }
  if (inputs[i] && inputs[i].id !== o.id) problems.push(`${tag}: order mismatch (expected ${inputs[i].id})`);
  const e = o.extracted;
  if (!e) {
    problems.push(`${tag}: missing extracted`);
    return;
  }
  if (!Array.isArray(e.diseases)) problems.push(`${tag}: diseases not array`);
  if (e.primaryDisease !== null && typeof e.primaryDisease !== "string") problems.push(`${tag}: primaryDisease invalid`);
  if (!Array.isArray(e.symptoms) || e.symptoms.length > 6) problems.push(`${tag}: symptoms invalid (max 6)`);
  if (!Array.isArray(e.topics) || e.topics.some((t) => !TOPICS.has(t))) problems.push(`${tag}: unknown topic ${JSON.stringify(e.topics)}`);
  if (!SOURCES.has(e.voiceSource)) problems.push(`${tag}: voiceSource invalid`);
  if (!QUALITY.has(e.quality)) problems.push(`${tag}: quality invalid`);
  if (!e.safety || typeof e.safety.personalInfo !== "boolean" || typeof e.safety.aggressive !== "boolean" || typeof e.safety.medicalMisinfo !== "boolean") problems.push(`${tag}: safety invalid`);
  if (typeof e.voice !== "string" || e.voice.length < 10) {
    problems.push(`${tag}: voice too short`);
  } else {
    // 原文一致チェック: 句点区切りの各文が、いずれかの設問原文に含まれること
    const sources = [input.q1_overview, input.q2_complaint, input.q3_course, input.q4_treatment, input.q5_issue].map(norm);
    const sentences = e.voice.split(/(?<=[。！？!?])/).map(norm).filter((s) => s.length >= 8);
    const missing = sentences.filter((s) => !sources.some((src) => src.includes(s.replace(/[。！？!?]$/, ""))));
    if (missing.length > 0) {
      problems.push(`${tag}: voice not found verbatim in source (hallucination?): ${missing[0].slice(0, 40)}...`);
    }
  }
});

if (problems.length === 0) {
  console.log(`PASS: chunk-${n} (${outputs.length} records)`);
} else {
  console.log(`FAIL: chunk-${n} — ${problems.length} problem(s)`);
  problems.slice(0, 30).forEach((p) => console.log("  - " + p));
  process.exit(1);
}
