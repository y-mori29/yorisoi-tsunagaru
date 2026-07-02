import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { BottomNav } from "@/components/layout/BottomNav";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

/**
 * ふりかえるハブ。
 * よりそい PHR の simple/calendar.html を参考に、
 * カレンダー（モック）＋ 自分の声 ＋ 病気を見つめなおす の3つの導線をまとめる。
 */
export default function LookBackPage() {
  return (
    <>
      <AppHeader
        title="ふりかえる"
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
          これまでの じぶんを、
          <br />
          そっと 見にいく。
        </p>

        {/* カレンダー風プレースホルダー */}
        <section
          style={{
            margin: "0 16px 16px",
            padding: "20px",
            background: "var(--color-card)",
            border: "1px solid var(--color-line-soft)",
            borderRadius: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <h3
              style={{
                font: "500 15px/1.3 var(--font-mincho)",
                letterSpacing: "0.06em",
                color: "var(--color-ink-900)",
              }}
            >
              カレンダー
            </h3>
            <span
              style={{
                font: "400 11px/1 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.08em",
              }}
            >
              準備中
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 4,
            }}
          >
            {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
              <span
                key={d}
                style={{
                  font: "400 10px/1 var(--font-jp)",
                  color: "var(--color-ink-300)",
                  textAlign: "center",
                  padding: "4px 0",
                  letterSpacing: "0.04em",
                }}
              >
                {d}
              </span>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3; // 5/1 が水曜想定の仮ダミー
              const has = [3, 11, 18, 22].includes(day);
              const inMonth = day >= 1 && day <= 31;
              return (
                <span
                  key={i}
                  style={{
                    aspectRatio: "1",
                    display: "grid",
                    placeItems: "center",
                    font: "400 12px/1 var(--font-num)",
                    color: inMonth
                      ? "var(--color-ink-700)"
                      : "var(--color-ink-300)",
                    position: "relative",
                  }}
                >
                  {inMonth ? day : ""}
                  {has && inMonth && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: 2,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--color-terra-500)",
                      }}
                    />
                  )}
                </span>
              );
            })}
          </div>
        </section>

        {/* 3つの導線 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "0 16px 32px",
          }}
        >
          <LookBackOption
            href="/me/voices"
            icon="bookmark"
            label="自分の つぶやき"
            caption="月ごとに 振り返る"
          />
          <LookBackOption
            href="/reflect"
            icon="moon"
            label="病気を 見つめなおす"
            caption="5つの 問いに そっと 答える"
          />
        </div>
      </main>

      <BottomNav active="home" />
    </>
  );
}

function LookBackOption({
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
          background: "var(--color-plum-50)",
          color: "var(--color-plum-600)",
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
