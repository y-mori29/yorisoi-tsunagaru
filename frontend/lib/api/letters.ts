import { mockLetters, fallbackLetter, type Letter } from "@/lib/mock/letters";

let lettersCached: Promise<Record<string, Letter>> | null = null;
const byIdCache = new Map<string, Promise<Letter>>();

/**
 * 「そっと届く声」全件のディクショナリを取得。
 * 将来 fetch('/api/letters') に差し替え可能。
 */
export function getLetters(): Promise<Record<string, Letter>> {
  lettersCached ??= Promise.resolve(mockLetters);
  return lettersCached;
}

/**
 * 個別の手紙を取得。該当 id が無ければ fallbackLetter を返す。
 * 24h で消えた声には fallback が表示される（id != "fallback" で本物判定）。
 *
 * React の use() で展開するため、id ごとに Promise をキャッシュして
 * 同じ id への呼び出しでは同じ Promise を返す（毎レンダー新規生成を回避）。
 */
export function getLetterById(id: string): Promise<Letter> {
  if (!byIdCache.has(id)) {
    byIdCache.set(
      id,
      getLetters().then((letters) => letters[id] ?? fallbackLetter),
    );
  }
  return byIdCache.get(id)!;
}

export { fallbackLetter };
export type { Letter };
