import { mockVoices, todayVoice } from "@/lib/mock/voices";
import type { DailyVoice, Voice } from "./types";

/**
 * 今日の「今日のひとこと」を取得。
 * 将来は cms.get('daily-voice') 等に差し替え可能。
 */
export async function getTodayVoice(): Promise<DailyVoice> {
  return todayVoice;
}

/**
 * タイムラインの投稿一覧を取得。
 */
export async function getVoices(): Promise<Voice[]> {
  return mockVoices;
}
