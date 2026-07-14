"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";
import { getRooms } from "@/lib/api/rooms";
import { getHealthRecommendation } from "@/lib/onboarding/recommendations";
import { useStoredHealthContext } from "@/lib/onboarding/useStoredHealthContext";
import { searchExplorePosts, searchTopics } from "@/lib/mock/explore";
import type { Room, RoomKind } from "@/lib/api/types";
import type { ExplorePost } from "@/lib/mock/explore";

type BrowseKind = "disease" | "symptom" | "concern";

const BROWSE_OPTIONS: Array<{
  kind: BrowseKind;
  title: string;
  body: string;
  icon: "leaf" | "whisper" | "heart";
  examples: string;
}> = [
  {
    kind: "disease",
    title: "病気から探す",
    body: "同じ病気の人の体験や、通院・治療中の声へ",
    icon: "leaf",
    examples: "潰瘍性大腸炎・クローン病・がん など",
  },
  {
    kind: "symptom",
    title: "症状から探す",
    body: "病名が分からない時も、今ある症状を入口に",
    icon: "whisper",
    examples: "腹痛・強い疲れ・しびれ・息苦しさ など",
  },
  {
    kind: "concern",
    title: "暮らしや不安から探す",
    body: "仕事、家族、診断前など、生活に近いテーマへ",
    icon: "heart",
    examples: "検査待ち・仕事との両立・通院前の不安 など",
  },
];

const FALLBACK_ROOM_IDS = [
  "room-before-diagnosis",
  "room-night-anxiety",
  "room-work-school",
  "room-fatigue",
];

const KIND_LABEL: Record<RoomKind, string> = {
  disease: "病気",
  symptom: "症状",
  concern: "悩み",
  medication: "薬",
  treatment: "治療",
};

