"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { RadioOption } from "@/components/screens/onboarding/RadioOption";
import { nextStep } from "@/lib/onboarding/routing";
import type { RhythmId } from "@/lib/onboarding/types";

const RHYTHMS: Array<{ id: RhythmId; label: string }> = [
  { id: "morning", label: "朝、動きやすい" },
  { id: "night", label: "夜、動きやすい" },
  { id: "varies", label: "日によって、変わる" },
];

/**
 * /onboarding/rhythm — 「動きやすい 時間帯は？」
 * 単一選択。
 */
export default function RhythmPage() {
  const router = useRouter();
  const { state, update } = useOnboarding();

  return (
    <OnboardingShell current="/onboarding/rhythm" showBack backHref="/onboarding/purpose">
      <h2 className="onboarding-section-title">動きやすい 時間帯は？</h2>
      <p className="onboarding-section-sub">
        いつも 落ち着いて いられる 時間帯を 教えてください。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {RHYTHMS.map((r) => (
          <RadioOption
            key={r.id}
            label={r.label}
            checked={state.rhythm === r.id}
            onClick={() => update({ rhythm: r.id })}
          />
        ))}
      </div>

      <div className="onboarding-footer">
        <button
          type="button"
          className="btn btn--primary btn--full"
          onClick={() => router.push(nextStep("/onboarding/rhythm", state.purposes))}
        >
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}
