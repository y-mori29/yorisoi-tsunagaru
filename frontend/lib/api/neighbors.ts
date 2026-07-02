import { mockNeighbors } from "@/lib/mock/neighbors";
import type { Neighbor } from "./types";

let cached: Promise<Neighbor[]> | null = null;

/**
 * /stroll（めぐる）に並ぶ お隣さん候補を取得。
 * 将来 fetch('/api/neighbors/stroll') に差し替え可能。
 */
export function getNeighbors(): Promise<Neighbor[]> {
  cached ??= Promise.resolve(mockNeighbors);
  return cached;
}
