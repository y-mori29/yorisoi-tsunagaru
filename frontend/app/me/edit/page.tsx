"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { AvatarPicker } from "@/components/screens/onboarding/AvatarPicker";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar } from "@/components/ui/Avatar";
import { getCurrentSession, type AuthUser } from "@/lib/auth/local-auth";
import { resolveMemberIdentity } from "@/lib/onboarding/identity";
import { readOnboardingState, writeOnboardingState } from "@/lib/onboarding/storage";
import type { OnboardingState } from "@/lib/onboarding/types";
import type { AnimalName } from "@/lib/icons";

type AvatarTone = NonNullable<OnboardingState["profile"]["avatarTone"]>;

export default function EditPublicProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthUser | null>(null);
  const [storedState, setStoredState] = useState<OnboardingState | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [animal, setAnimal] = useState<AnimalName>("rabbit");
  const [avatarTone, setAvatarTone] = useState<AvatarTone>("moss");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const currentSession = getCurrentSession();
      if (!currentSession) {
        router.replace("/auth/login?next=/me/edit");
        return;
      }
      const currentState = readOnboardingState();
      const identity = resolveMemberIdentity(currentSession, currentState);
      setSession(currentSession);
      setStoredState(currentState);
      setDisplayName(identity.displayName);
      setAnimal(identity.animal);
      setAvatarTone(identity.avatarTone);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [router]);

  const preview = useMemo(() => ({
    displayName: displayName.trim() || "ななし",
    avatarSrc: `/assets/animals/${animal}.png`,
  }), [animal, displayName]);

  const save = () => {
    if (!storedState || !session) return;
    const next: OnboardingState = {
      ...storedState,
      profile: {
        ...storedState.profile,
        displayName: displayName.trim() || "ななし",
        animal,
        avatarTone,
      },
    };
    writeOnboardingState(next);
    setStoredState(next);
    setSaved(true);
    window.setTimeout(() => router.push("/me"), 500);
  };

  return (
    <>
      <AppHeader title="表示情報を編集" left={<BackButton fallbackHref="/me" />} />
      <main className="app-main app-main--no-nav public-profile-edit">
        <section className="public-profile-preview" aria-label="プロフィール表示のプレビュー">
          <Avatar animal={animal} src={preview.avatarSrc} tone={avatarTone} size={64} alt={preview.displayName} />
          <div>
            <span>ほかの人には、こう見えます</span>
            <strong>{preview.displayName}</strong>
            <p>メールアドレスや非公開の基本情報は表示されません。</p>
          </div>
        </section>

        <label className="public-profile-name">
          <span>表示名</span>
          <input
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value.slice(0, 20))}
            placeholder="例：こもれび"
          />
          <small>本名でなくて大丈夫です。20文字まで入力できます。</small>
        </label>

        <section className="public-profile-avatar" aria-labelledby="avatar-heading">
          <div>
            <h2 id="avatar-heading">アイコン</h2>
            <span>好きな動物と背景色を選べます</span>
          </div>
          <AvatarPicker
            animal={animal}
            avatarTone={avatarTone}
            onAnimalChange={setAnimal}
            onToneChange={setAvatarTone}
          />
        </section>

        {saved && <p className="public-profile-saved">表示情報を保存しました。</p>}
        <button type="button" className="btn btn--primary btn--full" onClick={save} disabled={!storedState}>
          保存する
        </button>
      </main>
    </>
  );
}
