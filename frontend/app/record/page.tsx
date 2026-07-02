import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { BottomNav } from "@/components/layout/BottomNav";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

/**
 * 記録するハブ。
 * よりそい PHR の simple/record.html（大きな音声ボタン中心）の構造を踏襲。
 * 音声を最優先にしつつ、3種の記録手段に分岐する中継点。
 */
export default function RecordPage() {
  return (
    <>
      <AppHeader
        title="記録する"
        titleAlign="left"
        left={<BackButton fallbackHref="/home-v2" />}
      />

      <main className="app-main">
        <p
          style={{
            font: "400 13px/1.8 var(--font-jp)",
            letterSpacing: "0.06em",
            color: "var(--color-ink-500)",
            textAlign: "center",
            margin: "8px 32px 24px",
          }}
        >
          話しても、書いても、ひとことでも。
          <br />
          すきな かたちで。
        </p>

        {/* 大きな音声ボタン */}
        <div style={{ textAlign: "center", padding: "8px 0 8px" }}>
          <Link
            href="/post"
            aria-label="声で 記録する"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 176,
              height: 176,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--color-terra-50), var(--color-terra-200))",
              color: "var(--color-terra-700)",
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(180, 120, 90, 0.18)",
              border: "1px solid var(--color-terra-100)",
              gap: 10,
            }}
          >
            <Icon name="mic" size={52} />
            <span
              style={{
                font: "500 16px/1 var(--font-mincho)",
                letterSpacing: "0.16em",
              }}
            >
              声で 記録
            </span>
          </Link>
          <p
            style={{
              font: "400 11px/1 var(--font-jp)",
              color: "var(--color-ink-500)",
              letterSpacing: "0.08em",
              marginTop: 14,
            }}
          >
            タップして 話すだけ
          </p>
        </div>

        {/* または */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "32px 24px 20px",
            gap: 12,
          }}
        >
          <span
            style={{
              flex: 1,
              height: 1,
              background: "var(--color-line-soft)",
            }}
          />
          <span
            style={{
              font: "400 11px/1 var(--font-jp)",
              color: "var(--color-ink-300)",
              letterSpacing: "0.16em",
            }}
          >
            または
          </span>
          <span
            style={{
              flex: 1,
              height: 1,
              background: "var(--color-line-soft)",
            }}
          />
        </div>

        {/* 3つの記録カード */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "0 16px 32px",
          }}
        >
          <RecordOption
            href="/post/condition"
            icon="flower"
            label="今日の 体調を ひとことで"
            caption="5段階の レベル + ひとこと"
          />
          <RecordOption
            href="/settings/medical-records"
            icon="chat"
            label="診察の 記録"
            caption="医師との やりとりを 残す"
          />
          <RecordOption
            href="/post"
            icon="image"
            label="写真や 文章で 残す"
            caption="今 思っていることを そのまま"
          />
        </div>
      </main>

      <BottomNav active="home" />
    </>
  );
}

function RecordOption({
  href,
  icon,
  label,
  caption,
}: {
  href: string;
  icon: IconName;
  label: string;
  caption: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 18px",
        background: "var(--color-card)",
        border: "1px solid var(--color-line-soft)",
        borderRadius: 14,
        textDecoration: "none",
        color: "var(--color-ink-900)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          display: "grid",
          placeItems: "center",
          background: "var(--color-moss-50)",
          color: "var(--color-moss-700)",
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={22} />
      </span>
      <span style={{ flex: 1 }}>
        <span
          style={{
            display: "block",
            font: "500 15px/1.3 var(--font-jp)",
            letterSpacing: "0.06em",
            color: "var(--color-ink-900)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            display: "block",
            font: "400 11px/1.5 var(--font-jp)",
            letterSpacing: "0.04em",
            color: "var(--color-ink-500)",
            marginTop: 3,
          }}
        >
          {caption}
        </span>
      </span>
      <span style={{ color: "var(--color-ink-300)" }}>
        <Icon name="chevronRight" size={18} />
      </span>
    </Link>
  );
}
