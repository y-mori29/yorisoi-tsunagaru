/**
 * 作業者ID → 匿名ペルソナ名の決定的付与。
 * 既存モック（しずか・はる・こもれび・なぎ 等）と同じ、やわらかい ひらがな中心のトーン。
 * 同一作業者は必ず同じ名前になる。プール枯渇時は「◯◯の△△」型で拡張。
 */

// 人名系のみ（2026-07-03 森さん決定。情景系は使わない）
const NAME_POOL = [
  "ちひろ", "ことは", "いつき", "ひなた", "かえで", "つむぎ", "さつき", "ゆずき",
  "あかり", "ほのか", "すみれ", "つばき", "あんず", "くるみ", "ももこ", "わかば",
  "ひより", "こはる", "うみ", "しの", "まひろ", "ちとせ", "のどか", "やえ",
  "ふうか", "いろは", "せな", "とわ", "りく", "はやて", "しゅん", "そうた",
  "かなた", "あおい", "ゆうひ", "だいち", "しげる", "まこと", "おさむ", "ひろし",
  "さとる", "つよし", "きよし", "まさお", "のぼる", "いさむ", "たもつ", "みのる",
  "ちあき", "ともみ", "なおと", "ひかる", "かおる", "みつき", "あさみ", "えみこ",
  "ようこ", "きょうこ", "まなみ", "さゆり", "ちなつ", "ふみえ", "としこ", "のりこ",
  "ますみ", "ゆりえ", "さちえ", "たかこ", "みちよ", "きみえ", "はるお", "ただし",
  "すすむ", "わたる", "あゆむ", "いくお", "としお", "くにお", "みちお", "てるお",
  "ゆきの", "あやの", "しおん", "れいな", "もえか", "ななせ", "りんか", "すずね",
  "ここね", "ゆいか", "ほまれ", "いぶき", "かのん", "ひまり", "つかさ", "しずえ",
];

// プール枯渇時の合成用（語幹＋語尾で自然な人名を作る）
const NAME_STEMS = [
  "はる", "なつ", "あき", "ふゆ", "ゆき", "ゆう", "あさ", "ひろ", "まさ", "かず",
  "とも", "のぶ", "よし", "たか", "みち", "ちか", "さと", "くに", "てる", "なお",
  "みず", "しげ", "たけ", "つね", "もと", "すみ", "きみ", "ふみ", "まり", "えり",
  "あや", "ゆみ", "けい", "りえ", "まゆ", "さき", "みお", "ひで", "のり", "むつ",
];
const NAME_ENDINGS = [
  "こ", "み", "え", "よ", "か", "な", "の", "ね", "お", "や",
  "と", "き", "し", "た", "じ", "ひこ", "いち", "ろう", "は", "せ",
  "る", "ら", "り", "め", "ほ", "ん",
];

// 合成候補を決定的な順序で列挙: (1) 語幹+語尾 1,040通り → (2) 語幹+語幹 約1,560通り
function synthCandidate(k) {
  const tier1 = NAME_STEMS.length * NAME_ENDINGS.length;
  if (k < tier1) {
    return NAME_STEMS[k % NAME_STEMS.length] + NAME_ENDINGS[Math.floor(k / NAME_STEMS.length)];
  }
  const j = k - tier1;
  const a = j % NAME_STEMS.length;
  const b = Math.floor(j / NAME_STEMS.length) % NAME_STEMS.length;
  if (a === b) return null; // 「ゆきゆき」等の重ね名は除外
  return NAME_STEMS[a] + NAME_STEMS[b];
}
const SYNTH_SPACE = NAME_STEMS.length * NAME_ENDINGS.length + NAME_STEMS.length * NAME_STEMS.length;

function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * workerIds の配列（重複あり）から workerId→名前 の対応表を作る。
 * 衝突時は次の空き名前へ線形移動（順序は workerId ソートで決定的）。
 */
export function assignPersonaNames(workerIds) {
  const unique = [...new Set(workerIds)].sort();
  const used = new Set();
  const map = new Map();
  for (const id of unique) {
    let idx = hashString(id) % NAME_POOL.length;
    let name = null;
    for (let step = 0; step < NAME_POOL.length; step++) {
      const candidate = NAME_POOL[(idx + step) % NAME_POOL.length];
      if (!used.has(candidate)) {
        name = candidate;
        break;
      }
    }
    if (name === null) {
      // プール枯渇: 合成名（約2,600通り）から決定的に選ぶ
      const h = hashString(id + ":synth");
      for (let step = 0; step < SYNTH_SPACE; step++) {
        const candidate = synthCandidate((h + step) % SYNTH_SPACE);
        if (candidate && !used.has(candidate)) {
          name = candidate;
          break;
        }
      }
    }
    if (name === null) {
      throw new Error(`persona name pool exhausted at worker ${id} — extend NAME_POOL/NAME_STEMS`);
    }
    used.add(name);
    map.set(id, name);
  }
  return map;
}
