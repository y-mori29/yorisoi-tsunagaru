"use client";

import Link from "next/link";
import Image from "next/image";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";

/**
 * /onboarding — ようこそ画面
 *
 * トーン：来てくれたことへの感謝。
 * 「しんどい人」「病気」など一切ラベリングしない（feedback_patient_facing_no_labeling）。
 */
export default function OnboardingWelcomePage() {
  return (
    <OnboardingShell current="/onboarding" canSkip>
      <div className="onboarding-hero">
        <Image
          src="/assets/heroes/onboarding-zabuton.png"
          alt=""
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      <p className="eyebrow" style={{ marginTop: 8 }}>
        ようこそ
      </p>
      <h1 className="onboarding-title">よりそい つながる</h1>
      <p className="onboarding-body">
        ここまで、来てくださって、
        <br />
        ありがとうございます。
        <br />
        <br />
        何もしなくて、大丈夫です。
        <br />
        ただ、いてください。
      </p>

      <div className="onboarding-footer">
        <Link href="/onboarding/purpose" className="btn btn--primary btn--full">
          そっと、開く
        </Link>
      </div>
    </OnboardingShell>
  );
}
