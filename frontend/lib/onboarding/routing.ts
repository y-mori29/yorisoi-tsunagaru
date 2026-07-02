import type { PurposeId } from "./types";

/**
 * オンボーディングの全ステップ（2026-07-03 3ステップ化）。
 * ようこそ → 病気・症状・不安（任意）→ ニックネーム＋アバター → complete
 */
export const ALL_STEPS = [
  "/onboarding",
  "/onboarding/condition",
  "/onboarding/profile",
  "/onboarding/complete",
] as const;

export type Step = (typeof ALL_STEPS)[number];

/**
 * 実際に通る画面のリストを返す。
 * purposes 引数はシグネチャ互換のため残す（未使用）。
 */
export function buildPath(_purposes?: PurposeId[]): Step[] {
  return [...ALL_STEPS];
}

/**
 * 現在の Step から、次に行くべき URL を返す。
 * 末尾の場合は /home へ。
 * purposes 引数はシグネチャ互換のため残す（未使用）。
 */
export function nextStep(current: Step, _purposes?: PurposeId[]): string {
  const path = buildPath();
  const idx = path.indexOf(current);
  if (idx < 0 || idx === path.length - 1) return "/home";
  return path[idx + 1];
}

/**
 * 進行率（0-1）。プログレスバー用。
 * purposes 引数はシグネチャ互換のため残す（未使用）。
 */
export function progressRatio(current: Step, _purposes?: PurposeId[]): number {
  const path = buildPath();
  const idx = path.indexOf(current);
  if (idx < 0) return 0;
  return (idx + 1) / path.length;
}
