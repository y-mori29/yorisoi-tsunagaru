"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useOnboarding } from "@/lib/onboarding/context";
import { progressRatio, type Step } from "@/lib/onboarding/routing";

type OnboardingShellProps = {
  current: Step;
  /** スキップ先（未指定なら /home） */
  skipHref?: string;
  /** スキップ可能かどうか */
  canSkip?: boolean;
  /** 戻るボタンを表示するか */
  showBack?: boolean;
  backHref?: string;
  showProgress?: boolean;
  children: ReactNode;
};

/**
 * オンボーディング画面の共通フレーム。
 * 上部に進行バー + スキップ、メイン部分は children に委ねる。
 */
export function OnboardingShell({
  current,
  skipHref = "/home",
  canSkip = true,
  showBack = false,
  backHref,
  showProgress = true,
  children,
}: OnboardingShellProps) {
  const { state } = useOnboarding();
  const ratio = progressRatio(current, state.purposes);

  return (
    <>
      <header className="onboarding-header">
        {showBack && backHref ? (
          <Link href={backHref} aria-label="戻る" className="onboarding-header__back">
            ←
          </Link>
        ) : (
          <span className="onboarding-header__spacer" />
        )}
        {showProgress ? (
          <div className="onboarding-header__progress" aria-hidden>
            <div
              className="onboarding-header__progress-bar"
              style={{ width: `${Math.max(ratio, 0.08) * 100}%` }}
            />
          </div>
        ) : (
          <span className="onboarding-header__title">基本情報</span>
        )}
        {canSkip ? (
          <Link href={skipHref} className="onboarding-header__skip">
            スキップ
          </Link>
        ) : (
          <span className="onboarding-header__spacer" />
        )}
      </header>

      <main className="onboarding-main">{children}</main>
    </>
  );
}
