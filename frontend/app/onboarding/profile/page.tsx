"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { AvatarPicker } from "@/components/screens/onboarding/AvatarPicker";
import { nextStep } from "@/lib/onboarding/routing";

/**
 * /onboarding/profile — ニックネーム + 動物アバター + 背景カラー。
 * 2026-07-03 の 3 ステップ化で avatar 画面と統合。性別・生年月日は任意（オンボでは聞かない）。
 */
export default function ProfilePage() {
  const router = useRouter();
  const { state, patchProfile } = useOnboarding();
  const [name, setName] = useState(state.profile.displayName ?? "");

  const onContinue = () => {
    const finalName = name.trim();
    patchProfile({
      displayName: finalName || "ななし",
      avatarTone: state.profile.avatarTone ?? "terra",
    });
    router.push(nextStep("/onboarding/profile", state.purposes));
  };

  return (
    <OnboardingShell current="/onboarding/profile" showBack backHref="/onboarding/condition">
      <h2 className="onboarding-section-title">あなたの ことを、少しだけ</h2>
      <p className="onboarding-section-sub">
        本名は いりません。
        <br />
        あとから、いつでも 変えられます。
      </p>

      <div className="profile-form">
        <div className="profile-row">
          <label className="profile-row__label" htmlFor="displayName">
            ニックネーム
          </label>
          <input
            id="displayName"
            type="text"
            className="profile-row__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：もり"
            maxLength={20}
          />
        </div>
        <p className="profile-row__hint">本名で なくて 大丈夫です。あとで 変えられます。</p>
      </div>

      <AvatarPicker
        animal={state.profile.animal}
        avatarTone={state.profile.avatarTone ?? "terra"}
        onAnimalChange={(animal) => patchProfile({ animal })}
        onToneChange={(avatarTone) => patchProfile({ avatarTone })}
      />

      <div className="onboarding-footer">
        <button type="button" className="btn btn--primary btn--full" onClick={onContinue}>
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}
