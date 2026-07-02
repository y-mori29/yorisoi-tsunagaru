import type { PurposeId } from "./types";

/**
 * オンボーディングの全ステップ（最大ルート）。
 * purpose の選択結果に応じて、不要なステップはスキップする。
 */
export const ALL_STEPS = [
  "/onboarding",
  "/onboarding/purpose",
  "/onboarding/condition",
  "/onboarding/rhythm",
  "/onboarding/preference",
  "/onboarding/avatar",
  "/onboarding/profile",
  "/onboarding/complete",
] as const;

export type Step = (typeof ALL_STEPS)[number];

/**
 * purpose の選択から、実際に通る画面のリストを返す。
 *
 * - condition: 「same-condition」「consult」を選んだとき
 * - rhythm:    「same-rhythm」を選んだとき
 * - preference:「same-thinking」「consult」を選んだとき
 * - profile / complete は必ず通る
 */
export function buildPath(purposes: PurposeId[]): Step[] {
  const path: Step[] = ["/onboarding", "/onboarding/purpose"];

  const has = (id: PurposeId) => purposes.includes(id);

  if (has("same-condition") || has("consult-self") || has("consult-others"))
    path.push("/onboarding/condition");
  if (has("same-rhythm")) path.push("/onboarding/rhythm");
  if (has("same-thinking") || has("consult-self") || has("consult-others"))
    path.push("/onboarding/preference");

  path.push("/onboarding/avatar");
  path.push("/onboarding/profile");
  path.push("/onboarding/complete");

  return path;
}

/**
 * 現在の Step と purposes から、次に行くべき URL を返す。
 * 末尾の場合は /home へ。
 */
export function nextStep(current: Step, purposes: PurposeId[]): string {
  const path = buildPath(purposes);
  const idx = path.indexOf(current);
  if (idx < 0 || idx === path.length - 1) return "/home";
  return path[idx + 1];
}

/**
 * 進行率（0-1）。プログレスバー用。
 */
export function progressRatio(current: Step, purposes: PurposeId[]): number {
  const path = buildPath(purposes);
  const idx = path.indexOf(current);
  if (idx < 0) return 0;
  return (idx + 1) / path.length;
}
