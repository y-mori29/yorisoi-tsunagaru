"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";
import {
  explorePosts,
  getDiagnosisPendingGuideTopics,
  getDiseaseGuideTopics,
  getFreeTextDiseaseGuideTopics,
  getTopicsByKind,
  searchExplorePosts,
  searchDiseases,
  searchTopics,
} from "@/lib/mock/explore";
import type { DiseaseCatalogEntry, DiseaseSearchResult, ExplorePost, ExploreTopic, ExploreTopicKind } from "@/lib/mock/explore";

const groupLabels: Record<ExploreTopicKind, string> = {
  condition: "病気",
  symptom: "症状",
  concern: "暮らしの悩み",
};

const groupLead: Record<ExploreTopicKind, string> = {
  condition: "難病・希少疾患・がん・慢性疾患など",
  symptom: "病名がまだ分からない時も、症状から探せます",
  concern: "仕事、家族、医療費、診断前の不安など",
};

const groupIcons: Record<ExploreTopicKind, "heart" | "leaf" | "flower"> = {
  condition: "heart",
  symptom: "leaf",
  concern: "flower",
};

export default function FindPage() {
  const [query, setQuery] = useState("");
  const [visibleSearchCount, setVisibleSearchCount] = useState(12);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Record<ExploreTopicKind, boolean>>({
    condition: false,
    symptom: false,
    concern: false,
  });

  const searched = useMemo(() => searchTopics(query), [query]);
  const diseaseSearch = useMemo(() => searchDiseases(query), [query]);
  const searchedPosts = useMemo(() => searchExplorePosts(query), [query]);
  const hasQuery = query.trim().length > 0;
  const nonDiseaseResults = searched.filter((topic) => topic.kind !== "condition");
  const selectedPosts = useMemo(() => {
    if (selectedTopics.length === 0) {
      return explorePosts.filter((post) =>
        ["診断前・検査待ち", "強い疲れ", "仕事との両立", "眠れない夜"].includes(post.topic),
      );
    }
    const labels = new Set(selectedTopics);
    return explorePosts.filter((post) => labels.has(post.topic));
  }, [selectedTopics]);

  const toggleTopic = (topic: ExploreTopic) => {
    setSelectedTopics((current) =>
      current.includes(topic.label)
        ? current.filter((label) => label !== topic.label)
        : [...current, topic.label].slice(-6),
    );
  };

  return (
    <>
      <main className="explore-shell">
        <header className="find-header">
          <BackButton fallbackHref="/home" />
          <h1>探す</h1>
          <span aria-hidden="true" />
        </header>

        <section className="find-hero" aria-labelledby="find-title">
          <span className="find-hero__leaf" aria-hidden="true">
            <Icon name="leaf" size={24} />
          </span>
          <h2 id="find-title">
            何千もの病気・症状から
            <br />
            探せます
          </h2>
          <p>
            病気の名前、気になる症状、暮らしの悩み。今の自分に近い入口から、同じような声を探せます。
          </p>
        </section>

        <label className="find-search">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleSearchCount(12);
            }}
            placeholder="病気・症状・悩みを入力"
          />
        </label>

        {hasQuery ? (
          <>
            <DiseaseSearchPanel query={query} result={diseaseSearch} />
            {nonDiseaseResults.length > 0 && (
              <section className="find-group" aria-label="症状と悩みの検索結果">
                <div className="find-group__head">
                  <div>
                    <h3>症状・悩みからも探せます</h3>
                    <p>病名がはっきりしない時も、近い声に進めます。</p>
                  </div>
                </div>
                <TopicCloud topics={nonDiseaseResults.slice(0, 24)} selectedLabels={selectedTopics} onToggle={toggleTopic} />
              </section>
            )}
          </>
        ) : (
          (["condition", "symptom", "concern"] as ExploreTopicKind[]).map((kind) => {
            const topics = getTopicsByKind(kind);
            const visible = expanded[kind] ? topics : topics.slice(0, 14);
            return (
              <section key={kind} className={`find-group find-group--${kind}`}>
                <div className="find-group__head">
                  <div>
                    <h3>
                      <Icon name={groupIcons[kind]} size={17} />
                      {groupLabels[kind]}
                    </h3>
                    <p>{groupLead[kind]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded((current) => ({ ...current, [kind]: !current[kind] }))}
                  >
                    {expanded[kind] ? "閉じる" : "もっと見る"}
                    <Icon name={expanded[kind] ? "chevronDown" : "chevronRight"} size={14} />
                  </button>
                </div>
                <TopicCloud topics={visible} selectedLabels={selectedTopics} onToggle={toggleTopic} />
                {kind === "condition" && <DiagnosisPendingCard compact />}
              </section>
            );
          })
        )}

        <FindVoicePreview
          query={hasQuery ? query : undefined}
          selectedTopics={hasQuery ? [] : selectedTopics}
          posts={hasQuery ? searchedPosts : selectedPosts}
          visibleCount={hasQuery ? visibleSearchCount : 4}
          onLoadMore={
            hasQuery && visibleSearchCount < searchedPosts.length
              ? () => setVisibleSearchCount((current) => current + 12)
              : undefined
          }
          onClear={() => setSelectedTopics([])}
        />
      </main>

      <BottomNav active="stroll" />
    </>
  );
}

