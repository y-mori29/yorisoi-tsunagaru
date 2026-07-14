"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { readOnboardingState } from "@/lib/onboarding/storage";
import type { MemberHealthContext, OnboardingState } from "@/lib/onboarding/types";

const diagnosisLabels: Record<MemberHealthContext["diagnosisStatus"], string> = {
  diagnosed: "診断されています",
  suspected: "疑い・検査中です",
  pending: "まだ決まっていません",
  unknown: "まだ分かりません",
};

const visibilityLabels: Record<MemberHealthContext["visibility"], string> = {
  private: "自分だけ",
  room_members: "同じテーマの人",
  matched_members: "近い声の人",
};

function getPrimaryLabel(context: MemberHealthContext) {
  if (context.primaryDisease?.selectedDiseaseName) return context.primaryDisease.selectedDiseaseName;
  if (context.primaryDisease?.selectionMethod === "status" || context.diagnosisStatus === "pending") {
    return "まだ診断名が決まっていない";
  }
  return null;
}

function getContextChips(context: MemberHealthContext) {
  const chips = [
    ...context.symptoms.slice(0, 3).map((topic) => topic.topicName),
    ...context.concerns.slice(0, 3).map((topic) => topic.topicName),
  ];
  return Array.from(new Set(chips)).slice(0, 5);
}

export function HealthContextSummaryCard() {
  const [state, setState] = useState<OnboardingState | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setState(readOnboardingState());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const context = state?.healthContext;
  const primaryLabel = context ? getPrimaryLabel(context) : null;
  const chips = useMemo(() => (context ? getContextChips(context) : []), [context]);
  const hasAnyContext = Boolean(primaryLabel || chips.length > 0);

  return (
    <section className="health-summary-card" aria-label="自分の病気・症状・不安">
      <div className="health-summary-card__head">
        <span className="health-summary-card__icon">
          <Icon name="leaf" size={18} />
        </span>
        <div>
          <p>自分の病気・症状・不安</p>
          <span>近い声やテーマを見つけるための設定です</span>
        </div>
      </div>

      {state === null ? (
        <p className="health-summary-card__empty">読み込み中です。</p>
      ) : hasAnyContext && context ? (
        <>
          <dl className="health-summary-card__list">
            <div>
              <dt>主な病気</dt>
              <dd>{primaryLabel ?? "未設定"}</dd>
            </div>
            <div>
              <dt>診断の状態</dt>
              <dd>{diagnosisLabels[context.diagnosisStatus]}</dd>
            </div>
            <div>
              <dt>公開範囲</dt>
              <dd>{visibilityLabels[context.visibility]}</dd>
            </div>
          </dl>

          {chips.length > 0 && (
            <div className="health-summary-card__chips" aria-label="選択している症状や不安">
              {chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="health-summary-card__empty">
          まだ選ばれていません。病名が決まっていなくても、症状や不安から始められます。
        </p>
      )}

      <div className="health-summary-card__actions">
        <Link href="/onboarding/condition" className="btn btn--quiet btn--sm">
          変更する
        </Link>
        <Link href="/find" className="health-summary-card__link">
          近い声を探す
          <Icon name="chevronRight" size={14} />
        </Link>
      </div>
    </section>
  );
}
