"use client";

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

type ToneOption = { id: "terra" | "moss" | "plum" | "gold" | "default"; label: string; color: string };

const TONES: ToneOption[] = [
  { id: "terra", label: "テラ", color: "#E6B8A1" },
  { id: "moss", label: "もえぎ", color: "#BFD3B5" },
  { id: "plum", label: "うめ", color: "#D9C2D1" },
  { id: "gold", label: "こがね", color: "#E8D49A" },
  { id: "default", label: "ペーパー", color: "#F3EDE2" },
];

/**
 * /onboarding/avatar — 動物アバター + 背景カラー選択。
 * GRAVITY 画像 02 を踏襲。
 * 「あとから 変更できます」と明記（生年月日・性別とは違い、変更可）。
 */
export default function AvatarPage() {
  const router = useRouter();
  const { state, patchProfile } = useOnboarding();
  const animal = state.profile.animal;
  const tone = state.profile.avatarTone ?? "terra";

  const onContinue = () => {
    if (!state.profile.avatarTone) {
      patchProfile({ avatarTone: "terra" });
    }
    router.push(nextStep("/onboarding/avatar", state.purposes));
  };

  return (
    <OnboardingShell current="/onboarding/avatar" showBack backHref="/onboarding/purpose">
      <h2 className="onboarding-section-title">あなたの 姿を、選んで</h2>
      <p className="onboarding-section-sub">
        本名は いりません。
        <br />
        あとから、いつでも 変えられます。
      </p>

      <div className="avatar-grid">
        {ANIMALS.map((a) => (
          <button
            key={a}
            type="button"
            className={`avatar-grid__item ${animal === a ? "is-active" : ""}`.trim()}
            onClick={() => patchProfile({ animal: a })}
            aria-pressed={animal === a}
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

      <div className="tone-picker">
        <div className="tone-picker__label">背景の 色を 選んで</div>
        <div className="tone-picker__row">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`tone-swatch ${tone === t.id ? "is-active" : ""}`.trim()}
              onClick={() => patchProfile({ avatarTone: t.id })}
              aria-pressed={tone === t.id}
              aria-label={t.label}
              style={{ background: t.color }}
            />
          ))}
        </div>
      </div>

      <div className="onboarding-footer">
        {!animal && (
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
          disabled={!animal}
        >
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}
