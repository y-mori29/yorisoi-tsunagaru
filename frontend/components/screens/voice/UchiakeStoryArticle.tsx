"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { ReactionChip } from "@/components/ui/ReactionChip";
import { CommentList } from "@/components/screens/voice/CommentList";
import { CommentComposer } from "@/components/screens/voice/CommentComposer";
import { getComments } from "@/lib/api/comments";
import type { Comment } from "@/lib/api/types";
import type { AvatarTone } from "@/lib/api/types";
import type { AnimalName } from "@/lib/icons";
import type { IconName } from "@/lib/icons";

export type UchiakeStory = {
  id: string;
  authorName: string;
  authorAvatar: AnimalName;
  authorAvatarTone: AvatarTone;
  topic: string;
  timeLabel: string;
  title?: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  age?: string;
  gender?: string;
  voice?: string;
};

type Reaction = {
  key: "ack" | "leaf" | "thanks";
  icon: "acknowledge" | "leaf" | "thanks";
  label: string;
};

type SectionKey = keyof Pick<UchiakeStory, "q1" | "q2" | "q3" | "q4" | "q5">;
type SectionAccent = "moss" | "plum" | "terra" | "gold";

const REACTIONS: Reaction[] = [
  { key: "ack", icon: "acknowledge", label: "そう" },
  { key: "leaf", icon: "leaf", label: "わかる" },
  { key: "thanks", icon: "thanks", label: "ありがとう" },
];

const SECTIONS: Array<{
  key: SectionKey;
  label: string;
  icon: IconName;
  accent: SectionAccent;
}> = [
  { key: "q1", label: "いまの状態のこと", icon: "leaf", accent: "moss" },
  { key: "q2", label: "かかえている気持ち", icon: "heart", accent: "plum" },
  { key: "q3", label: "気づいてから、これまで", icon: "stroll", accent: "terra" },
  { key: "q4", label: "薬や治療のこと", icon: "shield", accent: "gold" },
  { key: "q5", label: "いま、困っていること", icon: "chat", accent: "plum" },
];

const CLAMP_CHAR_THRESHOLD = 300;

function StorySectionCard({
  label,
  icon,
  accent,
  body,
}: {
  label: string;
  icon: IconName;
  accent: SectionAccent;
  body: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = body.length > CLAMP_CHAR_THRESHOLD;

  return (
    <section className="story-card story-card--section">
      <div className={`story-card__label story-card__label--${accent}`}>
        <Icon name={icon} size={14} aria-hidden />
        <span>{label}</span>
      </div>
      <p
        className={`story-card__body${isLong && !expanded ? " story-clamp" : ""}`}
      >
        {body}
      </p>
      {isLong && !expanded && (
        <button
          type="button"
          className="story-card__expand"
          onClick={() => setExpanded(true)}
        >
          続きを読む
        </button>
      )}
      {isLong && expanded && (
        <button
          type="button"
          className="story-card__collapse"
          onClick={() => setExpanded(false)}
        >
          たたむ
        </button>
      )}
    </section>
  );
}

export function UchiakeStoryArticle({ story }: { story: UchiakeStory }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<Reaction["key"] | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    let cancelled = false;
    getComments(story.id).then((list) => {
      if (!cancelled) setComments(list);
    });
    return () => {
      cancelled = true;
    };
  }, [story.id]);

  const toggle = (key: Reaction["key"]) => {
    const gate = signInGateHref(pathname);
    if (gate) {
      router.push(gate);
      return;
    }
    setSelected((prev) => (prev === key ? null : key));
  };

  const handlePosted = (c: Comment) => {
    setComments((prev) => [...prev, c]);
  };

  const genderLabel = story.gender === "女" ? "女性" : story.gender === "男" ? "男性" : story.gender;
  const demographic = [story.age, genderLabel].filter(Boolean).join("・");

  return (
    <>
      <AppHeader
        title="そっと、届いた声"
        left={<BackButton fallbackHref="/home" />}
        right={
          <IconButton
            icon="close"
            label="そっと閉じる"
            className="story-article__close-icon"
            onClick={() => router.push("/home")}
          />
        }
      />

      <main className="app-main">
        <article className="story-article">
          <div className="story-card story-card--profile">
            <header className="story-card__profile">
              <Avatar
                animal={story.authorAvatar}
                src={`/assets/animals/${story.authorAvatar}.png`}
                alt={story.authorName}
                tone={story.authorAvatarTone}
                size={44}
              />
              <div className="story-card__profile-meta">
                <div className="story-card__profile-row">
                  <span className="story-card__profile-name">{story.authorName}</span>
                  <span className="explore-topic-pill explore-topic-pill--soft">{story.topic}</span>
                </div>
                {demographic && <p className="story-card__profile-demo">{demographic}</p>}
              </div>
              <time className="story-card__profile-time">{story.timeLabel}</time>
            </header>
          </div>

          {story.title && <h2 className="story-article__title">{story.title}</h2>}

          {SECTIONS.map(({ key, label, icon, accent }) => {
            const body = story[key];
            if (!body) return null;
            return (
              <StorySectionCard
                key={key}
                label={label}
                icon={icon}
                accent={accent}
                body={body}
              />
            );
          })}

          <section className="story-card story-card--reactions">
            <p className="story-card__reactions-heading">そっと、こたえる</p>
            <div className="story-card__reactions">
              {REACTIONS.map((r) => (
                <ReactionChip
                  key={r.key}
                  icon={r.icon}
                  label={r.label}
                  active={selected === r.key}
                  onClick={() => toggle(r.key)}
                />
              ))}
            </div>
            {selected && (
              <p className="story-card__reactions-note">そっと、相手に 届きました。</p>
            )}
          </section>

          <section className="story-card story-card--comments">
            <h3 className="story-card__comments-heading">ことば、寄せられて います</h3>
            <CommentList comments={comments} />
            <CommentComposer parentId={story.id} onPosted={handlePosted} />
          </section>

          <section className="story-article__close">
            <button type="button" className="btn btn--primary btn--full" onClick={() => router.back()}>
              そっと 閉じる
            </button>
          </section>
        </article>
      </main>
    </>
  );
}
