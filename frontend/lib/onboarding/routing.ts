import type { PurposeId } from "./types";

/**
 * 既知のオンボーディング画面。
 * 初回登録は /onboarding/profile の1画面で完結し、condition は後からの詳細編集に使う。
 */
export const ALL_STEPS = ["/onboarding/profile", "/onboarding/condition"] as const;

export type Step = (typeof ALL_STEPS)[number];

/**
 * 実際に通る画面のリストを返す。
 * purposes 引数はシグネチャ互換のため残す（未使用）。
 */
export function buildPath(_purposes?: PurposeId[]): Step[] {
  void _purposes;
  return ["/onboarding/profile"];
}

/**
 * 現在の Step から、次に行くべき URL を返す。
 * 末尾の場合は /home へ。
 * purposes 引数はシグネチャ互換のため残す（未使用）。
 */
export function nextStep(current: Step, _purposes?: PurposeId[]): string {
  void _purposes;
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
  void _purposes;
  const path = buildPath();
  const idx = path.indexOf(current);
  if (idx < 0) return 1;
  return (idx + 1) / path.length;
}
