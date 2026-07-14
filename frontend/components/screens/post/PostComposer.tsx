"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { getRooms } from "@/lib/api/rooms";
import { getCurrentSession } from "@/lib/auth/local-auth";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { resolveMemberIdentity, type MemberIdentity } from "@/lib/onboarding/identity";
import { getHealthRecommendation } from "@/lib/onboarding/recommendations";
import { readOnboardingState } from "@/lib/onboarding/storage";
import { useStoredHealthContext } from "@/lib/onboarding/useStoredHealthContext";
import type { Room } from "@/lib/api/types";
import type { IconName } from "@/lib/icons";

type Visibility = "near" | "public" | "room" | "quiet";
type DraftImage = { dataUrl: string; name: string };
type PostDraft = {
  body: string;
  isQuestion: boolean;
  visibility: Visibility;
  selectedRoomId: string;
  image: DraftImage | null;
};

const DRAFT_KEY = "yorisoi:post-draft:v2";
const MAX_BODY_LENGTH = 720;
const HINTS = [
  { label: "何が気になっている？", guide: "いま気になっているのは、" },
  { label: "どう過ごした？", guide: "今日は、こんなふうに過ごしました。\n" },
  { label: "みんなに聞きたい", guide: "同じような経験をした方に聞きたいのですが、" },
];

const VISIBILITIES: Array<{
  value: Visibility;
  title: string;
  body: string;
  icon: IconName;
}> = [
  { value: "near", title: "近い人に届ける", body: "病気・症状・悩みが近い人に見つかりやすくします", icon: "flower" },
  { value: "public", title: "よりそい全体に公開", body: "ホームの新着から、登録前の人も読むことがあります", icon: "whisper" },
  { value: "room", title: "テーマに投稿する", body: "選んだテーマを見ている人に届きます", icon: "home" },
  { value: "quiet", title: "自分だけに保存", body: "ほかの人には公開されません", icon: "lock" },
];

