"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { nextStep } from "@/lib/onboarding/routing";
import type { AnimalName } from "@/lib/icons";

const ANIMALS: AnimalName[] = ["rabbit", "bear", "cat", "bird", "fox", "owl", "turtle", "hedgehog"];
const ANIMAL_LABEL: Record<AnimalName, string> = {
  rabbit: "うさぎ",
  bear: "くま",
  cat: "ねこ",
  bird: "とり",
  fox: "きつね",
  owl: "ふくろう",
  turtle: "かめ",
  hedgehog: "はりねずみ",
};

/**
 * /onboarding/profile — 動物アバター選択 + 表示名入力。
 * 本名禁止のニュアンスを文言で伝える。
 */
export default function ProfilePage() {
  const router = useRouter();
  const { state, patchProfile } = useOnboarding();
  const [name, setName] = useState(state.profile.displayName ?? "");

  const onContinue = () => {
    const finalName = name.trim();
    patchProfile({ displayName: finalName || "ななし" });
    router.push(nextStep("/onboarding/profile", state.purposes));
  };

  return (
    <OnboardingShell current="/onboarding/profile" showBack backHref="/onboarding/purpose">
      <h2 className="onboarding-section-title">あなたの 姿を、選んで</h2>
      <p className="onboarding-section-sub">
        本名は いりません。
        <br />
        あなたを 守る 仮の姿を、自由に 選んでください。
      </p>

      <div className="avatar-grid">
        {ANIMALS.map((a) => (
          <button
            key={a}
            type="button"
            className={`avatar-grid__item ${state.profile.animal === a ? "is-active" : ""}`.trim()}
            onClick={() => patchProfile({ animal: a })}
            aria-pressed={state.profile.animal === a}
          >
            <Image
              src={`/assets/animals/${a}.png`}
              alt={ANIMAL_LABEL[a]}
              width={56}
              height={56}
              style={{ width: 56, height: 56, objectFit: "contain" }}
            />
            <span className="avatar-grid__name">{ANIMAL_LABEL[a]}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 12, textAlign: "left" }}>
        <label className="input-label" htmlFor="displayName">
          呼ばれたい 名前
        </label>
        <input
          id="displayName"
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例：もか"
          maxLength={20}
        />
        <p
          style={{
            font: "400 11px/1.6 var(--font-jp)",
            color: "var(--color-ink-500)",
            marginTop: 8,
            letterSpacing: "0.02em",
          }}
        >
          あとで 変えられます。本名で なくて 大丈夫です。
        </p>
      </div>

      <div className="onboarding-footer">
        {!state.profile.animal && (
          <p
            style={{
              font: "400 12px/1.6 var(--font-jp)",
              color: "var(--color-ink-500)",
              textAlign: "center",
              letterSpacing: "0.04em",
            }}
          >
            まず、姿を 1 つ 選んでください。
          </p>
        )}
        <button
          type="button"
          className="btn btn--primary btn--full"
          onClick={onContinue}
          disabled={!state.profile.animal}
        >
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}
