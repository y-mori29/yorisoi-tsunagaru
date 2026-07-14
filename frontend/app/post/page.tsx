import { Suspense } from "react";
import { PostComposer } from "@/components/screens/post/PostComposer";

function PostPageFallback() {
  return (
    <main className="explore-shell post-simple-shell" aria-busy="true">
      <header className="find-header">
        <span aria-hidden="true" />
        <h1>声を書く</h1>
        <span aria-hidden="true" />
      </header>
      <section className="post-simple-loading" aria-label="投稿画面を準備しています">
        <p>投稿画面を準備しています。</p>
      </section>
    </main>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={<PostPageFallback />}>
      <PostComposer />
    </Suspense>
  );
}