export function PostComposer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room") || "";
  const contextParam = searchParams.get("context")?.trim() || "";
  const allRooms = use(getRooms());
  const { healthContext } = useStoredHealthContext();
  const recommendation = useMemo(() => getHealthRecommendation(healthContext), [healthContext]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [body, setBody] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);
  const [visibility, setVisibility] = useState<Visibility>(roomId ? "room" : "near");
  const [selectedRoomId, setSelectedRoomId] = useState(roomId);
  const [image, setImage] = useState<DraftImage | null>(null);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(Boolean(roomId));
  const [draftSaved, setDraftSaved] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [identity, setIdentity] = useState<MemberIdentity | null>(null);

  const suggestedRooms = useMemo(() => {
    const ids = recommendation.roomIds.length > 0
      ? recommendation.roomIds
      : ["room-before-diagnosis", "room-night-anxiety", "room-work-school", "room-uc"];
    return ids
      .map((id) => allRooms.find((room) => room.id === id))
      .filter((room): room is Room => Boolean(room))
      .slice(0, 6);
  }, [allRooms, recommendation.roomIds]);

  const resolvedRoomId = roomId || selectedRoomId || suggestedRooms[0]?.id || allRooms[0]?.id || "";
  const selectedRoom = allRooms.find((room) => room.id === resolvedRoomId) ?? allRooms[0];
  const contextLabels = useMemo(() => {
    const labels = [contextParam, ...recommendation.topicLabels].filter(Boolean);
    return Array.from(new Set(labels)).slice(0, 5);
  }, [contextParam, recommendation.topicLabels]);
  const contextSummary = contextLabels.length > 0 ? contextLabels.join("・") : "病気・症状・悩みは未設定";
  const destination = getDestination({ visibility, roomId: selectedRoom?.id, roomName: selectedRoom?.name });

  useEffect(() => {
    const query = searchParams.toString();
    const next = query ? `${pathname}?${query}` : pathname;
    const gate = signInGateHref(next);
    if (gate) router.replace(gate);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const session = getCurrentSession();
      if (session) setIdentity(resolveMemberIdentity(session, readOnboardingState()));
      try {
        const raw = window.localStorage.getItem(DRAFT_KEY);
        if (!raw) return;
        const draft = JSON.parse(raw) as Partial<PostDraft>;
        setBody(typeof draft.body === "string" ? draft.body : "");
        setIsQuestion(Boolean(draft.isQuestion));
        if (!roomId && draft.visibility) setVisibility(draft.visibility);
        if (!roomId && draft.selectedRoomId) setSelectedRoomId(draft.selectedRoomId);
        if (draft.image?.dataUrl) setImage(draft.image);
      } catch {
        // 壊れた下書きは使わず、空の入力欄で続ける。
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [roomId]);

  const saveDraft = () => {
    try {
      const draft: PostDraft = { body, isQuestion, visibility, selectedRoomId: resolvedRoomId, image };
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setDraftSaved(true);
      window.setTimeout(() => setDraftSaved(false), 1800);
    } catch {
      setDraftSaved(false);
    }
  };

  const applyHint = (guide: string) => {
    if (!body.trim()) setBody(guide);
    textareaRef.current?.focus();
  };

  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImage({ dataUrl: reader.result, name: file.name });
    };
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!body.trim()) return;
    setPlaced(true);
    window.localStorage.removeItem(DRAFT_KEY);
  };

  const author = identity ?? {
    displayName: "あなた（ニックネーム）",
    animal: "rabbit" as const,
    avatarTone: "moss" as const,
    avatarSrc: "/assets/animals/rabbit.png",
  };

  return (
    <main className="explore-shell simple-post-shell">
      <header className="find-header simple-post-header">
        <BackButton fallbackHref={roomId ? `/rooms/${roomId}` : "/home"} />
        <h1>声を投稿する</h1>
        <button type="button" className="simple-post-draft" onClick={saveDraft}>
          {draftSaved ? "保存しました" : "下書き保存"}
        </button>
      </header>

      <section className="simple-post-intro" aria-labelledby="post-heading">
        <p>書ける分だけで大丈夫</p>
        <h2 id="post-heading">今の気持ちや体験を書く</h2>
        <span>ひとことだけでも、あとから見直しても大丈夫です。</span>
      </section>

      <section className="simple-post-editor" aria-label="投稿本文">
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(event) => setBody(event.target.value.slice(0, MAX_BODY_LENGTH))}
          placeholder={isQuestion
            ? "同じような経験をした方に、聞いてみたいことを書いてみましょう。"
            : "今の気持ちや、同じような人に残しておきたいことを書いてみましょう。"}
          maxLength={MAX_BODY_LENGTH}
          autoFocus
        />
        <span>{body.length} / {MAX_BODY_LENGTH}</span>
      </section>

      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={selectImage} />
      <div className="simple-post-tools" aria-label="投稿の補助">
        <button type="button" onClick={() => fileInputRef.current?.click()}>
          <Icon name="image" size={17} />
          写真
        </button>
        <button type="button" className={isQuestion ? "is-active" : ""} onClick={() => setIsQuestion((current) => !current)}>
          <Icon name="chat" size={17} />
          質問として投稿
        </button>
        <button type="button" className={hintsOpen ? "is-active" : ""} onClick={() => setHintsOpen((current) => !current)}>
          <Icon name="leaf" size={17} />
          書くヒント
        </button>
      </div>

      {image && (
        <section className="simple-post-image" aria-label="追加した写真">
          <Image src={image.dataUrl} alt={image.name} width={720} height={480} unoptimized />
          <button type="button" onClick={() => setImage(null)} aria-label="写真を削除">
            <Icon name="close" size={16} />
          </button>
        </section>
      )}

      {hintsOpen && (
        <section className="simple-post-hints" aria-label="書くヒント">
          <p>書き出しを選べます</p>
          <div>
            {HINTS.map((hint) => (
              <button key={hint.label} type="button" onClick={() => applyHint(hint.guide)}>{hint.label}</button>
            ))}
          </div>
        </section>
      )}

      <section className="post-context-summary" aria-label="投稿の届け先">
        <div>
          <span><Icon name={destination.icon} size={17} /></span>
          <div>
            <strong>{destination.title}</strong>
            <p>{contextSummary}</p>
          </div>
        </div>
        <button type="button" onClick={() => setDetailsOpen((current) => !current)} aria-expanded={detailsOpen}>
          {detailsOpen ? "閉じる" : "届け先を変更"}
          <Icon name={detailsOpen ? "chevronDown" : "chevronRight"} size={14} />
        </button>
      </section>

      {detailsOpen && (
        <section className="post-delivery-panel" aria-label="届け先の設定">
          <div className="post-delivery-panel__head">
            <h3>誰に届けますか</h3>
            <span>公開範囲はあとから変更できます</span>
          </div>
          <div className="post-delivery-options">
            {VISIBILITIES.map((option) => (
              <button
                key={option.value}
                type="button"
                className={visibility === option.value ? "is-active" : ""}
                onClick={() => setVisibility(option.value)}
              >
                <Icon name={option.icon} size={17} />
                <span><strong>{option.title}</strong><small>{option.body}</small></span>
                {visibility === option.value && <Icon name="check" size={15} />}
              </button>
            ))}
          </div>

          {visibility === "room" && (
            <div className="post-room-options">
              <p>投稿するテーマ</p>
              <div>
                {suggestedRooms.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    className={resolvedRoomId === room.id ? "is-active" : ""}
                    onClick={() => setSelectedRoomId(room.id)}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
              <Link href="/rooms">ほかのテーマを見る</Link>
            </div>
          )}
        </section>
      )}

      <PostPreview
        author={author}
        body={body}
        image={image}
        isQuestion={isQuestion}
        contextLabels={contextLabels}
        visibilityLine={destination.visibilityLine}
        lookbackLine={destination.lookbackLine}
      />

      <section className="post-reassurance" aria-label="安心の説明">
        <Icon name="shield" size={18} />
        <div>
          <p>医療判断ではなく、体験談や声として残ります</p>
          <span>治療の判断や緊急相談は、医療機関に確認してください。</span>
        </div>
      </section>

      <footer className={`simple-post-footer ${placed ? "is-complete" : ""}`}>
        {placed ? (
          <>
            <div>
              <Icon name="check" size={18} />
              <span><strong>投稿しました</strong><small>{destination.lookbackLine}</small></span>
            </div>
            <Link href={destination.nextHref}>{destination.nextLabel}</Link>
            <Link href="/me/voices" className="simple-post-footer__secondary">マイページで見る</Link>
          </>
        ) : (
          <>
            <Link href={roomId ? `/rooms/${roomId}` : "/home"}>あとで</Link>
            <button type="button" onClick={submit} disabled={!body.trim()}>
              {visibility === "quiet" ? "自分だけに保存" : "投稿する"}
            </button>
          </>
        )}
      </footer>
    </main>
  );
}

