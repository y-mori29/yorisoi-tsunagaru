"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

type Visibility = "all" | "neighbors" | "room" | "quiet";

const VISIBILITIES: Array<{ value: Visibility; label: string; icon?: IconName }> = [
  { value: "all", label: "みんな" },
  { value: "neighbors", label: "お隣さんだけ" },
  { value: "room", label: "同じルームの人" },
  { value: "quiet", label: "自分だけ", icon: "lock" },
];

// もりさんの所属ルーム（仮データ・将来 API から取得）
const MY_ROOMS = [
  { id: "uc", label: "UC ルーム" },
  { id: "crohn", label: "クローン ルーム" },
];

const TOOLS: Array<{ icon: IconName; label: string }> = [
  { icon: "image", label: "写真" },
  { icon: "mic", label: "声で" },
  { icon: "sparkle", label: "ことばを ととのえる" },
];

const PLACEHOLDER = `今の気持ちを、ここに、そっと置いてみる。

すべて書かなくても、構いません。
ひとことでも、絶対に大丈夫です。`;

/**
 * 声を残す（投稿）画面 — output_v02/03-post.png を踏襲。
 * - 静かな日記帳のような佇まい・書くことに集中
 * - 公開範囲 4 つから選択
 * - 「しずか」モードのヒントを下部に
 */
export default function PostPage() {
  const [visibility, setVisibility] = useState<Visibility>("all");
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([MY_ROOMS[0].id]);
  const [body, setBody] = useState("");

  const toggleRoom = (id: string) => {
    setSelectedRoomIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  return (
    <>
      <AppHeader
        title="ことばを置く"
        left={
          <Link href="/home" aria-label="閉じる" className="icon-btn" style={{ textDecoration: "none" }}>
            <Icon name="close" />
          </Link>
        }
        right={<IconButton icon="bookmark" label="下書きに保存" />}
      />

      <main className="app-main">
        <p className="post-intro">
          今の気持ちを、ことばに残してみる場所。<br />
          どこに置くか、誰に見せるかは、あなたが選べます。
        </p>

        <div className="post-user-row">
          <Avatar animal="rabbit" src="/assets/animals/rabbit.png" tone="terra" size={56} alt="もり" />
          <div>
            <div className="post-user-row__name">もり</div>
          </div>
        </div>

        <div className="post-section-label">誰に 見せる？</div>
        <div className="post-visibility">
          {VISIBILITIES.map((v) => (
            <button
              key={v.value}
              type="button"
              className={`post-pill ${visibility === v.value ? "is-active" : ""}`.trim()}
              onClick={() => setVisibility(v.value)}
            >
              {v.icon && <Icon name={v.icon} />}
              {v.label}
            </button>
          ))}
        </div>

        {visibility === "room" && (
          <div className="post-room-picker">
            <div className="post-room-picker__label">どのルームに？（複数選べます）</div>
            <div className="post-room-picker__options">
              {MY_ROOMS.map((r) => {
                const isOn = selectedRoomIds.includes(r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={`post-room-pill ${isOn ? "is-active" : ""}`.trim()}
                    onClick={() => toggleRoom(r.id)}
                    aria-pressed={isOn}
                  >
                    <span className="post-room-pill__check" aria-hidden>
                      {isOn && <Icon name="check" />}
                    </span>
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <textarea
          className="post-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={PLACEHOLDER}
          maxLength={300}
        />

        <div className="post-toolbar">
          {TOOLS.map((t) => (
            <button key={t.label} type="button" className="post-tool">
              <Icon name={t.icon} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="post-hint">
          <span className="post-hint__icon">
            <Icon name="leaf" />
          </span>
          <div>
            <div className="post-hint__title">「自分だけ」を選ぶと…</div>
            <div className="post-hint__sub">誰にも見られない、あなただけの日記になります。</div>
          </div>
        </div>

        <div className="post-footer">
          <span className="post-footer__count">{body.length} / 300</span>
          <div className="post-footer__actions">
            <Link href="/home" className="btn btn--ghost btn--sm">
              あとで
            </Link>
            <button type="button" className="btn btn--primary btn--sm" disabled={body.length === 0}>
              そっと、置く
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