function DiseaseSearchPanel({ query, result }: { query: string; result: DiseaseSearchResult }) {
  const trimmedQuery = query.trim();

  return (
    <section className="find-group find-group--condition" aria-label="病名の検索結果">
      <div className="find-group__head">
        <div>
          <h3>
            <Icon name="heart" size={17} />
            病名から探す
          </h3>
          <p>候補にない病名でも、その言葉を残して近いテーマへ進めます。</p>
        </div>
      </div>

      {result.matches.length > 0 && (
        <div className="find-disease-results">
          {result.matches.slice(0, 8).map((disease) => (
            <DiseaseResultCard key={disease.id} disease={disease} />
          ))}
        </div>
      )}

      {result.freeTextSelection && trimmedQuery && (
        <FreeTextDiseaseCard diseaseName={trimmedQuery} />
      )}

      <DiagnosisPendingCard />
    </section>
  );
}

function DiseaseResultCard({ disease }: { disease: DiseaseCatalogEntry }) {
  const guideTopics = getDiseaseGuideTopics(disease);
  const mainRoom = guideTopics[0];

  return (
    <article className={`find-disease-card find-disease-card--${disease.tone}`}>
      <div className="find-disease-card__main">
        <div>
          <p className="find-disease-card__label">候補から選ぶ</p>
          <h4>{disease.displayName}</h4>
          {disease.aliases?.[0] && <span>{disease.aliases.join(" / ")}</span>}
        </div>
        <div className="find-disease-card__actions">
          <Link href={`/onboarding/condition?disease=${disease.id}`} className="find-disease-card__button">
            自分に追加
            <Icon name="check" size={14} />
          </Link>
          {mainRoom?.roomHref && (
            <Link href={mainRoom.roomHref} className="find-disease-card__button find-disease-card__button--ghost">
              声を読む
              <Icon name="chevronRight" size={14} />
            </Link>
          )}
        </div>
      </div>
      <GuideTopicLinks title="近いテーマ" topics={guideTopics.slice(0, 4)} />
    </article>
  );
}

function FreeTextDiseaseCard({ diseaseName }: { diseaseName: string }) {
  return (
    <article className="find-disease-card find-disease-card--free">
      <div className="find-disease-card__main">
        <div>
          <p className="find-disease-card__label">リストになくても大丈夫です</p>
          <h4>「{diseaseName}」で始める</h4>
          <span>専用テーマがまだなくても、近い症状や不安の声を読めます。</span>
        </div>
        <Link
          href={`/onboarding/condition?diseaseName=${encodeURIComponent(diseaseName)}`}
          className="find-disease-card__button"
        >
          自分に追加
          <Icon name="check" size={14} />
        </Link>
      </div>
      <GuideTopicLinks title="まず読める近いテーマ" topics={getFreeTextDiseaseGuideTopics()} />
    </article>
  );
}

function DiagnosisPendingCard({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`find-diagnosis-card${compact ? " find-diagnosis-card--compact" : ""}`}>
      <div className="find-diagnosis-card__copy">
        <p>まだ診断名が決まっていない</p>
        <span>検査中・疑い病名・診療科だけ分かっている方も、症状や不安から探せます。</span>
      </div>
      <Link href="/onboarding/condition?status=pending" className="find-diagnosis-card__select">
        診断前として選ぶ
        <Icon name="chevronRight" size={14} />
      </Link>
      <GuideTopicLinks title="診断前の方へ" topics={getDiagnosisPendingGuideTopics()} />
    </article>
  );
}

