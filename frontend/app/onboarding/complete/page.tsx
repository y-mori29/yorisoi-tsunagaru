"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";

/**
 * /onboarding/complete — 完了画面 → 初投稿モーダル。
 *
 * 2 ステップ：
 *   1. welcome      — 「{name}さん、こんにちは」+「ひとこと 置いてみる」
 *   2. first-voice  — テンプレ入り投稿カード（編集可）+「そっと、置く」/「あとで」
 *
 * GRAVITY 画像 04 を踏襲。冨澤指針：誰も投稿していない状態を防ぐため
 * 初投稿を「促す」（強制ではないが、テンプレが入っている）。
 * トーンは布谷さま方針に合わせ、押し付けず、優しく。
 */

const TEMPLATE = `はじめまして。
ここに 来てみました。
これから、ゆっくり よろしくお願いします。`;

export default function CompletePage() {
  const router = useRouter();
  const { state } = useOnboarding();
  const name = state.profile.displayName ?? "あなた";

  const [step, setStep] = useState<"welcome" | "first-voice">("welcome");
  const [body, setBody] = useState(TEMPLATE);

  const onPost = () => {
    // Phase 5 で API 化予定。今は遷移のみ。
    router.push("/home");
  };

  if (step === "welcome") {
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
          よかったら、最初の ひとことを、
          <br />
          そっと 置いてみませんか。
        </p>

        <div className="onboarding-footer">
          <button
            type="button"
            className="btn btn--primary btn--full"
            onClick={() => setStep("first-voice")}
          >
            ひとこと、書いてみる
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--full"
            onClick={onPost}
          >
            あとで
          </button>
        </div>
      </OnboardingShell>
    );
  }

  // first-voice
  return (
    <OnboardingShell current="/onboarding/complete" canSkip={false}>
      <p className="eyebrow" style={{ marginTop: 4 }}>
        最初の ひとこと
      </p>
      <h2 className="onboarding-section-title" style={{ marginBottom: 6 }}>
        ようこそ。
      </h2>
      <p className="onboarding-section-sub">
        テンプレートは、自由に 変えて 大丈夫です。
        <br />
        ひとこと 置いておくと、あとから 来る人の 安心に なります。
      </p>

      <div className="first-voice-card">
        <textarea
          className="first-voice-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={300}
          rows={5}
          aria-label="最初の ひとこと"
        />
        <div className="first-voice-card__meta">
          <span>{body.length} / 300</span>
          <span>みんなに 届きます</span>
        </div>
      </div>

      <div className="onboarding-footer">
        <button
          type="button"
          className="btn btn--primary btn--full"
          onClick={onPost}
          disabled={body.trim().length === 0}
        >
          みんなに 送る
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--full"
          onClick={onPost}
        >
          あとで
        </button>
      </div>
    </OnboardingShell>
  );
}
