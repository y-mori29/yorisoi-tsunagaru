"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { getCurrentSession, type AuthUser } from "@/lib/auth/local-auth";
import { diseaseCatalog, searchDiseases } from "@/lib/mock/explore";
import type { PatientDiseaseSelection } from "@/lib/mock/explore";
import { resolveMemberIdentity } from "@/lib/onboarding/identity";
import { useOnboarding } from "@/lib/onboarding/context";
import {
  createCatalogDiseaseSelection,
  createFreeTextDiseaseSelection,
  createPendingDiseaseSelection,
  touchHealthContext,
  type OnboardingState,
} from "@/lib/onboarding/types";

const CURRENT_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 100 }, (_, index) => CURRENT_YEAR - index);

const GENDER_OPTIONS: Array<{
  value: NonNullable<OnboardingState["profile"]["gender"]>;
  label: string;
}> = [
  { value: "female", label: "女性" },
  { value: "male", label: "男性" },
  { value: "other", label: "その他" },
  { value: "undisclosed", label: "答えたくない" },
];

export default function BasicInfoPage() {
  return (
    <Suspense fallback={<BasicInfoFallback />}>
      <BasicInfoContent />
    </Suspense>
  );
}

function BasicInfoFallback() {
  return (
    <OnboardingShell current="/onboarding/profile" canSkip={false}>
      <h2 className="onboarding-section-title">始める準備をしています</h2>
      <p className="onboarding-section-sub">入力はすべて、あとから変更できます。</p>
    </OnboardingShell>
  );
}

function BasicInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/home";
  const referralSource = searchParams.get("source")?.trim() || "";
  const isEditing = searchParams.get("mode") === "edit" || next === "/me";
  const { state, update } = useOnboarding();
  const [session, setSession] = useState<AuthUser | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setSession(getCurrentSession()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const identity = useMemo(() => resolveMemberIdentity(session, state), [session, state]);
  const diseaseSearch = useMemo(() => searchDiseases(query), [query]);
  const hasQuery = query.trim().length > 0;
  const diseaseCandidates = hasQuery
    ? diseaseSearch.matches.slice(0, 6)
    : diseaseCatalog.filter((disease) => disease.featured).slice(0, 6);

  const updateProfile = (patch: Partial<OnboardingState["profile"]>) => {
    update({ profile: { ...state.profile, ...patch } });
  };

  const selectDisease = (selection: PatientDiseaseSelection) => {
    update({
      conditionDeclined: false,
      conditions: [selection.selectedDiseaseId ?? selection.rawInput].filter((value): value is string => Boolean(value)),
      healthContext: touchHealthContext({
        ...state.healthContext,
        primaryDisease: selection,
        diagnosisStatus: selection.diagnosisStatus,
      }),
    });
    setQuery("");
  };

  const declineDisease = () => {
    update({
      conditionDeclined: true,
      conditions: [],
      healthContext: touchHealthContext({
        ...state.healthContext,
        primaryDisease: null,
        secondaryDiseases: [],
        diagnosisStatus: "unknown",
      }),
    });
  };

  const finish = () => {
    update({
      profile: {
        ...state.profile,
        displayName: state.profile.displayName?.trim() || identity.displayName,
        animal: state.profile.animal ?? identity.animal,
        avatarTone: state.profile.avatarTone ?? identity.avatarTone,
        referralSource: referralSource || state.profile.referralSource,
      },
    });
    router.push(next);
  };

  const selectedDisease = state.healthContext.primaryDisease;
  const birthYear = state.profile.birthYear;
  const gender = state.profile.gender;

  return (
    <OnboardingShell
      current="/onboarding/profile"
      canSkip={false}
      showBack={isEditing}
      backHref={isEditing ? "/me" : undefined}
      showProgress={!isEditing}
    >
      <h2 className="onboarding-section-title">
        {isEditing ? "非公開の基本情報" : "あなたに近い声を届けるために"}
      </h2>
      <p className="onboarding-section-sub">
        言える範囲だけで大丈夫です。
        <br />
        ここで選んだ内容は、プロフィールに自動公開されません。
      </p>

      {!isEditing && (
        <section className="basic-identity-card" aria-label="自動で設定される表示情報">
          <Avatar
            animal={identity.animal}
            src={identity.avatarSrc}
            tone={identity.avatarTone}
            size={52}
            alt={identity.displayName}
          />
          <div>
            <span>コミュニティでの表示</span>
            <strong>{identity.displayName}</strong>
            <p>表示名とアイコンは自動で設定します。マイページからいつでも変更できます。</p>
          </div>
        </section>
      )}

      <section className="basic-info-section" aria-labelledby="basic-disease-title">
        <div className="basic-info-section__head">
          <h3 id="basic-disease-title">病名・今の状態</h3>
          <span>任意</span>
        </div>

        {selectedDisease || state.conditionDeclined ? (
          <div className="basic-selected-row">
            <span className="basic-selected-row__icon"><Icon name="check" size={16} /></span>
            <div>
              <strong>
                {state.conditionDeclined
                  ? "答えたくない"
                  : selectedDisease?.selectedDiseaseName ?? "まだ診断名が決まっていない"}
              </strong>
              <small>近い声を選ぶためだけに使います</small>
            </div>
            <button type="button" onClick={() => {
              update({ conditionDeclined: false, conditions: [], healthContext: touchHealthContext({ ...state.healthContext, primaryDisease: null, diagnosisStatus: "unknown" }) });
            }}>
              変更
            </button>
          </div>
        ) : (
          <>
            <label className="condition-search basic-disease-search">
              <Icon name="search" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="病名・疑い病名を入力"
                aria-label="病名を検索"
              />
            </label>

            <div className="basic-disease-options">
              {diseaseCandidates.map((disease) => (
                <button key={disease.id} type="button" onClick={() => selectDisease(createCatalogDiseaseSelection(disease))}>
                  <span>{disease.displayName}</span>
                  <Icon name="chevronRight" size={15} />
                </button>
              ))}
              {hasQuery && diseaseSearch.freeTextSelection && (
                <button type="button" onClick={() => selectDisease(createFreeTextDiseaseSelection(query.trim()))}>
                  <span>「{query.trim()}」を入力して続ける</span>
                  <Icon name="plus" size={15} />
                </button>
              )}
            </div>

            <div className="basic-special-options">
              <button type="button" onClick={() => selectDisease(createPendingDiseaseSelection())}>
                まだ診断名が決まっていない
              </button>
              <button type="button" onClick={declineDisease}>答えたくない</button>
            </div>
          </>
        )}
      </section>

      <section className="basic-info-section" aria-labelledby="basic-year-title">
        <div className="basic-info-section__head">
          <h3 id="basic-year-title">生まれた年</h3>
          <span>任意・非公開</span>
        </div>
        <div className="basic-select-row">
          <select
            value={typeof birthYear === "number" ? String(birthYear) : ""}
            onChange={(event) => updateProfile({ birthYear: event.target.value ? Number(event.target.value) : undefined })}
            aria-label="生まれた年"
          >
            <option value="">選ばない</option>
            {BIRTH_YEARS.map((year) => <option key={year} value={year}>{year}年</option>)}
          </select>
          <button
            type="button"
            className={birthYear === "undisclosed" ? "is-active" : ""}
            onClick={() => updateProfile({ birthYear: "undisclosed" })}
          >
            答えたくない
          </button>
        </div>
      </section>

      <section className="basic-info-section" aria-labelledby="basic-gender-title">
        <div className="basic-info-section__head">
          <h3 id="basic-gender-title">性別</h3>
          <span>任意・非公開</span>
        </div>
        <div className="basic-gender-grid">
          {GENDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={gender === option.value ? "is-active" : ""}
              onClick={() => updateProfile({ gender: option.value })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="basic-privacy-note" aria-label="公開範囲の説明">
        <Icon name="lock" size={17} />
        <div>
          <strong>公開されるのは表示名とアイコンだけ</strong>
          <p>病名・生年・性別は、近い声を届けるための非公開情報として扱います。</p>
        </div>
      </section>

      <div className="onboarding-footer basic-info-footer">
        <button type="button" className="btn btn--primary btn--full" onClick={finish}>
          {isEditing ? "変更を保存する" : "この内容で始める"}
        </button>
        {!isEditing && <p>何も選ばなくても、そのまま始められます。</p>}
      </div>
    </OnboardingShell>
  );
}
