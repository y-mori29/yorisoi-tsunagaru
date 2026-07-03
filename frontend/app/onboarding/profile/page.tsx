"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { AvatarPicker } from "@/components/screens/onboarding/AvatarPicker";

/**
 * /onboarding/profile — ニックネーム + 動物アバター + 背景カラー。
 * 登録成功後の最初のステップ。次は /onboarding/condition。
 */
export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileFallback />}>
      <ProfileContent />
    </Suspense>
  );
}

function ProfileFallback() {
  return (
    <OnboardingShell current="/onboarding/profile" canSkip={false}>
      <h2 className="onboarding-section-title">あなたの ことを、少しだけ</h2>
      <p className="onboarding-section-sub">準備しています。</p>
    </OnboardingShell>
  );
}

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/home";
  const skipHref = next;
  const { state, patchProfile } = useOnboarding();
  const [name, setName] = useState(state.profile.displayName ?? "");

  const onContinue = () => {
    const finalName = name.trim();
    patchProfile({
      displayName: finalName || "ななし",
      avatarTone: state.profile.avatarTone ?? "terra",
    });
    router.push(`/onboarding/condition?next=${encodeURIComponent(next)}`);
  };

  return (
    <OnboardingShell current="/onboarding/profile" skipHref={skipHref}>
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
