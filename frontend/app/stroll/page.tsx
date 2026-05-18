"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { HeroIllustration } from "@/components/ui/HeroIllustration";
import { NeighborCard } from "@/components/screens/stroll/NeighborCard";
import { mockNeighbors } from "@/lib/mock/neighbors";

/**
 * /stroll — めぐる。
 * 散歩 メタファで、今日 ゆるく 出てきている お隣さんを 見せる。
 * 「お隣さがし（/find）」のような アンケート起点ではなく、
 * その日 たまたま 同じ時間に いた人 を 並べる ゆるい体験。
 */
export default function StrollPage() {
  return (
    <>
      <AppHeader title="めぐる" titleAlign="left" />

      <main className="app-main">
        <section style={{ marginBottom: 22 }}>
          <HeroIllustration
            src="/assets/heroes/stroll-path.png"
            alt="小道と 木々、遠くに 家"
            aspect="4/3"
          />
        </section>

        <section style={{ marginBottom: 26, textAlign: "center" }}>
          <p
            style={{
              font: "400 14px/1.95 var(--font-mincho)",
              color: "var(--color-ink-700)",
              letterSpacing: "0.04em",
              whiteSpace: "pre-line",
            }}
          >
            今日、ゆっくり 歩いている方が います。
            {"\n"}
            気が向いたら、ことばを 置いてみてください。
          </p>
        </section>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mockNeighbors.map((n) => (
            <NeighborCard key={n.id} neighbor={n} />
          ))}
        </div>

        <p
          style={{
            font: "400 11px/1.7 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.06em",
            textAlign: "center",
            marginTop: 28,
            paddingBottom: 8,
          }}
        >
          散歩中の方は、明日には 入れ替わります。
          <br />
          じっくり 探したい方は、
          <Link
            href="/find"
            style={{
              color: "var(--color-ink-500)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationColor: "var(--color-ink-200)",
              marginLeft: 4,
            }}
          >
            お隣さがし
          </Link>
          へ。
        </p>
      </main>

      <BottomNav active="stroll" />
    </>
  );
}
