"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { RadioOption } from "@/components/screens/onboarding/RadioOption";
import { nextStep } from "@/lib/onboarding/routing";

const QUESTIONS = [
  {
    key: "hard-day",
    title: "しんどい日は、どうしたいですか。",
    options: [
      "誰とも話さず、静かに 過ごしたい",
      "誰かと、少しだけ 話したい",
      "同じ気持ちの方を、読みたい",
      "散歩に 出たい",
    ],
  },
  {
    key: "distance",
    title: "人との 距離感は、どんな感じが 近いですか。",
    options: [
      "深く つながりたい",
      "ほどよく つながりたい",
      "ゆるく、見ていたい",
    ],
  },
];

/**
 * /onboarding/preference — 考え方の癖（2 問）。
 * 各設問は単一選択。お隣さがしのマッチング用。
 */
export default function PreferencePage() {
  const router = useRouter();
  const { state, update } = useOnboarding();

  const setAnswer = (key: string, index: number) => {
    update({ preferences: { ...state.preferences, [key]: index } });
  };

  return (
    <OnboardingShell current="/onboarding/preference" showBack backHref="/onboarding/purpose">
      <h2 className="onboarding-section-title">考え方の癖を、少しだけ。</h2>
      <p className="onboarding-section-sub">
        答えにくければ、飛ばして 進んでいただいて 大丈夫です。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {QUESTIONS.map((q) => (
          <div key={q.key}>
            <h3
              style={{
                font: "500 14px/1.5 var(--font-jp)",
                color: "var(--color-ink-900)",
                letterSpacing: "0.04em",
                marginBottom: 10,
                textAlign: "left",
              }}
            >
              {q.title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt, i) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  checked={state.preferences[q.key] === i}
                  onClick={() => setAnswer(q.key, i)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="onboarding-footer">
        <button
          type="button"
          className="btn btn--primary btn--full"
          onClick={() => router.push(nextStep("/onboarding/preference", state.purposes))}
        >
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}