export default function FindPage() {
  const allRooms = use(getRooms());
  const { healthContext } = useStoredHealthContext();
  const recommendation = useMemo(() => getHealthRecommendation(healthContext), [healthContext]);
  const [query, setQuery] = useState("");
  const [browseKind, setBrowseKind] = useState<BrowseKind | null>(null);
  const [visibleVoiceCount, setVisibleVoiceCount] = useState(6);

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const searchedPosts = useMemo(() => searchExplorePosts(trimmedQuery), [trimmedQuery]);
  const searchedRooms = useMemo(() => {
    if (!trimmedQuery) return [];
    const topicRoomIds = new Set(
      searchTopics(trimmedQuery)
        .map((topic) => topic.roomHref?.split("/").pop())
        .filter((roomId): roomId is string => Boolean(roomId)),
    );
    const normalized = trimmedQuery.toLocaleLowerCase("ja");
    return allRooms.filter((room) => {
      const roomText = `${room.name} ${room.description} ${KIND_LABEL[room.kind]}`.toLocaleLowerCase("ja");
      return topicRoomIds.has(room.id) || roomText.includes(normalized);
    });
  }, [allRooms, trimmedQuery]);

  const recommendedRooms = useMemo(() => {
    const ids = recommendation.roomIds.length > 0 ? recommendation.roomIds : FALLBACK_ROOM_IDS;
    return ids
      .map((roomId) => allRooms.find((room) => room.id === roomId))
      .filter((room): room is Room => Boolean(room))
      .slice(0, 4);
  }, [allRooms, recommendation.roomIds]);

  const browsedRooms = useMemo(
    () => browseKind ? allRooms.filter((room) => roomMatchesBrowseKind(room, browseKind)) : [],
    [allRooms, browseKind],
  );

  const selectBrowseKind = (kind: BrowseKind) => {
    setBrowseKind(kind);
    setQuery("");
    window.requestAnimationFrame(() => {
      document.getElementById("find-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <main className="explore-shell find-hub-shell">
        <header className="find-header">
          <BackButton fallbackHref="/home" />
          <h1>探す</h1>
          <Link href="/rooms" className="find-header__themes">テーマ</Link>
        </header>

        <section className="find-hub-hero" aria-labelledby="find-title">
          <span className="find-hub-hero__icon" aria-hidden="true">
            <Icon name="search" size={22} />
          </span>
          <div>
            <p>近い声を見つける</p>
            <h2 id="find-title">病気・症状・悩みから探す</h2>
            <span>言葉で検索するか、入口を選ぶと、近いテーマと声をたどれます。</span>
          </div>
        </section>

        <label className="find-search find-search--hub">
          <Icon name="search" size={19} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setBrowseKind(null);
              setVisibleVoiceCount(6);
            }}
            placeholder="病気・症状・悩みを入力"
            aria-label="病気・症状・悩みを検索"
          />
          {hasQuery && (
            <button type="button" onClick={() => setQuery("")} aria-label="検索をクリア">
              <Icon name="close" size={15} />
            </button>
          )}
        </label>

        {!hasQuery && !browseKind && (
          <>
            <section className="find-way-section" aria-labelledby="find-way-title">
              <div className="find-section-heading">
                <div>
                  <p>入口を選ぶ</p>
                  <h2 id="find-way-title">どこから探しますか</h2>
                </div>
                <Link href="/rooms">すべてのテーマ</Link>
              </div>
              <div className="find-way-list">
                {BROWSE_OPTIONS.map((option) => (
                  <button key={option.kind} type="button" onClick={() => selectBrowseKind(option.kind)}>
                    <span className={`find-way-list__icon find-way-list__icon--${option.kind}`}>
                      <Icon name={option.icon} size={20} />
                    </span>
                    <span className="find-way-list__copy">
                      <strong>{option.title}</strong>
                      <span>{option.body}</span>
                      <small>{option.examples}</small>
                    </span>
                    <Icon name="chevronRight" size={17} />
                  </button>
                ))}
              </div>
            </section>

            <section className="find-nearby-section" aria-labelledby="find-nearby-title">
              <div className="find-section-heading">
                <div>
                  <p>今の設定から</p>
                  <h2 id="find-nearby-title">あなたに近いテーマ</h2>
                </div>
                <Link href="/onboarding/condition">設定を変える</Link>
              </div>
              <p className="find-nearby-section__lead">{recommendation.roomsLead}</p>
              <FindRoomList rooms={recommendedRooms} compact />
            </section>
          </>
        )}

        {browseKind && !hasQuery && (
          <section className="find-browse-results" id="find-results" aria-labelledby="find-browse-title">
            <button type="button" className="find-browse-results__back" onClick={() => setBrowseKind(null)}>
              <Icon name="back" size={15} />
              探し方を選び直す
            </button>
            <div className="find-section-heading">
              <div>
                <p>テーマから読む</p>
                <h2 id="find-browse-title">{BROWSE_OPTIONS.find((option) => option.kind === browseKind)?.title}</h2>
              </div>
            </div>
            <FindRoomList rooms={browsedRooms.slice(0, 10)} />
            <Link href={`/rooms#${browseKind}`} className="find-all-themes-link">
              この種類のテーマをすべて見る
              <Icon name="chevronRight" size={15} />
            </Link>
          </section>
        )}

        {hasQuery && (
          <section className="find-search-results" id="find-results" aria-labelledby="find-search-results-title">
            <div className="find-section-heading">
              <div>
                <p>検索結果</p>
                <h2 id="find-search-results-title">「{trimmedQuery}」から探す</h2>
              </div>
            </div>

            {searchedRooms.length > 0 && (
              <section className="find-result-block" aria-labelledby="find-theme-results-title">
                <div className="find-result-block__head">
                  <h3 id="find-theme-results-title">近いテーマ</h3>
                  <span>{searchedRooms.length}件</span>
                </div>
                <FindRoomList rooms={searchedRooms.slice(0, 6)} />
              </section>
            )}

            <FindVoiceResults
              query={trimmedQuery}
              posts={searchedPosts}
              visibleCount={visibleVoiceCount}
              onLoadMore={
                visibleVoiceCount < searchedPosts.length
                  ? () => setVisibleVoiceCount((current) => current + 12)
                  : undefined
              }
            />

            {searchedRooms.length === 0 && searchedPosts.length === 0 && (
              <div className="find-no-results">
                <Icon name="search" size={22} />
                <p>近いテーマや声が見つかりませんでした</p>
                <span>言葉を短くするか、病名が分からない場合は症状や不安から探せます。</span>
                <button type="button" onClick={() => { setQuery(""); setBrowseKind("symptom"); }}>
                  症状から探す
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <BottomNav active="stroll" />
    </>
  );
}

function FindRoomList({ rooms, compact = false }: { rooms: Room[]; compact?: boolean }) {
  return (
    <ul className={`rooms-list find-room-list${compact ? " rooms-list--compact" : ""}`}>
      {rooms.map((room) => (
        <li key={room.id}>
          <Link href={`/rooms/${room.id}`} className={`rooms-row rooms-row--${room.tone}`}>
            <span className="rooms-row__icon" aria-hidden="true">
              <Icon name={kindToIcon(room.kind)} size={19} />
            </span>
            <span className="rooms-row__body">
              <span className="rooms-row__titleline">
                <strong>{room.name}</strong>
                <em>{KIND_LABEL[room.kind]}</em>
              </span>
              <span className="rooms-row__description">{room.description}</span>
              <span className="rooms-row__movement">
                <Icon name="whisper" size={12} />
                このテーマの声を読む
              </span>
            </span>
            <Icon name="chevronRight" size={18} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FindVoiceResults({
  query,
  posts,
  visibleCount,
  onLoadMore,
}: {
  query: string;
  posts: ExplorePost[];
  visibleCount: number;
  onLoadMore?: () => void;
}) {
  const shown = posts.slice(0, visibleCount);

  if (posts.length === 0) return null;

  return (
    <section className="find-result-block" aria-labelledby="find-voice-results-title">
      <div className="find-result-block__head">
        <h3 id="find-voice-results-title">近い声</h3>
        <span>{posts.length}件</span>
      </div>
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
                  <span><Icon name="understand" size={13} />{post.viewCount ?? "0"}</span>
                  <span>読む<Icon name="chevronRight" size={13} /></span>
                </footer>
              </Link>
            </article>
          );
        })}
      </div>

      <aside className="find-post-entry" aria-label="この文脈で声を書く">
        <div>
          <p>同じ文脈に、あなたの声も置けます</p>
          <span>「{query}」を引き継いで書き始めます。</span>
        </div>
        <Link href={`/post?context=${encodeURIComponent(query)}`}>
          この内容で書く
          <Icon name="plus" size={15} />
        </Link>
      </aside>

      {onLoadMore && (
        <button type="button" className="find-voice-preview__more" onClick={onLoadMore}>
          さらに声を読む
          <Icon name="chevronDown" size={15} />
        </button>
      )}
    </section>
  );
}

function roomMatchesBrowseKind(room: Room, kind: BrowseKind) {
  if (kind === "concern") return room.kind === "concern" || room.kind === "treatment";
  return room.kind === kind;
}

function kindToIcon(kind: RoomKind): "leaf" | "whisper" | "heart" | "flower" | "shield" {
  switch (kind) {
    case "disease": return "leaf";
    case "symptom": return "whisper";
    case "concern": return "heart";
    case "medication": return "flower";
    case "treatment": return "shield";
  }
}
