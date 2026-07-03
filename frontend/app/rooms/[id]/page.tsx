"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { getRoomById } from "@/lib/api/rooms";
import { explorePosts } from "@/lib/mock/explore";
import type { ExplorePost } from "@/lib/mock/explore";
import type { RoomKind } from "@/lib/api/types";

type RoomRule = {
  icon: "leaf" | "heart" | "plus";
  title: string;
  body: string;
};

const KIND_LABEL: Record<RoomKind, string> = {
  disease: "病気",
  symptom: "症状",
  concern: "悩み",
  medication: "薬",
  treatment: "治療",
};

const KIND_TITLE: Record<RoomKind, string> = {
  disease: "同じ病気の声を、ゆっくり読めます",
  symptom: "同じ症状や不安から、近い声を探せます",
  concern: "言いづらい悩みを、ひとりで抱えないための場所です",
  medication: "薬や治療との付き合いを、体験から読めます",
  treatment: "治療の日の過ごし方を、生活の声から読めます",
};

const ROOM_RULES: RoomRule[] = [
  { icon: "leaf", title: "読むだけでも大丈夫", body: "登録しなくても、まずは眺められます。" },
  { icon: "heart", title: "反応は登録後", body: "共感や保存は、安心できる名前で始めてから。" },
  { icon: "plus", title: "書ける日に置く", body: "まとまらない気持ちも、短く残せます。" },
];

const DEFAULT_PROMPTS = ["診察前", "眠れない", "家族に話せない", "仕事がつらい", "治療が不安"];

const PROMPTS_BY_KIND: Record<RoomKind, string[]> = {
  disease: ["診断された日", "通院前", "まわりに説明しづらい", "体調の波", "将来のこと"],
  symptom: ["今日の症状", "外出前", "眠れない", "説明しづらい", "予定を変えた"],
  concern: ["ひとりの時間", "家族に話せない", "仕事がつらい", "検査待ち", "夜に不安"],
  medication: ["副作用", "薬の日", "通院間隔", "続ける不安", "生活の工夫"],
  treatment: ["治療の日", "帰宅後", "副作用", "休み方", "説明を聞いた後"],
};

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const room = use(getRoomById(id));
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const roomPosts = useMemo(() => {
    if (!room) return [];
    const exact = explorePosts.filter((post) => post.roomHref === `/rooms/${room.id}`);
    if (exact.length > 0) return exact;
    return explorePosts.filter((post) => post.topicKind === roomKindToTopicKind(room.kind)).slice(0, 5);
  }, [room]);

  if (!room) {
    return (
      <main className="explore-shell room-detail-shell">
        <header className="find-header">
          <BackButton fallbackHref="/rooms" />
          <h1>テーマ</h1>
          <span aria-hidden="true" />
        </header>
        <section className="room-detail-empty">
          <Icon name="leaf" size={24} />
          <p>このテーマは見つかりませんでした。</p>
          <Link href="/rooms">テーマ一覧へ戻る</Link>
        </section>
      </main>
    );
  }

  const prompts = PROMPTS_BY_KIND[room.kind] ?? DEFAULT_PROMPTS;

  return (
    <>
      <main className="explore-shell room-detail-shell">
        <header className="find-header">
          <BackButton fallbackHref="/rooms" />
          <h1>テーマ</h1>
          <Link href="/find" className="explore-icon-btn" aria-label="探す">
            <Icon name="search" size={18} />
          </Link>
        </header>

        <section className={`room-detail-hero room-detail-hero--${room.tone}`} aria-labelledby="room-title">
          <div className="room-detail-hero__badge">
            <Icon name={kindToIcon(room.kind)} size={17} />
            {KIND_LABEL[room.kind]}
          </div>
          <h2 id="room-title">{room.name}</h2>
          <p>{room.description}</p>
          <span>{KIND_TITLE[room.kind]}</span>
          <div className="room-detail-hero__actions">
            <Link href={`/post?room=${room.id}`} className="explore-primary-btn">
              このテーマに置く
            </Link>
          </div>
        </section>

        <section className="room-rules" aria-label="このテーマの使い方">
          {ROOM_RULES.map((rule) => (
            <article key={rule.title}>
              <span aria-hidden="true">
                <Icon name={rule.icon} size={16} />
              </span>
              <strong>{rule.title}</strong>
              <small>{rule.body}</small>
            </article>
          ))}
        </section>

        <section className="room-prompt-panel" aria-label="書き出しのヒント">
          <div>
            <p>言葉にするなら</p>
            <h3>近い気持ちから選べます</h3>
          </div>
          <div className="room-prompt-list">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={selectedPrompt === prompt ? "is-active" : ""}
                onClick={() => setSelectedPrompt((current) => (current === prompt ? null : prompt))}
              >
                {prompt}
              </button>
            ))}
          </div>
        </section>

        <section className="room-feed" aria-label="このテーマの体験談">
          <div className="room-feed__head">
            <div>
              <p>このテーマの声</p>
              <h3>同じテーマの体験談</h3>
            </div>
            <Link href="/home#feed">全体も読む</Link>
          </div>

          {roomPosts.length === 0 ? (
            <section className="room-detail-empty">
              <Icon name="whisper" size={24} />
              <p>まだ声がありません。あなたが最初のひとりです。</p>
              <Link href={`/post?room=${room.id}`}>そっと置く</Link>
            </section>
          ) : (
            roomPosts.slice(0, 6).map((post) => <RoomPost key={post.id} post={post} />)
          )}
        </section>
      </main>

      <BottomNav active="stroll" />
    </>
  );
}

function RoomPost({ post }: { post: ExplorePost }) {
  const router = useRouter();
  const pathname = usePathname();
  const [picked, setPicked] = useState<string | null>(null);
  const isUchiake = post.id.startsWith("uchiake-");

  const handleReaction = (label: string) => {
    const gate = signInGateHref(pathname);
    if (gate) {
      router.push(gate);
      return;
    }
    setPicked((current) => (current === label ? null : label));
  };

  return (
    <article className="room-post-card">
      <header>
        <Avatar
          animal={post.authorAvatar}
          src={post.authorAvatarSrc}
          alt={post.authorName}
          tone={post.authorAvatarTone}
          size={44}
        />
        <div>
          <strong>{post.authorName}</strong>
          <span>{post.timeLabel}</span>
        </div>
        <em className={`explore-topic-pill--${post.topicTone}`}>{post.topic}</em>
      </header>
      <p>
        {isUchiake ? (
          <Link href={`/voice/${post.id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {post.body}
          </Link>
        ) : (
          post.body
        )}
      </p>
      <div className="room-post-card__actions">
        {post.reactions.map((reaction) => (
          <button
            key={reaction.label}
            type="button"
            className={picked === reaction.label ? "is-active" : ""}
            onClick={() => handleReaction(reaction.label)}
          >
            <Icon name={reaction.label === "共感" ? "hand" : reaction.label === "応援" ? "heart" : "thanks"} size={14} />
            {reaction.label}
          </button>
        ))}
      </div>
    </article>
  );
}

function roomKindToTopicKind(kind: RoomKind) {
  if (kind === "disease") return "condition";
  if (kind === "symptom") return "symptom";
  return "concern";
}

function kindToIcon(kind: RoomKind): "leaf" | "flower" | "shield" | "heart" | "whisper" {
  switch (kind) {
    case "disease":
      return "leaf";
    case "symptom":
      return "whisper";
    case "concern":
      return "heart";
    case "medication":
      return "flower";
    case "treatment":
      return "shield";
  }
}

