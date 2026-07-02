import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { HeroIllustration } from "@/components/ui/HeroIllustration";
import { Icon } from "@/components/ui/Icon";
import { NeighborCard } from "@/components/screens/stroll/NeighborCard";
import { getNeighbors } from "@/lib/api/neighbors";

/**
 * /stroll — めぐる。
 * 散歩 メタファで、今日 ゆるく 出てきている お隣さんを 見せる。
 * 「お隣さがし（/find）」のような アンケート起点ではなく、
 * その日 たまたま 同じ時間に いた人 を 並べる ゆるい体験。
 */
export default async function StrollPage() {
  const neighbors = await getNeighbors();
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

        <section
          style={{
            margin: "0 16px 18px",
            padding: "14px 14px",
            background: "var(--color-card, #FFFDF8)",
            border: "1px solid var(--color-line-soft, #EAE2D2)",
            borderRadius: 12,
            display: "flex",
            gap: 10,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "grid",
              placeItems: "center",
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "var(--color-moss-50, #ECF1E2)",
              color: "var(--color-moss-600, #5E7A4A)",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <Icon name="leaf" size={14} />
          </span>
          <div style={{ flex: 1 }}>
            <p
              style={{
                font: "500 12px/1.6 var(--font-jp)",
                color: "var(--color-ink-700)",
                letterSpacing: "0.06em",
                margin: "0 0 4px",
              }}
            >
              ここは「ふらり 出会う」場所
            </p>
            <p
              style={{
                font: "400 12px/1.7 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              同じ時間に たまたま 出ている お隣さんが 並びます。
              明日には 入れ替わる ゆるい 出会い。
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 22, textAlign: "center", padding: "0 16px" }}>
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
            気が向いたら、ひとこと 声を かけてみてください。
          </p>
        </section>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {neighbors.map((n) => (
            <NeighborCard key={n.id} neighbor={n} />
          ))}
        </div>

        <Link
          href="/find"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "28px 16px 8px",
            padding: "12px 14px",
            background: "var(--color-bg-soft, #F3EDE2)",
            border: "1px solid var(--color-line-soft, #EAE2D2)",
            borderRadius: 12,
            textDecoration: "none",
            color: "var(--color-ink-900)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "grid",
              placeItems: "center",
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "var(--color-card, #FFFDF8)",
              color: "var(--color-terra-600, #A45A3F)",
              flexShrink: 0,
            }}
          >
            <Icon name="search" size={16} />
          </span>
          <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                font: "500 13px/1.3 var(--font-jp)",
                letterSpacing: "0.06em",
              }}
            >
              じっくり さがしたい
            </span>
            <span
              style={{
                font: "400 11px/1.5 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.04em",
              }}
            >
              3 つの 問いから、考え方の 近い 人を 見つける（お隣さがし）
            </span>
          </span>
          <Icon name="chevronRight" size={18} />
        </Link>
      </main>

      <BottomNav active="stroll" />
    </>
  );
}
