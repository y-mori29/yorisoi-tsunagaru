"use client";

import Link from "next/link";
import Image from "next/image";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";

/**
 * /onboarding/complete — 完了画面。
 * 「中へ、入る」ボタンで /home へ。
 */
export default function CompletePage() {
  const { state } = useOnboarding();
  const name = state.profile.displayName ?? "あなた";

  return (
    <OnboardingShell current="/onboarding/complete" canSkip={false}>
      <div className="onboarding-hero">
        <Image
          src="/assets/heroes/voice-letter.png"
          alt=""
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      <p className="eyebrow">ありがとうございます</p>
      <h1 className="onboarding-title">{name}さん、こんにちは。</h1>
      <p className="onboarding-body">
        準備が、整いました。
        <br />
        いつでも、好きなときに、好きなだけ。
        <br />
        ふらっと、いて くださって 大丈夫です。
      </p>

      <div className="onboarding-footer">
        <Link href="/home" className="btn btn--primary btn--full">
          中へ、入る
        </Link>
      </div>
    </OnboardingShell>
  );
}
