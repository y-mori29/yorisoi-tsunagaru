import { mockRooms } from "@/lib/mock/rooms";
import type { Room } from "./types";

/**
 * テーマ（旧ルーム）の API スタブ。
 *
 * - getRooms(): 全テーマ
 * - getRoomById(id): 個別テーマ
 * - getRoomByName(name): Voice.roomName からの逆引き（ホームのバッジ → テーマ遷移用）
 *
 * 「入る/出る」の所属概念は 2026-07-03 に廃止（テーマ=絞り込みに一本化）。
 * join/leave/membership 系はここから削除済み。
 */

let roomsCached: Promise<Room[]> | null = null;
const roomByIdCache = new Map<string, Promise<Room | null>>();
const roomByNameCache = new Map<string, Promise<Room | null>>();

export function getRooms(): Promise<Room[]> {
  roomsCached ??= Promise.resolve(mockRooms);
  return roomsCached;
}

/**
 * 個別ルームを id で取得。
 * use() で安定して読めるよう id 別に Promise をキャッシュ。
 * .then() チェーンは毎回新 Promise を作るので、結果を一度キャッシュする。
 */
export function getRoomById(id: string): Promise<Room | null> {
  if (!roomByIdCache.has(id)) {
    roomByIdCache.set(
      id,
      getRooms().then((list) => list.find((r) => r.id === id) ?? null),
    );
  }
  return roomByIdCache.get(id)!;
}

/** Voice.roomName（"潰瘍性大腸炎" 等）からの逆引き */
export function getRoomByName(name: string): Promise<Room | null> {
  if (!roomByNameCache.has(name)) {
    roomByNameCache.set(
      name,
      getRooms().then((list) => list.find((r) => r.name === name) ?? null),
    );
  }
  return roomByNameCache.get(name)!;
}