function PostPreview({
  author,
  body,
  image,
  isQuestion,
  contextLabels,
  visibilityLine,
  lookbackLine,
}: {
  author: MemberIdentity;
  body: string;
  image: DraftImage | null;
  isQuestion: boolean;
  contextLabels: string[];
  visibilityLine: string;
  lookbackLine: string;
}) {
  return (
    <section className="post-preview-section" aria-label="投稿プレビュー">
      <div className="post-preview-section__head">
        <h3>ほかの人には、こう見えます</h3>
        <span>投稿前に表示を確認できます</span>
      </div>
      <article className="post-preview-card">
        <header className="post-preview-card__header">
          <Avatar animal={author.animal} src={author.avatarSrc} alt={author.displayName} tone={author.avatarTone} size={44} />
          <div className="post-preview-card__meta">
            <span className="post-preview-card__name">{author.displayName}</span>
            <p className="post-preview-card__visibility">{visibilityLine}</p>
          </div>
          <time className="post-preview-card__time">いま</time>
        </header>
        {isQuestion && <span className="post-preview-card__kind">質問</span>}
        <p className={`post-preview-card__body${body.trim() ? "" : " is-empty"}`}>
          {body.trim() || "入力した内容がここに表示されます。"}
        </p>
        {image && <Image className="post-preview-card__image" src={image.dataUrl} alt={image.name} width={720} height={480} unoptimized />}
        <div className="post-preview-card__context">
          {(contextLabels.length > 0 ? contextLabels : ["文脈は未設定"]).map((label) => (
            <span key={label} className="explore-topic-pill explore-topic-pill--soft">{label}</span>
          ))}
        </div>
        <p className="post-preview-card__hint">{lookbackLine}</p>
      </article>
    </section>
  );
}

function getDestination({ visibility, roomId, roomName }: { visibility: Visibility; roomId?: string; roomName?: string }) {
  if (visibility === "room") {
    return {
      icon: "home" as IconName,
      title: roomName ? `「${roomName}」に投稿します` : "選んだテーマに投稿します",
      visibilityLine: roomName ? `テーマ「${roomName}」を見ている人に届きます` : "テーマを見ている人に届きます",
      lookbackLine: roomName ? `投稿後は「${roomName}」とマイページから見返せます。` : "投稿後はテーマとマイページから見返せます。",
      nextHref: `/rooms/${roomId || "room-before-diagnosis"}`,
      nextLabel: "投稿したテーマを見る",
    };
  }
  if (visibility === "quiet") {
    return {
      icon: "lock" as IconName,
      title: "自分だけに保存します",
      visibilityLine: "ほかの人には公開されません",
      lookbackLine: "保存後はマイページの「置いた声」から見返せます。",
      nextHref: "/me/voices",
      nextLabel: "保存した内容を見る",
    };
  }
  if (visibility === "public") {
    return {
      icon: "whisper" as IconName,
      title: "よりそい全体に公開します",
      visibilityLine: "ホームの新着から読むことができます",
      lookbackLine: "投稿後はホームとマイページから見返せます。",
      nextHref: "/home#feed",
      nextLabel: "ホームで投稿を見る",
    };
  }
  return {
    icon: "flower" as IconName,
    title: "近い人に届くよう投稿します",
    visibilityLine: "病気・症状・悩みが近い人に届きます",
    lookbackLine: "投稿後はホームとマイページから見返せます。",
    nextHref: "/home#feed",
    nextLabel: "ホームで投稿を見る",
  };
}
