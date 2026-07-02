/**
 * extracted-full.jsonl → frontend/lib/data/uchiake-posts.json
 *
 * フィード用の静的データを生成する。
 * - poor品質・安全フラグ付きは除外（2026-07-03 森さん決定の除外基準）
 * - 出典ラベルは持たせない（通常投稿と同じ見た目で流す決定のため、
 *   フロントに渡すフィールドにも「うちあけ由来」を示す情報を含めない。idの接頭辞のみ）
 * - 実承認日時は使わず、合成した相対時間ラベルを決定的に付与（「人がいる」見せ方）
 * - アバター・トーンはペルソナ名から決定的に割り当て（同一ペルソナ=同一アバター）
 *
 * 使い方: node src/build-frontend-data.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const outPath = path.join(here, "..", "..", "..", "frontend", "lib", "data", "uchiake-posts.json");

const records = fs
  .readFileSync(path.join(dataDir, "extracted-full.jsonl"), "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));

function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const ANIMALS = ["bear", "bird", "cat", "fox", "hedgehog", "owl", "rabbit", "turtle"];
const AVATAR_TONES = ["terra", "moss", "plum", "cream", "default"];
const TOPIC_TONES = ["default", "terra", "plum", "gold"];

// 除外: poor品質と安全フラグ
const usable = records.filter((r) => {
  const e = r.extracted;
  if (!e || e.quality === "poor") return false;
  if (e.safety?.personalInfo || e.safety?.aggressive || e.safety?.medicalMisinfo) return false;
  return true;
});

// 合成時間: idハッシュで順位をシャッフルし、3分前〜約90日前に指数分布で散らす。
// 直近が濃く、古いほど疎になる=自然なフィードの密度になる。
const ranked = usable
  .map((r) => ({ r, key: hashString(r.id + ":time") }))
  .sort((a, b) => a.key - b.key);
const N = ranked.length;
const MIN_MINUTES = 3;
const MAX_MINUTES = 60 * 24 * 90;
function minutesAgoAt(rank) {
  const t = N <= 1 ? 0 : rank / (N - 1);
  return Math.round(Math.exp(Math.log(MIN_MINUTES) + t * (Math.log(MAX_MINUTES) - Math.log(MIN_MINUTES))));
}
function timeLabel(minutes) {
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 2) return "昨日";
  if (days < 7) return `${days}日前`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}週間前`;
  const months = Math.floor(days / 30);
  return `${Math.min(months, 3)}か月前`;
}

const stories = {};

const posts = ranked.map(({ r }, rank) => {
  const e = r.extracted;
  const minutes = minutesAgoAt(rank);

  // 投稿の主題: 病名 > 症状 > 悩みトピック の順で決める
  let topicKind = "concern";
  let topic = (e.topics ?? []).find((t) => t !== "その他") ?? "日々のこと";
  if (e.primaryDisease) {
    topicKind = "condition";
    topic = e.primaryDisease;
  } else if ((e.symptoms ?? []).length > 0) {
    topicKind = "symptom";
    topic = e.symptoms[0];
  }

  const persona = r.personaName;

  // 詳細ページ用の全文（5問Q&A）。フィード用と同じ除外・同じペルソナ属性で揃える。
  // サーバー側でのみ読み込む前提（クライアントバンドルに入れない）。
  stories[r.id] = {
    id: r.id,
    authorName: persona,
    authorAvatar: ANIMALS[hashString(persona + ":animal") % ANIMALS.length],
    authorAvatarTone: AVATAR_TONES[hashString(persona + ":tone") % AVATAR_TONES.length],
    topic: e.primaryDisease ?? (e.symptoms ?? [])[0] ?? "日々のこと",
    timeLabel: timeLabel(minutes),
    title: (r.title ?? "").trim(),
    q1: (r.q1_overview ?? "").trim(),
    q2: (r.q2_complaint ?? "").trim(),
    q3: (r.q3_course ?? "").trim(),
    q4: (r.q4_treatment ?? "").trim(),
    q5: (r.q5_issue ?? "").trim(),
    age: r.age ?? null,
    gender: r.gender ?? null,
    voice: e.voice.trim(),
  };

  return {
    id: r.id,
    authorName: persona,
    authorAvatar: ANIMALS[hashString(persona + ":animal") % ANIMALS.length],
    authorAvatarTone: AVATAR_TONES[hashString(persona + ":tone") % AVATAR_TONES.length],
    topic,
    topicKind,
    topicTone: TOPIC_TONES[hashString(topic) % TOPIC_TONES.length],
    timeLabel: timeLabel(minutes),
    minutesAgo: minutes,
    body: e.voice.trim(),
    primaryDisease: e.primaryDisease ?? null,
    symptoms: e.symptoms ?? [],
    topics: e.topics ?? [],
  };
});

posts.sort((a, b) => a.minutesAgo - b.minutesAgo);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(posts), "utf8");

const storiesPath = path.join(path.dirname(outPath), "uchiake-stories.json");
fs.writeFileSync(storiesPath, JSON.stringify(stories), "utf8");
console.log(`stories: ${Object.keys(stories).length}, size: ${(fs.statSync(storiesPath).size / 1024).toFixed(0)} KB -> ${storiesPath}`);

const kindCount = posts.reduce((acc, p) => ((acc[p.topicKind] = (acc[p.topicKind] ?? 0) + 1), acc), {});
console.log(`total: ${records.length} -> usable: ${posts.length} (excluded ${records.length - posts.length})`);
console.log(`kinds: condition ${kindCount.condition ?? 0} / symptom ${kindCount.symptom ?? 0} / concern ${kindCount.concern ?? 0}`);
console.log(`newest: ${posts[0].timeLabel}, oldest: ${posts[posts.length - 1].timeLabel}`);
console.log(`size: ${(fs.statSync(outPath).size / 1024).toFixed(0)} KB -> ${outPath}`);
