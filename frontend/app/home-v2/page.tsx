"use client";

import { use } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { IconButton } from "@/components/ui/IconButton";
import { DotBadge } from "@/components/ui/DotBadge";
import { GreetingBlock } from "@/components/screens/home/GreetingBlock";
import { FourButtons } from "@/components/screens/home-v2/FourButtons";
import { TsubuyakiPreview } from "@/components/screens/home-v2/TsubuyakiPreview";
import { OwlPopup } from "@/components/screens/home-v2/OwlPopup";
import { getVoices } from "@/lib/api/voices";

/**
 * シンプルホーム（別筋・5/20 副田MTGの提案を反映）
 * 既存 /home（コミュニティタイムライン直出し）は完全に温存。
 *
 * 構成:
 *   AppHeader（ホーム + ベル）
 *   挨拶ブロック
 *   4つの丸ボタン（記録／ふりかえる／見せる／つながる）
 *   「みんなの声」チラ見え 1〜2 件 → タップで /home へ
 *   フクロウのポップアップ（フットインザドア式・初回 3 秒後）
 */
export default function HomeV2Page() {
  const allVoices = use(getVoices());
  const publicVoices = allVoices.filter((v) => v.visibility === "all");

  return (
    <>
      <AppHeader
        title="ホーム"
        titleAlign="left"
        right={
          <Link
            href="/notifications"
            aria-label="お便り"
            style={{ position: "relative", display: "inline-flex" }}
          >
            <IconButton icon="bell" label="お便り" />
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                pointerEvents: "none",
              }}
            >
              <DotBadge />
            </span>
          </Link>
        }
      />

      <main className="app-main">
        <GreetingBlock
          date="2026 . 05 . 22"
          greeting="おはようございます、もりさん。"
        />

        <FourButtons />

        <TsubuyakiPreview voices={publicVoices} />
      </main>

      <BottomNav active="home" />

      <OwlPopup />
    </>
  );
}
