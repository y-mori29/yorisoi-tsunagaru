"use client";

import Image from "next/image";
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

type ToneId = "terra" | "moss" | "plum" | "gold" | "default";

type ToneOption = { id: ToneId; label: string; color: string };

const TONES: ToneOption[] = [
  { id: "terra", label: "テラ", color: "#E6B8A1" },
  { id: "moss", label: "もえぎ", color: "#BFD3B5" },
  { id: "plum", label: "うめ", color: "#D9C2D1" },
  { id: "gold", label: "こがね", color: "#E8D49A" },
  { id: "default", label: "ペーパー", color: "#F3EDE2" },
];

type AvatarPickerProps = {
  animal?: AnimalName;
  avatarTone?: ToneId;
  onAnimalChange: (animal: AnimalName) => void;
  onToneChange: (tone: ToneId) => void;
};

/**
 * 動物アバター + 背景カラー選択 UI。
 * /onboarding/avatar から profile 画面へ移植。
 */
export function AvatarPicker({ animal, avatarTone = "terra", onAnimalChange, onToneChange }: AvatarPickerProps) {
  return (
    <>
      <div className="avatar-grid">
        {ANIMALS.map((a) => (
          <button
            key={a}
            type="button"
            className={`avatar-grid__item ${animal === a ? "is-active" : ""}`.trim()}
            onClick={() => onAnimalChange(a)}
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
              className={`tone-swatch ${avatarTone === t.id ? "is-active" : ""}`.trim()}
              onClick={() => onToneChange(t.id)}
              aria-pressed={avatarTone === t.id}
              aria-label={t.label}
              style={{ background: t.color }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
