"use client";

import { Suspense, use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { getCurrentSession } from "@/lib/auth/local-auth";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar, type AvatarTone } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { getRooms } from "@/lib/api/rooms";
import { getHealthRecommendation } from "@/lib/onboarding/recommendations";
import { readOnboardingState } from "@/lib/onboarding/storage";
import { useStoredHealthContext } from "@/lib/onboarding/useStoredHealthContext";
import type { AnimalName, IconName } from "@/lib/icons";

type WriteKind = "short" | "story" | "question" | "memo";
type Visibility = "public" | "near" | "room" | "quiet";

type WriteKindConfig = {
  value: WriteKind;
  title: string;
  body: string;
  icon: IconName;
  label: string;
  textareaLabel: string;
  placeholder: string;
  defaultVisibility: Visibility;
  visibilities: Visibility[];
};

const WRITE_KINDS: WriteKindConfig[] = [
  {
    value: "short",
    title: "ひとこと吐き出す（短い投稿）",
    body: "いまの気持ちを短く置きます",
    icon: "whisper",
    label: "ひとこと",
    textareaLabel: "いまの気持ち",
    placeholder: "うまくまとまらなくても大丈夫です\nひとことだけでも、あとで消しても大丈夫です",
    defaultVisibility: "near",
    visibilities: ["public", "near", "room", "quiet"],
  },
  {
    value: "story",
    title: "体験談を書く",
    body: "同じような人の参考になる経験を残します",
    icon: "leaf",
    label: "体験談",
    textareaLabel: "体験として残したいこと",
    placeholder: "同じような人に残しておきたいことを、できる範囲で書けます。\nいつ、何がつらかったか、どう過ごしたかなど。",
    defaultVisibility: "public",
    visibilities: ["public", "near", "room"],
  },
  {
    value: "question",
    title: "聞いてみる",
    body: "同じような人に、そっと質問します",
    icon: "chat",
    label: "質問",
    textareaLabel: "聞いてみたいこと",
    placeholder: "同じような方に聞いてみたいことを書けます。\n例: こういう時、みなさんはどうしていますか？",
    defaultVisibility: "room",
    visibilities: ["room"],
  },
  {
    value: "memo",
    title: "自分だけメモ",
    body: "まだ誰にも見せず、自分だけに残します",
    icon: "lock",
    label: "メモ",
    textareaLabel: "自分だけに残すこと",
    placeholder: "まだ誰にも見せなくて大丈夫です。\nあとで読み返すために、今の気持ちだけ置いておけます。",
    defaultVisibility: "quiet",
    visibilities: ["quiet"],
  },
];

const VISIBILITIES: Array<{ value: Visibility; title: string; body: string; icon: IconName }> = [
  { value: "public", title: "全体に置く", body: "登録前に読んでいる人にも届くことがあります", icon: "whisper" },
  { value: "near", title: "近い声として置く", body: "病気・症状・不安が近い人に見つかりやすくします", icon: "flower" },
  { value: "room", title: "このテーマに置く", body: "同じテーマを見ている人に届きます", icon: "home" },
  { value: "quiet", title: "自分だけ", body: "公開せず、自分だけで振り返れます", icon: "lock" },
];

const FEELING_CHIPS = ["不安", "眠れない", "診察前", "家族に話せない", "仕事がつらい", "治療のこと", "同じ人に聞きたい"];

export default function PostPage() {
  return (
    <Suspense fallback={<PostPageFallback />}>
      <PostComposer />
    </Suspense>
  );
}

function PostPageFallback() {
  return (
    <main className="explore-shell post-compose-shell">
      <header className="find-header">
        <BackButton fallbackHref="/home" />
        <h1>声を置く</h1>
        <span aria-hidden="true" />
      </header>
      <section className="post-compose-hero" aria-label="読み込み中">
        <p>書ける分だけで大丈夫</p>
        <h2>いまの気持ちを、少しだけ置く</h2>
        <span>準備しています。</span>
      </section>
    </main>
  );
}

