import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Voice } from "@/lib/api/types";

type Props = {
  voices: Voice[];
};

/**
 * シンプルホーム下部の「みんなの声」チラ見えセクション。
 * 1〜2 件だけ控えめに見せ、タップで個別画面 or つながる（/home）へ。
 */
export function TsubuyakiPreview({ voices }: Props) {
  const preview = voices.slice(0, 2);
  if (preview.length === 0) return null;

  return (
    <section style={{ margin: "0 16px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            font: "500 13px/1.3 var(--font-jp)",
            letterSpacing: "0.1em",
            color: "var(--color-ink-700)",
          }}
        >
          みんなの 声
        </h3>
        <Link
          href="/home"
          style={{
            font: "400 11px/1 var(--font-jp)",
            color: "var(--color-ink-500)",
            letterSpacing: "0.08em",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          つながるへ
          <Icon name="chevronRight" size={14} />
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {preview.map((v) => (
          <Link
            key={v.id}
            href={`/voice/${v.id}`}
            style={{
              display: "block",
              padding: "14px 16px",
              background: "var(--color-card)",
              border: "1px solid var(--color-line-soft)",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <p
              style={{
                font: "400 13px/1.7 var(--font-jp)",
                color: "var(--color-ink-700)",
                letterSpacing: "0.04em",
                marginBottom: 8,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {v.body}
            </p>
            <p
              style={{
                font: "400 10px/1 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              {v.authorName}　・　{v.timeLabel}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
