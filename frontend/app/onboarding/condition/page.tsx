"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { Icon } from "@/components/ui/Icon";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { diseaseCatalog, searchDiseases } from "@/lib/mock/explore";
import type { DiseaseCatalogEntry, PatientDiseaseSelection } from "@/lib/mock/explore";
import {
  CONCERN_CATALOG,
  SYMPTOM_CATALOG,
  createCatalogDiseaseSelection,
  createFreeTextDiseaseSelection,
  createPendingDiseaseSelection,
  createTopicSelection,
  touchHealthContext,
  type HealthTopicCatalogEntry,
  type MemberHealthContext,
  type PatientTopicSelection,
} from "@/lib/onboarding/types";

const diagnosisLabels: Record<MemberHealthContext["diagnosisStatus"], string> = {
  diagnosed: "診断されています",
  suspected: "疑い・検査中です",
  pending: "まだ決まっていません",
  unknown: "まだ分かりません",
};

export default function ConditionPage() {
  return (
    <Suspense fallback={<ConditionFallback />}>
      <ConditionContent />
    </Suspense>
  );
}

function ConditionFallback() {
  return (
    <OnboardingShell current="/onboarding/condition" showBack backHref="/onboarding/profile">
      <h2 className="onboarding-section-title">あなたに近い声を届けるために</h2>
      <p className="onboarding-section-sub">病気・症状・不安を選ぶ準備をしています。</p>
    </OnboardingShell>
  );
}

function ConditionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/home";
  const skipHref = next;
  const backHref = `/onboarding/profile?next=${encodeURIComponent(next)}`;
  const { state, update } = useOnboarding();
  const [query, setQuery] = useState("");
  const appliedParams = useRef(false);

  useEffect(() => {
    const gate = signInGateHref("/onboarding/condition");
    if (gate) router.replace(gate);
  }, [router]);

  const context = state.healthContext;
  const diseaseSearch = useMemo(() => searchDiseases(query), [query]);
  const hasQuery = query.trim().length > 0;
  const diseaseCandidates = hasQuery
    ? diseaseSearch.matches.slice(0, 8)
    : diseaseCatalog.filter((disease) => disease.featured).slice(0, 10);

  const syncContext = useCallback((nextContext: MemberHealthContext) => {
    const touched = touchHealthContext(nextContext);
    const conditionIds = [
      touched.primaryDisease?.selectedDiseaseId ?? touched.primaryDisease?.rawInput,
      ...touched.secondaryDiseases.map((disease) => disease.selectedDiseaseId ?? disease.rawInput),
      ...touched.symptoms.map((topic) => topic.topicId ?? topic.rawInput),
      ...touched.concerns.map((topic) => topic.topicId ?? topic.rawInput),
    ].filter((id): id is string => Boolean(id));

    update({
      healthContext: touched,
      conditions: conditionIds,
      conditionDeclined: false,
    });
  }, [update]);

  const setDiagnosisStatus = (diagnosisStatus: MemberHealthContext["diagnosisStatus"]) => {
    syncContext({
      ...context,
      diagnosisStatus,
      primaryDisease: context.primaryDisease
        ? { ...context.primaryDisease, diagnosisStatus }
        : diagnosisStatus === "pending"
          ? createPendingDiseaseSelection()
          : context.primaryDisease,
    });
  };

  const selectDisease = useCallback((selection: PatientDiseaseSelection) => {
    syncContext({
      ...context,
      primaryDisease: selection,
      diagnosisStatus: selection.diagnosisStatus,
    });
    setQuery("");
  }, [context, syncContext]);

  useEffect(() => {
    if (appliedParams.current) return;
    appliedParams.current = true;

    const diseaseId = searchParams.get("disease");
    const diseaseName = searchParams.get("diseaseName");
    const status = searchParams.get("status");
    let selection: PatientDiseaseSelection | null = null;

    if (status === "pending") {
      selection = createPendingDiseaseSelection();
    } else if (diseaseId) {
      const disease = diseaseCatalog.find((item) => item.id === diseaseId);
      if (disease) {
        selection = createCatalogDiseaseSelection(disease);
      }
    } else if (diseaseName) {
      const decoded = diseaseName.trim();
      if (decoded) {
        selection = createFreeTextDiseaseSelection(decoded);
      }
    }

    if (!selection) return;
    const frame = window.requestAnimationFrame(() => selectDisease(selection));
    return () => window.cancelAnimationFrame(frame);
  }, [searchParams, selectDisease]);

  const clearDisease = () => {
    syncContext({
      ...context,
      primaryDisease: null,
      diagnosisStatus: context.symptoms.length || context.concerns.length ? context.diagnosisStatus : "unknown",
    });
  };

  const toggleTopic = (topic: HealthTopicCatalogEntry) => {
    const key = topic.kind === "symptom" ? "symptoms" : "concerns";
    const current = context[key];
    const exists = current.some((selected) => selected.topicId === topic.id);
    const nextTopics = exists
      ? current.filter((selected) => selected.topicId !== topic.id)
      : [...current, createTopicSelection(topic)];

    syncContext({
      ...context,
      [key]: nextTopics,
    });
  };

  const skipSelection = () => {
    update({
      conditionDeclined: true,
      conditions: [],
      healthContext: touchHealthContext({
        ...context,
        primaryDisease: null,
        secondaryDiseases: [],
        symptoms: [],
        concerns: [],
        diagnosisStatus: "unknown",
      }),
    });
    router.push(next);
  };

  const onContinue = () => {
    router.push(next);
  };

  return (
    <OnboardingShell
      current="/onboarding/condition"
      skipHref={skipHref}
      showBack
      backHref={backHref}
    >
      <h2 className="onboarding-section-title">あなたに近い声を届けるために</h2>
      <p className="onboarding-section-sub">
        病気・症状・不安を選んでください。
        <br />
        病名がまだ決まっていなくても大丈夫です。
        <br />
        あとからマイページでも変えられます。
      </p>

      <section className="health-context-card" aria-label="選んでいる内容">
        <div className="health-context-card__head">
          <span>選択中</span>
          <p>近い声やテーマを出すための設定です。あとから変更できます。</p>
        </div>
        <SelectedSummary context={context} onClearDisease={clearDisease} />
      </section>

      <section className="health-context-section" aria-labelledby="disease-title">
        <div className="health-context-section__head">
          <h3 id="disease-title">主な病気</h3>
          <span>専用テーマがなくても選べます</span>
        </div>

        <div className="condition-search">
          <Icon name="search" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="病名・疑い病名を入力"
            aria-label="病名を検索"
          />
        </div>

        <div className="health-disease-list">
          {diseaseCandidates.map((disease) => (
            <DiseaseChoice
              key={disease.id}
              disease={disease}
              selected={context.primaryDisease?.selectedDiseaseId === disease.id}
              onSelect={() => selectDisease(createCatalogDiseaseSelection(disease))}
            />
          ))}

          {diseaseSearch.freeTextSelection && hasQuery && (
            <button
              type="button"
              className="health-free-choice"
              onClick={() => selectDisease(createFreeTextDiseaseSelection(query.trim()))}
            >
              <span>
                <small>候補になくても選べます</small>
                「{query.trim()}」を自分の病気として選ぶ
              </span>
              <Icon name="plus" />
            </button>
          )}

          <button
            type="button"
            className={`health-pending-choice ${context.diagnosisStatus === "pending" ? "is-active" : ""}`.trim()}
            onClick={() => selectDisease(createPendingDiseaseSelection())}
          >
            <span>
              <small>診断前・検査中の方へ</small>
              まだ診断名が決まっていない
            </span>
            <Icon name="chevronRight" />
          </button>
        </div>
      </section>

      <section className="health-context-section" aria-labelledby="diagnosis-title">
        <div className="health-context-section__head">
          <h3 id="diagnosis-title">診断の状態</h3>
          <span>言える範囲で大丈夫です</span>
        </div>
        <div className="health-status-row">
          {(Object.keys(diagnosisLabels) as Array<MemberHealthContext["diagnosisStatus"]>).map((status) => (
            <button
              key={status}
              type="button"
              className={context.diagnosisStatus === status ? "is-active" : ""}
              onClick={() => setDiagnosisStatus(status)}
            >
              {diagnosisLabels[status]}
            </button>
          ))}
        </div>
      </section>

      <TopicSection
        title="症状"
        lead="病名が違っても、近い声につながる入口になります。"
        topics={SYMPTOM_CATALOG}
        selected={context.symptoms}
        onToggle={toggleTopic}
      />

      <TopicSection
        title="不安・暮らしの悩み"
        lead="仕事、家族、医療費、診断前の不安なども選べます。"
        topics={CONCERN_CATALOG}
        selected={context.concerns}
        onToggle={toggleTopic}
      />

      <button type="button" className="health-skip" onClick={skipSelection}>
        今は選ばずに進む
      </button>

      <div className="onboarding-footer">
        <button type="button" className="btn btn--primary btn--full" onClick={onContinue}>
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}