function PostComposer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const rooms = useMemo(() => getRooms(), []);
  const { healthContext, loaded: healthContextLoaded } = useStoredHealthContext();
  const healthRecommendation = useMemo(() => getHealthRecommendation(healthContext), [healthContext]);
  const [writeKind, setWriteKind] = useState<WriteKind>("story");
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<Visibility>(roomId ? "room" : "public");
  const [selectedRoomId, setSelectedRoomId] = useState(roomId ?? "");
  const [body, setBody] = useState("");
  const [placed, setPlaced] = useState(false);
  const [previewAuthor, setPreviewAuthor] = useState<{
    name: string;
    animal: AnimalName;
    avatarTone: AvatarTone;
  }>({
    name: "あなた（ニックネーム）",
    animal: "rabbit",
    avatarTone: "moss",
  });

  const allRooms = use(rooms);
  const writeConfig = WRITE_KINDS.find((item) => item.value === writeKind) ?? WRITE_KINDS[0];
  const availableVisibilities = VISIBILITIES.filter((item) => writeConfig.visibilities.includes(item.value));
  const contextLabels = healthRecommendation.topicLabels.slice(0, 5);
  const contextSummary = contextLabels.length > 0 ? contextLabels.join("・") : "病気・症状・不安は未設定";
  const suggestedRooms = useMemo(() => {
    const roomIds = healthRecommendation.roomIds.length > 0
      ? healthRecommendation.roomIds
      : ["room-before-diagnosis", "room-night-anxiety", "room-work-school", "room-uc"];
    return roomIds
      .map((id) => allRooms.find((room) => room.id === id))
      .filter(Boolean)
      .slice(0, 6) as typeof allRooms;
  }, [allRooms, healthRecommendation.roomIds]);
  const resolvedSelectedRoomId =
    roomId || selectedRoomId || (healthContextLoaded ? suggestedRooms[0]?.id : "") || "room-before-diagnosis";
  const selectedRoom = allRooms.find((room) => room.id === resolvedSelectedRoomId) ?? allRooms[0];
  const feelingChips = healthRecommendation.feelingChips.length > 0 ? healthRecommendation.feelingChips : FEELING_CHIPS;
  const placeholder = selectedFeeling
    ? `${selectedFeeling}のことを、少しだけ置いてみる。\n\n${writeConfig.placeholder}`
    : writeConfig.placeholder;
  const destination = getDestination({
    visibility,
    selectedRoomName: selectedRoom?.name,
    selectedRoomId: selectedRoom?.id,
    contextSummary,
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const onboarding = readOnboardingState();
      const session = getCurrentSession();
      const displayName = onboarding.profile.displayName?.trim() || session?.name?.trim();
      setPreviewAuthor({
        name: displayName && displayName !== "ななし" ? displayName : "あなた（ニックネーム）",
        animal: onboarding.profile.animal ?? "rabbit",
        avatarTone: (onboarding.profile.avatarTone as AvatarTone | undefined) ?? "moss",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const query = searchParams.toString();
    const next = query ? `${pathname}?${query}` : pathname;
    const gate = signInGateHref(next);
    if (gate) router.replace(gate);
  }, [pathname, router, searchParams]);

  const selectWriteKind = (next: WriteKind) => {
    const nextConfig = WRITE_KINDS.find((item) => item.value === next) ?? WRITE_KINDS[0];
    setWriteKind(next);
    setVisibility(nextConfig.defaultVisibility);
  };

  const onSubmit = () => {
    setPlaced(true);
    window.setTimeout(() => router.push(destination.nextHref), 1200);
  };

  return (
    <>
      <main className="explore-shell post-compose-shell">
        <header className="find-header">
          <BackButton fallbackHref={roomId ? `/rooms/${roomId}` : "/home"} />
          <h1>声を置く</h1>
          <Link href="/home" className="explore-icon-btn" aria-label="閉じる">
            <Icon name="close" size={18} />
          </Link>
        </header>

        <section className="post-compose-hero" aria-labelledby="post-title">
          <p>書ける分だけで大丈夫</p>
          <h2 id="post-title">いまの気持ちを、どの文脈に置くか選ぶ</h2>
          <span>投稿ではなく、必要な時だけ声をそっと残す場所です。</span>
        </section>

        <section className="post-compose-section" aria-label="書く種類">
          <div className="post-compose-section__head">
            <h3>何を置きたいですか</h3>
            <span>あとから変えられます</span>
          </div>
          <div className="post-kind-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
            {WRITE_KINDS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => selectWriteKind(item.value)}
                className={writeKind === item.value ? "is-active" : ""}
                style={{
                  minHeight: 106,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 7,
                  padding: 13,
                  border: writeKind === item.value ? "1px solid rgba(117, 127, 85, 0.52)" : "1px solid rgba(214, 200, 178, 0.76)",
                  borderRadius: 16,
                  background: writeKind === item.value ? "rgba(239, 241, 230, 0.86)" : "rgba(255, 253, 248, 0.84)",
                  color: "var(--color-ink-900)",
                  textAlign: "left",
                  boxShadow: writeKind === item.value ? "0 10px 22px rgba(117, 127, 85, 0.1)" : "0 7px 18px rgba(74, 56, 38, 0.04)",
                }}
              >
                <Icon name={item.icon} size={18} />
                <strong style={{ color: "var(--color-ink-900)", font: "700 12.5px/1.45 var(--font-jp)" }}>
                  {item.title}
                </strong>
                <small style={{ color: "var(--color-ink-500)", font: "500 10.5px/1.55 var(--font-jp)" }}>
                  {item.body}
                </small>
              </button>
            ))}
          </div>
        </section>

        <section className="post-compose-section" aria-label="紐づく文脈">
          <div className="post-compose-section__head">
            <h3>紐づく文脈</h3>
            <Link href="/onboarding/condition">変更する</Link>
          </div>
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: "13px 14px",
              border: "1px solid rgba(214, 200, 178, 0.76)",
              borderRadius: 17,
              background: "rgba(255, 253, 248, 0.84)",
            }}
          >
            <p style={{ margin: 0, color: "var(--color-ink-700)", font: "600 11.5px/1.7 var(--font-jp)" }}>
              {healthRecommendation.hasContext
                ? "選んだ病気・症状・不安に近い声として扱います。"
                : "病気や症状を選ぶと、近い声として届きやすくなります。"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {(contextLabels.length > 0 ? contextLabels : ["未設定", "症状から始められます"]).map((label) => (
                <span key={label} className="explore-topic-pill explore-topic-pill--soft">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="post-compose-section" aria-label="書き出すきっかけ">
          <div className="post-compose-section__head">
            <h3>書き出すきっかけ</h3>
            <span>選ばなくても書けます</span>
          </div>
          <div className="post-feeling-chips">
            {feelingChips.map((chip) => (
              <button
                key={chip}
                type="button"
                className={selectedFeeling === chip ? "is-active" : ""}
                onClick={() => setSelectedFeeling((current) => (current === chip ? null : chip))}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        <section className="post-compose-card" aria-label="本文">
          <label htmlFor="post-body">{writeConfig.textareaLabel}</label>
          <textarea
            id="post-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder={placeholder}
            maxLength={writeKind === "story" ? 720 : 420}
          />
          <div className="post-compose-card__tools">
            <span style={{ color: "var(--color-ink-500)", fontWeight: 600 }}>
              無理にきれいに書かなくても大丈夫です
            </span>
            <span>{body.length} / {writeKind === "story" ? 720 : 420}</span>
          </div>
        </section>

        <section className="post-compose-section" aria-label="置く場所">
          <div className="post-compose-section__head">
            <h3>どこに置きますか</h3>
            <span>{writeConfig.label}で選べる場所</span>
          </div>
          <div className="post-visibility-cards">
            {availableVisibilities.map((item) => (
              <button
                key={item.value}
                type="button"
                className={visibility === item.value ? "is-active" : ""}
                onClick={() => setVisibility(item.value)}
              >
                <Icon name={item.icon} size={17} />
                <strong>{item.title}</strong>
                <small>{item.body}</small>
              </button>
            ))}
          </div>
        </section>

        {visibility === "room" && (
          <section className="post-compose-section" aria-label="テーマを選ぶ">
            <div className="post-compose-section__head">
              <h3>テーマを選ぶ</h3>
              <Link href="/rooms">テーマを見る</Link>
            </div>
            <p className="post-context-note">選んだ病気・症状・不安に近いテーマを先に出しています。</p>
            <div className="post-room-select">
              {suggestedRooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  className={resolvedSelectedRoomId === room.id ? "is-active" : ""}
                  onClick={() => setSelectedRoomId(room.id)}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </section>
        )}

        <PostPreviewCard
          authorName={previewAuthor.name}
          authorAnimal={previewAuthor.animal}
          authorAvatarTone={previewAuthor.avatarTone}
          body={body}
          contextLabels={contextLabels}
          visibilityLine={getPreviewVisibilityLine(visibility, selectedRoom?.name)}
          lookbackHint={getPreviewLookbackHint(visibility, selectedRoom?.name)}
        />

        <SummaryCard
          icon={destination.icon}
          title={destination.title}
          body={`${writeConfig.label}を、${destination.body}`}
          contextSummary={contextSummary}
          placed={placed}
        />

        <section className="post-reassurance" aria-label="安心の説明">
          <Icon name="shield" size={18} />
          <div>
            <p>医療判断ではなく、体験談や声として残ります</p>
            <span>治療の判断や緊急相談は、医療機関に確認してください。</span>
          </div>
        </section>

        <footer className="post-compose-footer">
          {placed ? (
            <span className="post-compose-footer__done">
              <Icon name="check" size={16} />
              {destination.doneLabel}
            </span>
          ) : (
            <>
              <Link href={roomId ? `/rooms/${roomId}` : "/home"}>あとで</Link>
              <button type="button" onClick={onSubmit} disabled={body.trim().length === 0 && !selectedFeeling}>
                {destination.submitLabel}
                {visibility === "quiet" ? "（公開しない）" : "（投稿する）"}
              </button>
            </>
          )}
        </footer>
      </main>
    </>
  );
}

function getPreviewVisibilityLine(visibility: Visibility, selectedRoomName?: string) {
  if (visibility === "room") {
    return selectedRoomName
      ? `テーマ「${selectedRoomName}」を見ている人に届きます`
      : "テーマを見ている人に届きます";
  }
  if (visibility === "quiet") return "公開されません（自分だけ）";
  if (visibility === "near") return "病気・症状が近い人に届きます";
  return "全体のタイムラインに流れます";
}

function getPreviewLookbackHint(visibility: Visibility, selectedRoomName?: string) {
  if (visibility === "quiet") return "保存するとマイページの置いた声から見返せます";
  if (visibility === "room") {
    return selectedRoomName
      ? `投稿すると「${selectedRoomName}」テーマから見返せます`
      : "投稿するとテーマページから見返せます";
  }
  return "投稿するとホームのタイムラインから見返せます";
}

function PostPreviewCard({
  authorName,
  authorAnimal,
  authorAvatarTone,
  body,
  contextLabels,
  visibilityLine,
  lookbackHint,
}: {
  authorName: string;
  authorAnimal: AnimalName;
  authorAvatarTone: AvatarTone;
  body: string;
  contextLabels: string[];
  visibilityLine: string;
  lookbackHint: string;
}) {
  const trimmedBody = body.trim();
  const previewLabels = contextLabels.length > 0 ? contextLabels : ["未設定"];

  return (
    <section className="post-preview-section" aria-label="投稿プレビュー">
      <div className="post-preview-section__head">
        <h3>この声は、こう見えます</h3>
        <span>他の人からは、このように見えます</span>
      </div>
      <article className="post-preview-card">
        <header className="post-preview-card__header">
          <Avatar
            animal={authorAnimal}
            src={`/assets/animals/${authorAnimal}.png`}
            alt={authorName}
            tone={authorAvatarTone}
            size={44}
          />
          <div className="post-preview-card__meta">
            <span className="post-preview-card__name">{authorName}</span>
            <p className="post-preview-card__visibility">{visibilityLine}</p>
          </div>
          <time className="post-preview-card__time" aria-hidden="true">
            いま
          </time>
        </header>
        <p className={`post-preview-card__body${trimmedBody ? "" : " is-empty"}`}>
          {trimmedBody || "（ここに本文が入ります）"}
        </p>
        <div className="post-preview-card__context">
          {previewLabels.map((label) => (
            <span key={label} className="explore-topic-pill explore-topic-pill--soft">
              {label}
            </span>
          ))}
        </div>
        <p className="post-preview-card__hint">{lookbackHint}</p>
      </article>
    </section>
  );
}

function getDestination({
  visibility,
  selectedRoomName,
  selectedRoomId,
  contextSummary,
}: {
  visibility: Visibility;
  selectedRoomName?: string;
  selectedRoomId?: string;
  contextSummary: string;
}) {
  if (visibility === "room") {
    return {
      icon: "home" as IconName,
      title: selectedRoomName ? `${selectedRoomName}のテーマに置きます` : "近いテーマに置きます",
      body: "同じテーマを見ている人に届きます。",
      submitLabel: "このテーマにそっと置く",
      doneLabel: "このテーマにそっと置きました",
      nextHref: `/rooms/${selectedRoomId ?? "room-before-diagnosis"}`,
    };
  }

  if (visibility === "quiet") {
    return {
      icon: "lock" as IconName,
      title: "自分だけに保存します",
      body: "公開されません。マイページの置いた声から見返せます。",
      submitLabel: "自分だけに保存",
      doneLabel: "自分だけに保存しました",
      nextHref: "/me/voices",
    };
  }

  if (visibility === "near") {
    return {
      icon: "flower" as IconName,
      title: `${contextSummary}に近い声として置きます`,
      body: "近い病気・症状・不安を見ている人に見つかりやすくします。",
      submitLabel: "近い声として置く",
      doneLabel: "近い声として置きました",
      nextHref: "/home#feed",
    };
  }

  return {
    icon: "whisper" as IconName,
    title: "全体のタイムラインに置きます",
    body: "登録前に読んでいる人にも届くことがあります。",
    submitLabel: "全体にそっと置く",
    doneLabel: "全体にそっと置きました",
    nextHref: "/home#feed",
  };
}

function SummaryCard({
  icon,
  title,
  body,
  contextSummary,
  placed,
}: {
  icon: IconName;
  title: string;
  body: string;
  contextSummary: string;
  placed: boolean;
}) {
  return (
    <section
      className="post-destination-summary"
      aria-label={placed ? "置いた後の確認" : "現在の置き場所"}
      style={{
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        alignItems: "center",
        gap: 10,
        padding: "13px 14px",
        border: placed ? "1px solid rgba(117, 127, 85, 0.42)" : "1px solid rgba(117, 127, 85, 0.22)",
        borderRadius: 18,
        background: placed ? "rgba(239, 241, 230, 0.92)" : "rgba(239, 241, 230, 0.72)",
        color: "var(--color-moss-700)",
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          display: "inline-grid",
          placeItems: "center",
          borderRadius: 999,
          background: "rgba(255, 253, 248, 0.78)",
        }}
      >
        <Icon name={placed ? "check" : icon} size={17} />
      </span>
      <div>
        <p style={{ margin: 0, color: "var(--color-ink-900)", font: "700 12.5px/1.45 var(--font-jp)" }}>
          {placed ? "文脈に紐づけて置きました" : title}
        </p>
        <span style={{ display: "block", marginTop: 3, color: "var(--color-ink-500)", font: "500 10.5px/1.55 var(--font-jp)" }}>
          {placed ? `${contextSummary} の文脈で見返せます。` : body}
        </span>
      </div>
    </section>
  );
}
