import type { ExplorePost } from "@/lib/mock/explore";

const RECENT_POOL_SIZE = 180;
const FIRST_VIEW_SIZE = 12;
const MAX_SAME_TOPIC_IN_FIRST_VIEW = 2;

function shuffledCopy<T>(items: T[], random: () => number): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

/**
 * 新着の意味を壊さないよう、時刻順の先頭にある最近の投稿だけを訪問ごとに入れ替える。
 * 最初の12件では投稿者の重複と同じテーマへの偏りも抑える。
 */
export function createLatestVisitOrder(
  posts: ExplorePost[],
  random: () => number = Math.random,
): ExplorePost[] {
  if (posts.length <= 1) return [...posts];

  const poolSize = Math.min(RECENT_POOL_SIZE, posts.length);
  const firstViewSize = Math.min(FIRST_VIEW_SIZE, poolSize);
  const recentPool = shuffledCopy(posts.slice(0, poolSize), random);
  const firstView: ExplorePost[] = [];
  const deferred: ExplorePost[] = [];
  const usedAuthors = new Set<string>();
  const topicCounts = new Map<string, number>();

  recentPool.forEach((post) => {
    const topicCount = topicCounts.get(post.topic) ?? 0;
    const canFeature =
      firstView.length < firstViewSize &&
      !usedAuthors.has(post.authorName) &&
      topicCount < MAX_SAME_TOPIC_IN_FIRST_VIEW;

    if (!canFeature) {
      deferred.push(post);
      return;
    }

    firstView.push(post);
    usedAuthors.add(post.authorName);
    topicCounts.set(post.topic, topicCount + 1);
  });

  if (firstView.length < firstViewSize) {
    firstView.push(...deferred.splice(0, firstViewSize - firstView.length));
  }

  return [...firstView, ...deferred, ...posts.slice(poolSize)];
}
