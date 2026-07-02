/**
 * 作業者ID → 匿名ペルソナ名の決定的付与。
 * 既存モック（しずか・はる・こもれび・なぎ 等）と同じ、やわらかい ひらがな中心のトーン。
 * 同一作業者は必ず同じ名前になる。プール枯渇時は「◯◯の△△」型で拡張。
 */

const NAME_POOL = [
  // 人名系（既存モックと重複しないもの中心）
  "ちひろ", "ことは", "いつき", "ひなた", "かえで", "つむぎ", "さつき", "ゆずき",
  "あかり", "ほのか", "りんご", "すみれ", "つばき", "あんず", "くるみ", "ももこ",
  "わかば", "ひより", "こはる", "うみ", "しの", "まひろ", "ちとせ", "のどか",
  "やえ", "ふうか", "いろは", "せな", "とわ", "りく", "はやて", "しゅん",
  "そうた", "かなた", "あおい", "ゆうひ", "だいち", "しげる", "まこと", "おさむ",
  "ひろし", "さとる", "つよし", "きよし", "まさお", "のぼる", "いさむ", "たもつ",
  // 情景・自然系（既存の ふらり・こもれび・なぎ と同系統）
  "ゆうなぎ", "しずく", "かすみ", "ひだまり", "こだま", "せせらぎ", "やまびこ",
  "しらかば", "たんぽぽ", "すずらん", "ひなげし", "さざなみ", "うたたね", "よもぎ",
  "つきかげ", "あまやどり", "はるかぜ", "ゆきどけ", "あさつゆ", "ゆうだち",
  "きんもくせい", "しろつめくさ", "かげぼうし", "ねこじゃらし", "たびびと",
  "よりみち", "ひとやすみ", "まちびと", "そらまめ", "こけもも", "ふきのとう",
  "わたぐも", "あきかぜ", "ふゆごもり", "なつぐも", "はるさめ", "こゆき",
  "あさぎり", "ゆうぐれ", "しののめ", "たそがれ", "あけぼの", "うすあかり",
];

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
      // プール枯渇: 組み合わせで拡張（例: こはるの二番目）
      const base = NAME_POOL[idx % NAME_POOL.length];
      let n = 2;
      while (used.has(`${base}${n}`)) n++;
      name = `${base}${n}`;
    }
    used.add(name);
    map.set(id, name);
  }
  return map;
}
