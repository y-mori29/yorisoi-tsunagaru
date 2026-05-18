/**
 * Phase 0 確認用ページ — 開発サーバー起動とトークン適用の検証用。
 * Phase 3 で本物のオンボーディング画面に置き換え予定。
 */
export default function Page() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
      <h1
        className="text-3xl tracking-wide text-ink-900 text-center"
        style={{ fontFamily: "var(--font-mincho)" }}
      >
        よりそい つながる
      </h1>

      <p className="text-ink-500 text-sm text-center">
        Phase 0 — 開発サーバー起動 & デザイントークン適用 確認
      </p>

      <ul className="text-sm text-ink-700 space-y-2 mt-4">
        <li>✓ Next.js 16 + React 19.2 + TypeScript</li>
        <li>✓ Tailwind v4（@theme トークン）</li>
        <li>✓ v2 デザイントークン適用済（terra / moss / plum / ink）</li>
        <li>✓ システムフォント（Yu Gothic / Yu Mincho）</li>
      </ul>

      <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-md">
        <span className="px-3 py-1.5 rounded-full bg-terra-50 text-terra-700 text-xs">
          terra
        </span>
        <span className="px-3 py-1.5 rounded-full bg-moss-50 text-moss-700 text-xs">
          moss
        </span>
        <span className="px-3 py-1.5 rounded-full bg-plum-50 text-plum-600 text-xs">
          plum
        </span>
        <span className="px-3 py-1.5 rounded-full bg-paper-soft text-ink-700 text-xs">
          paper-soft
        </span>
      </div>

      <button className="mt-8 px-8 py-3 bg-terra-500 text-paper rounded-full text-base hover:bg-terra-700 transition-colors">
        そっと、開く
      </button>

      <p className="text-ink-300 text-xs mt-8 text-center">
        次は Phase 1: レイアウト土台 + UI プリミティブ
      </p>
    </main>
  );
}
