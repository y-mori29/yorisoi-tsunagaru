"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";
import { getHealthRecommendation } from "@/lib/onboarding/recommendations";
import { useStoredHealthContext } from "@/lib/onboarding/useStoredHealthContext";
import type { IconName } from "@/lib/icons";

type SettingLink = {
  href: string;
  icon: IconName;
  title: string;
  body: string;
  badge?: string;
};

export default function SettingsPage() {
  const [notify, setNotify] = useState(true);
  const [quietNight, setQuietNight] = useState(true);
  const [hideFromSearch, setHideFromSearch] = useState(false);
  const { healthContext } = useStoredHealthContext();
  const recommendation = getHealthRecommendation(healthContext);
  const topicLabels = recommendation.topicLabels.slice(0, 5);

  return (
    <>
      <AppHeader title="安心設定" left={<BackButton fallbackHref="/me" />} />

      <main
        className="app-main settings-home"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingBottom: "calc(104px + env(safe-area-inset-bottom))",
        }}
      >
        <section
          aria-label="安心設定の概要"
          style={{
            display: "grid",
            gap: 10,
            padding: 18,
            border: "1px solid rgba(214, 200, 178, 0.78)",
            borderRadius: 22,
            background: "linear-gradient(135deg, rgba(255, 253, 248, 0.96), rgba(239, 241, 230, 0.78))",
            boxShadow: "0 14px 30px rgba(74, 56, 38, 0.06)",
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              display: "inline-grid",
              placeItems: "center",
              borderRadius: 999,
              background: "rgba(117, 127, 85, 0.12)",
              color: "var(--color-moss-700)",
            }}
          >
            <Icon name="shield" size={20} />
          </span>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--color-moss-700)",
                font: "700 10.5px/1.45 var(--font-jp)",
                letterSpacing: "0.12em",
              }}
            >
              読むことも、置くことも、自分のペースで
            </p>
            <h1
              style={{
                margin: "5px 0 0",
                color: "var(--color-ink-900)",
                fontFamily: "var(--font-mincho)",
                fontSize: 24,
                fontWeight: 500,
                lineHeight: 1.45,
                letterSpacing: "0.04em",
              }}
            >
              つながり方を、ここで整える
            </h1>
            <p
              style={{
                margin: "8px 0 0",
                color: "var(--color-ink-600)",
                font: "500 12px/1.75 var(--font-jp)",
              }}
            >
              病気や症状の見え方、声の届き方、通知の強さをまとめて見直せます。
            </p>
          </div>
        </section>

        <section aria-labelledby="settings-state-heading" style={{ display: "grid", gap: 10 }}>
          <SectionHeading label="自分の状態" title="近い声を見つけるための設定" id="settings-state-heading" />
          <div
            style={{
              display: "grid",
              gap: 12,
              padding: 15,
              border: "1px solid rgba(214, 200, 178, 0.78)",
              borderRadius: 18,
              background: "rgba(255, 253, 248, 0.86)",
              boxShadow: "0 9px 22px rgba(74, 56, 38, 0.045)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div>
                <p style={{ margin: 0, color: "var(--color-ink-500)", font: "700 10.5px/1.45 var(--font-jp)" }}>
                  主な病気・状態
                </p>
                <strong style={{ display: "block", marginTop: 4, color: "var(--color-ink-900)", font: "700 16px/1.45 var(--font-jp)" }}>
                  {recommendation.primaryName ?? "まだ選んでいません"}
                </strong>
              </div>
              <Link
                href="/onboarding/condition"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  minHeight: 32,
                  paddingInline: 12,
                  borderRadius: 999,
                  background: "rgba(117, 127, 85, 0.12)",
                  color: "var(--color-moss-700)",
                  font: "700 11px/1 var(--font-jp)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                変更する
                <Icon name="chevronRight" size={13} />
              </Link>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {(topicLabels.length > 0 ? topicLabels : ["病名未設定", "症状から探せます"]).map((label) => (
                <span
                  key={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 28,
                    padding: "0 11px",
                    border: "1px solid rgba(214, 200, 178, 0.76)",
                    borderRadius: 999,
                    background: "rgba(250, 247, 238, 0.84)",
                    color: "var(--color-ink-700)",
                    font: "600 11px/1 var(--font-jp)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <Link
              href="/find"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                minHeight: 42,
                padding: "0 14px",
                borderRadius: 999,
                background: "var(--color-moss-700)",
                color: "white",
                font: "700 12px/1 var(--font-jp)",
                textDecoration: "none",
              }}
            >
              近い声を探す
              <Icon name="search" size={15} />
            </Link>
          </div>
        </section>

        <section aria-labelledby="settings-safety-heading" style={{ display: "grid", gap: 10 }}>
          <SectionHeading label="安心設定" title="声の届き方と距離を調整する" id="settings-safety-heading" />
          <div style={{ display: "grid", gap: 9 }}>
            <SettingSwitch
              icon="search"
              title="名前で探されないようにする"
              body="知っている人から見つかりにくくします"
              checked={hideFromSearch}
              onChange={setHideFromSearch}
            />
            <SettingCard
              href="/settings/blocked"
              icon="shield"
              title="距離を置いた人"
              body="見たくない相手や、反応されたくない相手を確認します"
              badge="2人"
            />
          </div>
        </section>

        <section aria-labelledby="settings-notify-heading" style={{ display: "grid", gap: 10 }}>
          <SectionHeading label="通知" title="必要な時だけ、そっと受け取る" id="settings-notify-heading" />
          <div style={{ display: "grid", gap: 9 }}>
            <SettingSwitch
              icon="bell"
              title="反応や近い声のお知らせ"
              body="共感や近いテーマの声が届いた時だけ知らせます"
              checked={notify}
              onChange={setNotify}
            />
            <SettingSwitch
              icon="moon"
              title="夜は静かにする"
              body="22:00から7:00までは通知を控えます"
              checked={quietNight}
              onChange={setQuietNight}
            />
          </div>
        </section>

        <p style={{ margin: "2px 0 0", color: "var(--color-ink-300)", textAlign: "center", font: "600 10.5px/1.7 var(--font-jp)" }}>
          よりそい つながる v0.1.0
        </p>
      </main>

      <BottomNav active="profile" />
    </>
  );
}

function SectionHeading({ label, title, id }: { label: string; title: string; id: string }) {
  return (
    <div>
      <p style={{ margin: 0, color: "var(--color-moss-700)", font: "700 10.5px/1.45 var(--font-jp)", letterSpacing: "0.12em" }}>
        {label}
      </p>
      <h2 id={id} style={{ margin: "2px 0 0", color: "var(--color-ink-900)", font: "700 15px/1.45 var(--font-jp)" }}>
        {title}
      </h2>
    </div>
  );
}

function SettingCard({ href, icon, title, body, badge }: SettingLink) {
  return (
    <Link href={href} style={settingRowStyle}>
      <SettingIcon icon={icon} />
      <span style={{ minWidth: 0 }}>
        <strong style={settingTitleStyle}>{title}</strong>
        <small style={settingBodyStyle}>{body}</small>
      </span>
      {badge && <span style={settingBadgeStyle}>{badge}</span>}
      <Icon name="chevronRight" size={15} />
    </Link>
  );
}

function SettingSwitch({
  icon,
  title,
  body,
  checked,
  onChange,
}: {
  icon: IconName;
  title: string;
  body: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div style={settingRowStyle}>
      <SettingIcon icon={icon} />
      <span style={{ minWidth: 0 }}>
        <strong style={settingTitleStyle}>{title}</strong>
        <small style={settingBodyStyle}>{body}</small>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        style={{
          position: "relative",
          flex: "0 0 auto",
          width: 46,
          height: 28,
          border: "1px solid rgba(117, 127, 85, 0.22)",
          borderRadius: 999,
          background: checked ? "var(--color-moss-700)" : "rgba(214, 200, 178, 0.28)",
          boxShadow: checked ? "inset 0 0 0 1px rgba(255,255,255,0.16)" : "none",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 3,
            left: checked ? 21 : 3,
            width: 20,
            height: 20,
            borderRadius: 999,
            background: "rgba(255, 253, 248, 0.98)",
            boxShadow: "0 2px 7px rgba(74, 56, 38, 0.18)",
            transition: "left 160ms ease",
          }}
        />
      </button>
    </div>
  );
}

function SettingIcon({ icon }: { icon: IconName }) {
  return (
    <span
      style={{
        flex: "0 0 auto",
        width: 35,
        height: 35,
        display: "inline-grid",
        placeItems: "center",
        borderRadius: 999,
        background: "rgba(239, 241, 230, 0.78)",
        color: "var(--color-moss-700)",
      }}
    >
      <Icon name={icon} size={17} />
    </span>
  );
}

const settingRowStyle = {
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
  alignItems: "center",
  gap: 10,
  minHeight: 72,
  padding: "12px 13px",
  border: "1px solid rgba(214, 200, 178, 0.76)",
  borderRadius: 17,
  background: "rgba(255, 253, 248, 0.86)",
  color: "var(--color-ink-900)",
  textDecoration: "none",
  boxShadow: "0 8px 20px rgba(74, 56, 38, 0.045)",
} as const;

const settingTitleStyle = {
  display: "block",
  color: "var(--color-ink-900)",
  fontFamily: "var(--font-jp)",
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.45,
} as const;

const settingBodyStyle = {
  display: "block",
  marginTop: 3,
  color: "var(--color-ink-500)",
  fontFamily: "var(--font-jp)",
  fontSize: 10.5,
  fontWeight: 500,
  lineHeight: 1.55,
} as const;

const settingBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 26,
  padding: "0 9px",
  borderRadius: 999,
  background: "rgba(176, 121, 82, 0.11)",
  color: "var(--color-terra-700)",
  fontFamily: "var(--font-jp)",
  fontSize: 10.5,
  fontWeight: 700,
  whiteSpace: "nowrap",
} as const;
