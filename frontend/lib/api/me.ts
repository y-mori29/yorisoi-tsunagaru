import { currentUser, myVoices } from "@/lib/mock/me";
import type { User, Voice } from "./types";

let userCached: Promise<User> | null = null;
let voicesCached: Promise<Voice[]> | null = null;

/**
 * 現在ログイン中ユーザーのプロフィールを取得。
 * 将来 fetch('/api/me') に差し替え可能。
 */
export function getCurrentUser(): Promise<User> {
  userCached ??= Promise.resolve(currentUser);
  return userCached;
}

/**
 * 自分が置いた ことば 一覧を取得。
 * 将来 fetch('/api/me/voices') に差し替え可能。
 */
export function getMyVoices(): Promise<Voice[]> {
  voicesCached ??= Promise.resolve(myVoices);
  return voicesCached;
}