function GuideTopicLinks({ title, topics }: { title: string; topics: ExploreTopic[] }) {
  if (topics.length === 0) return null;

  return (
    <div className="find-guide-links" aria-label={title}>
      <p>{title}</p>
      <div>
        {topics.map((topic) => (
          <Link key={topic.id} href={topic.roomHref ?? "/home#feed"}>
            {topic.label}
            <Icon name="chevronRight" size={13} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function TopicCloud({
  topics,
  selectedLabels,
  onToggle,
}: {
  topics: ExploreTopic[];
  selectedLabels: string[];
  onToggle: (topic: ExploreTopic) => void;
}) {
  if (topics.length === 0) {
    return <p className="find-empty">近いテーマが見つかりませんでした。</p>;
  }

  return (
    <div className="find-topic-cloud">
      {topics.map((topic) => {
        const selected = selectedLabels.includes(topic.label);
        return (
          <button
            key={topic.id}
            type="button"
            className={`find-topic find-topic--${topic.tone} ${selected ? "is-active" : ""}`.trim()}
            onClick={() => onToggle(topic)}
          >
            {topic.label}
            {topic.aliases?.[0] && <span>{topic.aliases[0]}</span>}
          </button>
        );
      })}
    </div>
  );
}

function FindVoicePreview({
  query,
  selectedTopics,
  posts,
  visibleCount,
  onLoadMore,
  onClear,
}: {
  query?: string;
  selectedTopics: string[];
  posts: ExplorePost[];
  visibleCount: number;
  onLoadMore?: () => void;
  onClear: () => void;
}) {
  const shown = posts.slice(0, visibleCount);
  const trimmedQuery = query?.trim();
  const hasSearch = Boolean(trimmedQuery);

  return (
    <section className="find-voice-preview" aria-label="近い声">
      <div className="find-voice-preview__head">
        <div>
          <p>
            {hasSearch
              ? `「${trimmedQuery}」に近い声 ${posts.length}件`
              : selectedTopics.length > 0
                ? "選んだ内容に近い声"
                : "近い声が見つかりました"}
          </p>
          <span>
            {hasSearch
              ? "病名・症状・暮らしの悩み・体験談の本文から探しています。"
              : selectedTopics.length > 0
              ? selectedTopics.join("・")
              : "まずは読むだけでも大丈夫です。気になるテーマを押すと絞り込めます。"}
          </span>
        </div>
        {selectedTopics.length > 0 && (
          <button type="button" onClick={onClear}>
            解除
          </button>
        )}
      </div>

      {shown.length > 0 ? (
        <div className="find-voice-preview__list">
          {shown.map((post) => {
            const href = post.id.startsWith("uchiake-") ? `/voice/${post.id}` : "/home#feed";
            return (
              <article key={post.id} className="find-voice-card">
                <Link href={href} aria-label={`${post.topic}の近い声を読む`}>
                  <header>
                    <span className={`explore-topic-pill explore-topic-pill--${post.topicTone}`}>{post.topic}</span>
                    <small>{post.timeLabel}</small>
                  </header>
                  <p>{post.body}</p>
                  <footer>
                    <span>
                      <Icon name="understand" size={13} />
                      {post.viewCount ?? "0"}
                    </span>
                    <span>
                      読む
                      <Icon name="chevronRight" size={13} />
                    </span>
                  </footer>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="find-empty">
          近い声がまだ見つかりませんでした。言葉を短くするか、症状や暮らしの悩みでも探せます。
        </p>
      )}

      {onLoadMore ? (
        <button type="button" className="find-voice-preview__more" onClick={onLoadMore}>
          さらに声を読む
          <Icon name="chevronDown" size={15} />
        </button>
      ) : !hasSearch ? (
        <Link href="/home#feed" className="find-voice-preview__more">
          もっと近い声を読む
          <Icon name="chevronRight" size={15} />
        </Link>
      ) : null}
    </section>
  );
}

