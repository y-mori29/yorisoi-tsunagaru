"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { CheckOption } from "@/components/screens/onboarding/CheckOption";
import { Icon } from "@/components/ui/Icon";
import { nextStep } from "@/lib/onboarding/routing";
import { CONDITION_CATALOG } from "@/lib/onboarding/types";

/**
 * /onboarding/condition — 病気・症状の検索選択。
 *
 * 設計：
 * - チェックボックスのフラットリストではなく、検索 + 候補追加 + chip 削除型
 * - 確定診断がない方・症状だけの方も含められるよう、症状ベース項目を含む
 * - 「答えたくない」は独立した選択肢として、最下部に
 */
export default function ConditionPage() {
  const router = useRouter();
  const { state, update } = useOnboarding();
  const [query, setQuery] = useState("");

  const selectedIds = state.conditions;
  const declined = state.conditionDeclined;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // 初期表示：頭から 8 件（IBD・主要膠原病など）
      return CONDITION_CATALOG.slice(0, 8);
    }
    return CONDITION_CATALOG.filter((c) => {
      const labelHit = c.label.toLowerCase().includes(q);
      const kanaHit = c.kana ? c.kana.includes(q) : false;
      return labelHit || kanaHit;
    });
  }, [query]);

  const candidates = filtered.filter((c) => !selectedIds.includes(c.id));

  const add = (id: string) => {
    if (declined) update({ conditionDeclined: false });
    update({ conditions: [...selectedIds, id] });
    setQuery("");
  };

  const remove = (id: string) => {
    update({ conditions: selectedIds.filter((s) => s !== id) });
  };

  const toggleDeclined = () => {
    if (declined) {
      update({ conditionDeclined: false });
    } else {
      // 「答えたくない」を選んだら、選択肢クリア
      update({ conditionDeclined: true, conditions: [] });
      setQuery("");
    }
  };

  const onContinue = () => {
    router.push(nextStep("/onboarding/condition", state.purposes));
  };

  return (
    <OnboardingShell current="/onboarding/condition" showBack backHref="/onboarding/purpose">
      <h2 className="onboarding-section-title">気になる 病気や 症状は？</h2>
      <p className="onboarding-section-sub">
        確定診断が なくても、症状だけでも 大丈夫です。
        <br />
        いくつでも 選べます。
      </p>

      {/* 検索インプット */}
      <div className="condition-search">
        <Icon name="search" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例: クローン、ベーチェット、関節の痛み…"
          disabled={declined}
          aria-label="病気や症状を検索"
        />
      </div>

      {/* 選んでいる chip */}
      {selectedIds.length > 0 && !declined && (
        <div className="condition-selected">
          <div className="condition-selected__label">選んでいるもの</div>
          <div className="condition-selected__list">
            {selectedIds.map((id) => {
              const c = CONDITION_CATALOG.find((cat) => cat.id === id);
              if (!c) return null;
              return (
                <button
                  key={id}
                  type="button"
                  className="condition-chip"
                  onClick={() => remove(id)}
                  aria-label={`${c.label} を 外す`}
                >
                  <span>{c.label}</span>
                  <Icon name="close" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 候補リスト */}
      {!declined && (
        <div className="condition-candidates">
          {candidates.length === 0 ? (
            <p className="condition-empty">
              {query
                ? "見つかりませんでした。\n別の ことばで 試してみてください。"
                : "すべて 選択済みです。"}
            </p>
          ) : (
            candidates.map((c) => (
              <button
                key={c.id}
                type="button"
                className="condition-candidate"
                onClick={() => add(c.id)}
              >
                <span>{c.label}</span>
                <Icon name="plus" />
              </button>
            ))
          )}
        </div>
      )}

      {/* 独立した「答えたくない」 */}
      <div style={{ marginTop: 20 }}>
        <CheckOption
          label="答えたくない"
          checked={declined}
          onChange={toggleDeclined}
        />
      </div>

      <div className="onboarding-footer">
        <button type="button" className="btn btn--primary btn--full" onClick={onContinue}>
          進む
        </button>
      </div>
    </OnboardingShell>
  );
}