function DiseaseChoice({
  disease,
  selected,
  onSelect,
}: {
  disease: DiseaseCatalogEntry;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" className={`health-disease-choice ${selected ? "is-active" : ""}`} onClick={onSelect}>
      <span>
        <strong>{disease.displayName}</strong>
        {disease.aliases?.[0] && <small>{disease.aliases.join(" / ")}</small>}
      </span>
      <Icon name={selected ? "check" : "plus"} />
    </button>
  );
}

function TopicSection({
  title,
  lead,
  topics,
  selected,
  onToggle,
}: {
  title: string;
  lead: string;
  topics: HealthTopicCatalogEntry[];
  selected: PatientTopicSelection[];
  onToggle: (topic: HealthTopicCatalogEntry) => void;
}) {
  const selectedIds = new Set(selected.map((topic) => topic.topicId));

  return (
    <section className="health-context-section">
      <div className="health-context-section__head">
        <h3>{title}</h3>
        <span>{lead}</span>
      </div>
      <div className="health-topic-grid">
        {topics.map((topic) => {
          const active = selectedIds.has(topic.id);
          return (
            <button
              key={topic.id}
              type="button"
              className={active ? "is-active" : ""}
              onClick={() => onToggle(topic)}
            >
              {topic.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SelectedSummary({
  context,
  onClearDisease,
}: {
  context: MemberHealthContext;
  onClearDisease: () => void;
}) {
  const hasSelection = Boolean(context.primaryDisease || context.symptoms.length || context.concerns.length);

  if (!hasSelection) {
    return <p className="health-context-empty">まだ選ばれていません。</p>;
  }

  return (
    <div className="health-selected-summary">
      {context.primaryDisease && (
        <button type="button" onClick={onClearDisease} aria-label="主な病気を外す">
          <strong>{context.primaryDisease.selectedDiseaseName ?? "診断名がまだ決まっていない"}</strong>
          <span>主な病気</span>
          <Icon name="close" />
        </button>
      )}
      {context.symptoms.map((topic) => (
        <span key={`symptom-${topic.topicId ?? topic.topicName}`}>{topic.topicName}</span>
      ))}
      {context.concerns.map((topic) => (
        <span key={`concern-${topic.topicId ?? topic.topicName}`}>{topic.topicName}</span>
      ))}
    </div>
  );
}
