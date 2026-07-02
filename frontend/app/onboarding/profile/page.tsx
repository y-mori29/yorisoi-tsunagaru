"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { nextStep } from "@/lib/onboarding/routing";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 105 }, (_, i) => CURRENT_YEAR - i); // 直近 105 年
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

type Gender = "male" | "female" | "other";
const GENDERS: Array<{ id: Gender; label: string }> = [
  { id: "male", label: "男" },
  { id: "female", label: "女" },
  { id: "other", label: "その他" },
];

/**
 * /onboarding/profile — ニックネーム + 性別 + 生年月日。
 * アバターは前画面 /onboarding/avatar で選択済み。
 *
 * 冨澤 MTG（2026-05-18）方針：
 * - 性別・生年月日は欲しい情報なので「答えたくない」を出さない
 * - 「変更不可」の強警告で初期入力に倒す（GRAVITY 画像 01 を踏襲）
 * - 年齢ではなく生年月日にする（なぜか心理的ハードルが低い）
 */
export default function ProfilePage() {
  const router = useRouter();
  const { state, patchProfile } = useOnboarding();
  const [name, setName] = useState(state.profile.displayName ?? "");

  const gender = state.profile.gender;
  const year = state.profile.birthYear;
  const month = state.profile.birthMonth;
  const day = state.profile.birthDay;

  const canContinue = Boolean(gender && year && month && day);

  const onContinue = () => {
    const finalName = name.trim();
    patchProfile({ displayName: finalName || "ななし" });
    router.push(nextStep("/onboarding/profile", state.purposes));
  };

  return (
    <OnboardingShell current="/onboarding/profile" showBack backHref="/onboarding/avatar">
      <h2 className="onboarding-section-title">あなたの ことを、少しだけ</h2>

      <div className="profile-warning" role="note">
        <strong>生年月日・性別は、いちど 選ぶと あとで 変えられません。</strong>
        <br />
        よく 確かめて、進んでください。
      </div>

      <div className="profile-form">
        {/* ニックネーム */}
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

        {/* 性別 */}
        <div className="profile-row profile-row--top">
          <span className="profile-row__label">性別</span>
          <div className="gender-row" role="radiogroup" aria-label="性別">
            {GENDERS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`gender-pill ${gender === g.id ? "is-active" : ""}`.trim()}
                onClick={() => patchProfile({ gender: g.id })}
                role="radio"
                aria-checked={gender === g.id}
              >
                <span className="gender-pill__dot" aria-hidden />
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 生年月日 */}
        <div className="profile-row profile-row--top">
          <span className="profile-row__label">生年月日</span>
          <div className="birth-row">
            <select
              className="birth-select"
              value={year ?? ""}
              onChange={(e) => patchProfile({ birthYear: Number(e.target.value) || undefined })}
              aria-label="生まれた 年"
            >
              <option value="">年</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              className="birth-select"
              value={month ?? ""}
              onChange={(e) => patchProfile({ birthMonth: Number(e.target.value) || undefined })}
              aria-label="生まれた 月"
            >
              <option value="">月</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className="birth-select"
              value={day ?? ""}
              onChange={(e) => patchProfile({ birthDay: Number(e.target.value) || undefined })}
              aria-label="生まれた 日"
            >
              <option value="">日</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="onboarding-footer">
        {!canContinue && (
          <p
            style={{
              font: "400 12px/1.6 var(--font-jp)",
              color: "var(--color-ink-500)",
              textAlign: "center",
              letterSpacing: "0.04em",
            }}
          >
            性別と 生年月日を 入れてから 進めます。
          </p>
        )}
        <button
          type="button"
          className="btn btn--primary btn--full"
          onClick={onContinue}
          disabled={!canContinue}
        >
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}
