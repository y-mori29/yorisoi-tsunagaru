"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const signals = [
  { label: "病気から", note: "難病・がん・慢性疾患", tone: "terra" },
  { label: "症状から", note: "痛み・疲れ・眠れない夜", tone: "plum" },
  { label: "悩みから", note: "仕事・家族・医療費", tone: "gold" },
  { label: "今の不安から", note: "診断前・通院前・外出前", tone: "moss" },
] as const;

const discoveryGroups = [
  {
    title: "病気",
    items: [
      "潰瘍性大腸炎",
      "クローン病",
      "重症筋無力症",
      "全身性エリテマトーデス",
      "関節リウマチ",
      "1型糖尿病",
      "ファブリー病",
      "ベーチェット病",
      "多発性硬化症",
      "パーキンソン病",
      "乳がん",
      "血液がん",
    ],
  },
  {
    title: "症状",
    items: [
      "腹痛",
      "下痢・トイレの不安",
      "強い疲れ",
      "痛み",
      "しびれ",
      "息切れ",
      "眠れない夜",
      "皮膚症状",
    ],
  },
  {
    title: "悩み",
    items: [
      "診断前・検査待ち",
      "仕事・学校との両立",
      "家族に話すこと",
      "医療費の不安",
      "通院前の不安",
      "外出・旅行の不安",
    ],
  },
] as const;

export function CommunitySignalPanel() {
  return (
    <section
      aria-labelledby="community-signal-title"
      style={{
        margin: "0 16px 18px",
        padding: "16px",
        background:
          "linear-gradient(135deg, rgba(255,253,248,0.98), rgba(239,241,230,0.78))",
        border: "1px solid var(--color-line-soft, #EAE2D2)",
        borderRadius: 16,
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span
          aria-hidden="true"
          style={{
            display: "grid",
            placeItems: "center",
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "var(--color-moss-50, #ECF1E2)",
            color: "var(--color-moss-700, #545C3C)",
            flexShrink: 0,
          }}
        >
          <Icon name="whisper" size={20} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            id="community-signal-title"
            style={{
              font: "500 15px/1.55 var(--font-jp)",
              color: "var(--color-ink-900)",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            近い声を探す
          </p>
          <p
            style={{
              font: "400 12px/1.75 var(--font-jp)",
              color: "var(--color-ink-500)",
              letterSpacing: "0.04em",
              marginTop: 4,
            }}
          >
            病名だけで決めなくても大丈夫。症状や不安からも選べます。
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 8,
          marginTop: 14,
        }}
      >
        {signals.map((s) => (
          <div
            key={s.label}
            style={{
              minHeight: 70,
              padding: "10px 9px",
              borderRadius: 12,
              background: toneToBg(s.tone),
              border: `1px solid ${toneToBorder(s.tone)}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <span
              style={{
                font: "600 13px/1 var(--font-jp)",
                color: toneToText(s.tone),
                letterSpacing: "0.02em",
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                font: "400 11px/1.45 var(--font-jp)",
                color: "var(--color-ink-700)",
                letterSpacing: "0.03em",
              }}
            >
              {s.note}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
        {discoveryGroups.map((group) => (
          <div key={group.title}>
            <p
              style={{
                font: "500 11px/1 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.1em",
                marginBottom: 7,
              }}
            >
              {group.title}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {group.items.map((item) => (
                <Link
                  key={item}
                  href="/rooms"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 28,
                    padding: "0 10px",
                    borderRadius: 999,
                    background: "rgba(255, 253, 248, 0.86)",
                    border: "1px solid var(--color-line-soft, #EAE2D2)",
                    color: "var(--color-ink-700)",
                    font: "400 11px/1 var(--font-jp)",
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 14,
        }}
      >
        <Link
          href="/rooms"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            minHeight: 38,
            padding: "0 14px",
            borderRadius: 999,
            background: "var(--color-ink-900)",
            color: "var(--color-card, #FFFDF8)",
            font: "500 12px/1 var(--font-jp)",
            letterSpacing: "0.06em",
          }}
        >
          近い声を探す
          <Icon name="chevronRight" size={15} />
        </Link>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            color: "var(--color-ink-500)",
            font: "400 11px/1.45 var(--font-jp)",
            letterSpacing: "0.04em",
          }}
        >
          <Icon name="shield" size={14} />
          読むだけでも大丈夫
        </span>
      </div>
    </section>
  );
}

function toneToBg(tone: (typeof signals)[number]["tone"]): string {
  switch (tone) {
    case "terra":
      return "rgba(248, 239, 231, 0.9)";
    case "plum":
      return "rgba(236, 231, 236, 0.92)";
    case "gold":
      return "rgba(250, 244, 224, 0.92)";
    case "moss":
      return "rgba(236, 241, 226, 0.92)";
  }
}

function toneToBorder(tone: (typeof signals)[number]["tone"]): string {
  switch (tone) {
    case "terra":
      return "var(--color-terra-200, #E0C2A5)";
    case "plum":
      return "var(--color-plum-200, #BAACBC)";
    case "gold":
      return "rgba(201, 169, 97, 0.4)";
    case "moss":
      return "rgba(117, 127, 85, 0.35)";
  }
}

function toneToText(tone: (typeof signals)[number]["tone"]): string {
  switch (tone) {
    case "terra":
      return "var(--color-terra-700, #7E5A40)";
    case "plum":
      return "var(--color-plum-600, #6A5C6E)";
    case "gold":
      return "var(--color-gold-600, #8C7239)";
    case "moss":
      return "var(--color-moss-700, #545C3C)";
  }
}
