"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { explorePosts } from "@/lib/mock/explore";
import { createLatestVisitOrder } from "@/lib/feed/latest-visit-order";
import { getCurrentSession } from "@/lib/auth/local-auth";
import { getHealthRecommendation } from "@/lib/onboarding/recommendations";
import { resolveMemberIdentity, type MemberIdentity } from "@/lib/onboarding/identity";
import { readOnboardingState } from "@/lib/onboarding/storage";
import { useStoredHealthContext } from "@/lib/onboarding/useStoredHealthContext";
import type { ExplorePost } from "@/lib/mock/explore";

const tabs: Array<{ value: "latest" | "near"; label: string }> = [
  { value: "latest", label: "新着" },
  { value: "near", label: "近い声" },
];

const nearTopics = new Set([
  "潰瘍性大腸炎",
  "強い疲れ",
  "診断前・検査待ち",
  "眠れない夜",
  "仕事との両立",
  "通院前の不安",
  "夜に不安が強い",
  "家族に話す",
]);

const communityAssetRoot = "/assets/community-designs/cutouts";

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>("latest");
  const [visibleCount, setVisibleCount] = useState(12);
  const [latestPosts, setLatestPosts] = useState<ExplorePost[]>(explorePosts);
  // SSRとの hydration 不一致を避けるため、セッション判定はマウント後に行う
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [memberIdentity, setMemberIdentity] = useState<MemberIdentity | null>(null);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const session = getCurrentSession();
      setIsSignedIn(Boolean(session));
      if (session) setMemberIdentity(resolveMemberIdentity(session, readOnboardingState()));
      setLatestPosts(createLatestVisitOrder(explorePosts));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const { healthContext } = useStoredHealthContext();
  const healthRecommendation = useMemo(() => getHealthRecommendation(healthContext), [healthContext]);

  const filteredPosts = useMemo(() => {
    if (tab === "latest") return latestPosts;
    if (tab === "near") {
      const personalTopicSet = new Set(healthRecommendation.topicLabels);
      const personalPosts = healthRecommendation.hasContext
        ? explorePosts.filter((post) => personalTopicSet.has(post.topic))
        : [];
      return personalPosts.length > 0 ? personalPosts : explorePosts.filter((post) => nearTopics.has(post.topic));
    }
    return explorePosts;
  }, [healthRecommendation, latestPosts, tab]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredPosts.length;
  const requireSignIn = () => router.push("/auth/register?next=/home");

  const handleTab = (value: (typeof tabs)[number]["value"]) => {
    setTab(value);
    setVisibleCount(12);
  };

  return (
    <>
      <main className="explore-shell">
        <header className="explore-header" aria-label="よりそい">
          <Link href="/home" className="explore-brand" aria-label="よりそい ホーム">
            <span className="explore-brand__leaf" aria-hidden="true">
              <Icon name="leaf" size={24} />
            </span>
            <span>よりそい</span>
          </Link>
          <Link href="/find" className="explore-icon-btn" aria-label="探す">
            <Icon name="search" size={19} />
          </Link>
          <Link href="/notifications" className="explore-icon-btn" aria-label="お知らせ">
            <Icon name="bell" size={19} />
          </Link>
          <Link
            href={isSignedIn ? "/me" : "/auth/login?next=/home"}
            className="explore-user-dot"
            aria-label={isSignedIn ? "マイページ" : "ログイン"}
          >
            <Image
              src={`${communityAssetRoot}/avatars/anonymous-avatar-01.png`}
              alt=""
              width={36}
              height={36}
            />
            {!isSignedIn && <span aria-hidden="true" />}
          </Link>
        </header>

        <nav className="explore-tabs explore-tabs--home" aria-label="タイムライン表示">
          {tabs.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`explore-tab ${tab === item.value ? "is-active" : ""}`.trim()}
              onClick={() => handleTab(item.value)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <HomeNearContextPanel
          recommendation={healthRecommendation}
          signedIn={isSignedIn}
          onOpenNear={() => handleTab("near")}
        />

        <HomeFindEntry />

        <HomeComposer signedIn={isSignedIn} identity={memberIdentity} />

        <section className="explore-feed" id="feed" aria-label="体験談タイムライン">
          {visiblePosts.map((post, index) => (
            <div key={post.id}>
              {index === 5 && !isSignedIn && <SignInPanel />}
              <ExplorePostCard post={post} signedIn={isSignedIn} onRequireSignIn={requireSignIn} />
            </div>
          ))}

          {canLoadMore ? (
            <button
              type="button"
              className="explore-load-more"
              onClick={() => setVisibleCount((current) => current + 12)}
            >
              もっと読む
            </button>
          ) : (
            <section className="explore-end-note" aria-label="読み終わり">
              <p>ここまで読みました</p>
              <span>探す画面から、病気・症状・悩みに近いテーマを見つけられます。</span>
              <Link href="/find">探しにいく</Link>
            </section>
          )}

          <section className="explore-safety-note" aria-label="注意書き">
            <Icon name="leaf" size={19} />
            <div>
              <p>医療判断ではなく、体験談を読む場所です</p>
              <span>つらさを比べず、言える範囲でそっと置ける場所を目指しています。</span>
            </div>
          </section>
        </section>
      </main>

      <BottomNav active="home" />
    </>
  );
}

function HomeNearContextPanel({
  recommendation,
  signedIn,
  onOpenNear,
}: {
  recommendation: ReturnType<typeof getHealthRecommendation>;
  signedIn: boolean;
  onOpenNear: () => void;
}) {
  if (!recommendation.hasContext) {
    if (!signedIn) {
      return (
        <section className="home-near-context" aria-label="近い声の案内">
          <Icon name="leaf" size={17} />
          <div>
            <p>登録すると、あなたに近い声が届きます</p>
            <span>病気・症状・不安に合わせて、近い体験談を先に読めるようになります。</span>
          </div>
          <Link href="/auth/register?next=/home">そっと登録（無料・メールだけ）</Link>
        </section>
      );
    }

    return (
      <section className="home-near-context" aria-label="近い声の案内">
        <Icon name="leaf" size={17} />
        <div>
          <p>近い声を増やせます</p>
          <span>病気・症状・不安を選ぶと、あなたに近い体験談を先に読めます。</span>
        </div>
        <Link href="/onboarding/condition">選ぶ</Link>
      </section>
    );
  }

  return (
    <section className="home-near-context" aria-label="あなたに近い声">
      <Icon name="leaf" size={17} />
      <div>
        <p>あなたに近い声</p>
        <span>{recommendation.homeLead}</span>
      </div>
      <button type="button" onClick={onOpenNear}>
        見る
      </button>
    </section>
  );
}

function HomeFindEntry() {
  return (
    <Link href="/find" className="home-find-entry" aria-label="病気・症状・悩みから近い声を探す">
      <span className="home-find-entry__icon"><Icon name="search" size={18} /></span>
      <span>
        <strong>近い声を探す</strong>
        <small>病気・症状・暮らしの悩みから探せます</small>
      </span>
      <Icon name="chevronRight" size={16} />
    </Link>
  );
}

function HomeComposer({ signedIn, identity }: { signedIn: boolean; identity: MemberIdentity | null }) {
  const href = signedIn ? "/post" : "/auth/register?next=/post";

  return (
    <section className="home-composer" aria-label="今の気持ちを書く">
      <Avatar
        animal={identity?.animal ?? "rabbit"}
        src={identity?.avatarSrc ?? `${communityAssetRoot}/avatars/anonymous-avatar-01.png`}
        alt=""
        tone={identity?.avatarTone ?? "moss"}
        size={44}
      />
      <div>
        <p>今の気持ちを書く</p>
        <span>ひとことだけでも大丈夫です</span>
      </div>
      <Link href={href} className="home-composer__submit">書く</Link>
    </section>
  );
}

function SignInPanel() {
  return (
    <section className="explore-signin-panel" aria-label="登録案内">
      <Image
        className="explore-signin-panel__art"
        src="/assets/community/shared-notes.png"
        alt=""
        aria-hidden="true"
        width={144}
        height={144}
      />
      <div>
        <p className="explore-signin-panel__title">反応や投稿には登録が必要です</p>
        <p className="explore-signin-panel__body">
          読むだけならこのままで大丈夫です。書きたい時だけ、安心できる名前で始められます。
        </p>
      </div>
      <Link href="/auth/register?next=/home" className="explore-primary-btn">
        そっと登録（無料・メールだけ）
      </Link>
    </section>
  );
}

function ExplorePostCard({
  post,
  signedIn,
  onRequireSignIn,
}: {
  post: ExplorePost;
  signedIn: boolean;
  onRequireSignIn: () => void;
}) {
  const [saved, setSaved] = useState(post.saved ?? false);
  const [picked, setPicked] = useState<string | null>(null);

  const handleReaction = (label: string) => {
    if (!signedIn) {
      onRequireSignIn();
      return;
    }
    setPicked((current) => (current === label ? null : label));
  };

  const handleSave = () => {
    if (!signedIn) {
      onRequireSignIn();
      return;
    }
    setSaved((current) => !current);
  };

  const isUchiake = post.id.startsWith("uchiake-");

  return (
    <article className="explore-post">
      <header className="explore-post__header">
        <Avatar
          animal={post.authorAvatar}
          src={post.authorAvatarSrc}
          alt={post.authorName}
          tone={post.authorAvatarTone}
          size={44}
        />
        <div className="explore-post__meta">
          <div>
            <span className="explore-post__name">{post.authorName}</span>
            <span className={`explore-post__topic explore-topic-pill--${post.topicTone}`}>{post.topic}</span>
          </div>
          {post.mood && <p>{post.mood}</p>}
        </div>
        <time className="explore-post__time">{post.timeLabel}</time>
      </header>

      <p className="explore-post__body">
        {isUchiake ? (
          <Link href={`/voice/${post.id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {post.body}
          </Link>
        ) : (
          post.body
        )}
      </p>

      <div className="explore-post__footer">
        {isUchiake && (
          <Link href={`/voice/${post.id}`} className="explore-room-link">
            続きを読む
            <Icon name="chevronRight" size={14} />
          </Link>
        )}
        {post.roomHref && (
          <Link href={post.roomHref} className="explore-room-link">
            {post.roomLabel ?? "同じテーマの声を読む"}
            <Icon name="chevronRight" size={14} />
          </Link>
        )}
        <button
          type="button"
          className={`explore-save ${saved ? "is-active" : ""}`.trim()}
          aria-label="保存"
          onClick={handleSave}
        >
          <Icon name="bookmark" size={18} />
        </button>
      </div>

      <div className="explore-post__actions" aria-label="反応">
        {post.reactions.map((reaction) => (
          <button
            key={reaction.label}
            type="button"
            className={`explore-reaction ${picked === reaction.label ? "is-active" : ""}`.trim()}
            onClick={() => handleReaction(reaction.label)}
          >
            <Icon
              name={reaction.label === "共感" ? "hand" : reaction.label === "応援" ? "heart" : "thanks"}
              size={15}
            />
            {reaction.label}
          </button>
        ))}
        <span className="explore-view-count" aria-label={`${post.viewCount ?? "0"}回表示`}>
          <Icon name="understand" size={15} />
          {post.viewCount ?? "0"}
        </span>
      </div>
    </article>
  );
}
