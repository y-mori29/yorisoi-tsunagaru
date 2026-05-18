/**
 * ホーム画面冒頭の挨拶ブロック。
 * 日付（小さく） + 「おはようございます、もりさん。」（明朝・大）
 */
type GreetingBlockProps = {
  date: string; // "2026 . 05 . 16"
  greeting: string;
};

export function GreetingBlock({ date, greeting }: GreetingBlockProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          font: "400 11px/1 var(--font-num)",
          letterSpacing: "0.18em",
          color: "var(--color-ink-300)",
          marginBottom: 10,
        }}
      >
        {date}
      </div>
      <h2
        style={{
          font: "500 22px/1.55 var(--font-mincho)",
          letterSpacing: "0.04em",
          color: "var(--color-ink-900)",
        }}
      >
        {greeting}
      </h2>
    </div>
  );
}
