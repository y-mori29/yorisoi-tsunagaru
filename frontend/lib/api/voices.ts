import { mockVoices, todayVoice } from "@/lib/mock/voices";
import type { DailyVoice, Voice } from "./types";

let todayCached: Promise<DailyVoice> | null = null;
let voicesCached: Promise<Voice[]> | null = null;

/**
 * 今日の「今日のひとこと」を取得。
 * 将来は cms.get('daily-voice') 等に差し替え可能。
 */
export function getTodayVoice(): Promise<DailyVoice> {
  todayCached ??= Promise.resolve(todayVoice);
  return todayCached;
}

/**
 * タイムラインの投稿一覧を取得。
 * 将来 fetch('/api/voices') に差し替え可能。
 */
export function getVoices(): Promise<Voice[]> {
  voicesCached ??= Promise.resolve(mockVoices);
  return voicesCached;
}
