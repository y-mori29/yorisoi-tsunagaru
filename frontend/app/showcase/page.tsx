"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { DividerLabel } from "@/components/layout/DividerLabel";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { Segment } from "@/components/ui/Segment";
import { Toggle } from "@/components/ui/Toggle";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { DotBadge } from "@/components/ui/DotBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { IconPill } from "@/components/ui/IconPill";
import { ReactionChip } from "@/components/ui/ReactionChip";
import { VoiceCard, SpecialVoiceCard } from "@/components/ui/VoiceCard";
import { WhisperCard } from "@/components/ui/WhisperCard";
import { ListRow } from "@/components/ui/ListRow";
import { ANIMAL_ICONS, ICONS, type AnimalName, type IconName } from "@/lib/icons";

/**
 * /showcase — Phase 1 完成確認用ページ
 * 全 UI プリミティブ + レイアウトコンポーネントを並べて、視覚的に検証する。
 */
export default function ShowcasePage() {
  const [seg, setSeg] = useState<"all" | "neighbor">("all");
  const [tog1, setTog1] = useState(true);
  const [tog2, setTog2] = useState(false);

  return (
    <>
      <AppHeader
        title="UI Showcase"
        left={<IconButton icon="back" label="戻る" />}
        right={<IconButton icon="settings" label="設定" />}
      />

      <main className="app-main">
        <DividerLabel>Buttons</DividerLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Button variant="primary">そっと、開く</Button>
          <Button variant="secondary">あとで</Button>
          <Button variant="ghost">スキップ</Button>
          <Button variant="quiet">控えめ</Button>
          <Button variant="moss">そらと次へ</Button>
          <Button variant="plum">そっと返す</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          <Button variant="primary" size="sm">小</Button>
          <Button variant="primary" size="md">中</Button>
          <Button variant="primary" size="lg">大</Button>
          <Button variant="primary" full>full width primary</Button>
        </div>

        <DividerLabel>Icon Buttons</DividerLabel>
        <div style={{ display: "flex", gap: 12 }}>
          <IconButton icon="back" label="戻る" />
          <IconButton icon="close" label="閉じる" />
          <IconButton icon="search" label="検索" />
          <IconButton icon="bell" label="お知らせ" />
          <IconButton icon="settings" label="設定" />
          <IconButton icon="bookmark" label="ブックマーク" />
        </div>

        <DividerLabel>Avatars (8 animals × default 44px)</DividerLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {(Object.keys(ANIMAL_ICONS) as AnimalName[]).map((a) => (
            <div key={a} style={{ textAlign: "center" }}>
              <Avatar animal={a} tone="terra" size={44} />
              <div style={{ fontSize: 10, color: "var(--color-ink-500)", marginTop: 4 }}>{a}</div>
            </div>
          ))}
        </div>

        <DividerLabel>Avatar tones (rabbit, size 44)</DividerLabel>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar animal="rabbit" tone="terra" size={44} />
          <Avatar animal="rabbit" tone="moss" size={44} />
          <Avatar animal="rabbit" tone="plum" size={44} />
          <Avatar animal="rabbit" tone="cream" size={44} />
          <Avatar animal="rabbit" tone="default" size={44} />
        </div>

        <DividerLabel>Avatar sizes (rabbit, terra)</DividerLabel>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          {[28, 36, 44, 56, 80, 100, 112].map((s) => (
            <Avatar key={s} animal="rabbit" tone="terra" size={s as 28} />
          ))}
        </div>

        <DividerLabel>Chips & Badges</DividerLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <Chip>default</Chip>
          <Chip tone="terra">潰瘍性大腸炎</Chip>
          <Chip tone="moss">朝型</Chip>
          <Chip tone="plum">読む派</Chip>
          <Chip tone="cream">クローン病</Chip>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 8 }}>
          <Badge>moss badge</Badge>
          <Badge tone="terra">潰瘍性大腸炎</Badge>
          <Badge tone="plum">プラム</Badge>
          <Badge tone="gold">公式</Badge>
          <span style={{ position: "relative" }}>
            <Icon name="bell" size={22} />
            <DotBadge className="absolute" />
          </span>
        </div>

        <DividerLabel>Segment</DividerLabel>
        <Segment
          options={[
            { value: "all", label: "みんな" },
            { value: "neighbor", label: "お隣" },
          ]}
          value={seg}
          onChange={setSeg}
        />

        <DividerLabel>Toggle / Progress dots</DividerLabel>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Toggle on={tog1} onChange={setTog1} label="お便りを受け取る" />
          <Toggle on={tog2} onChange={setTog2} label="夜は、静かにする" />
          <ProgressDots total={3} current={0} />
          <ProgressDots total={6} current={2} />
        </div>

        <DividerLabel>Reaction Chips</DividerLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <ReactionChip icon="acknowledge" label="そう" active />
          <ReactionChip icon="leaf" label="わかる" />
          <ReactionChip icon="understand" label="読んだよ" />
          <ReactionChip icon="thanks" label="ありがとう" />
          <ReactionChip icon="hand" label="気にかけてる" />
        </div>

        <DividerLabel>Special Voice Card（今日のひとこと）</DividerLabel>
        <SpecialVoiceCard
          eyebrow="今日のひとこと"
          body={"今日は、ふかぶかと、息をはいてみる日。\nあなたは、ちゃんと眠れていますか。"}
          authorName="もか（公式）から"
          authorAvatar="rabbit"
        />

        <DividerLabel>Voice Card (タイムライン)</DividerLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <VoiceCard
            author={{ name: "しずか", avatar: "rabbit", tone: "terra" }}
            roomName="潰瘍性大腸炎"
            roomTone="terra"
            time="3分前"
            body={
              "今日は朝から、なんだか落ち着かなくて。\nベランダで風に当たって、深く呼吸をしてみました。\n同じような方、いますか。"
            }
            reactions={[
              { icon: "acknowledge", label: "そう", active: true },
              { icon: "leaf", label: "わかる" },
              { icon: "understand", label: "読んだよ" },
            ]}
            showChat
          />
          <VoiceCard
            author={{ name: "ふらり", avatar: "cat", tone: "moss" }}
            roomName="クローン病"
            roomTone="plum"
            time="15分前"
            body={"散歩道で、小さな花が、開いていました。\nこういう、静かな時間が、いちばん好きです。"}
            reactions={[
              { icon: "thanks", label: "ありがとう" },
              { icon: "leaf", label: "わかる" },
            ]}
          />
        </div>

        <DividerLabel>Whisper Card（そっと届く声）</DividerLabel>
        <WhisperCard
          label="届いた声"
          timer="あと 21時間"
          body={"最近、ちゃんと眠れていますか。\n\nわたしは、あまり眠れなくて、\n夜中に、天井をぼんやり見つめていました。\n\n同じような方は、いますか。"}
          from={
            <>
              <Avatar animal="turtle" tone="cream" size={28} />
              <span>あるお隣さん</span>
            </>
          }
        />

        <DividerLabel>List Rows（設定画面用）</DividerLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <ListRow
            leftIcon={<IconPill icon="profile" tone="terra" />}
            title="プロフィール"
            sub="名前・アバター・自己紹介"
            showChevron
          />
          <ListRow
            leftIcon={<IconPill icon="bell" tone="plum" />}
            title="お便りを受け取る"
            sub="そっと届く声・反応・お隣さん"
            right={<Toggle on={tog1} onChange={setTog1} label="お便り受け取り" />}
          />
          <ListRow
            leftIcon={<IconPill icon="heart" tone="gold" />}
            title="いのちを支える ホットライン"
            sub="よりそいホットライン・いのちの電話 ほか"
            showChevron
          />
        </div>

        <DividerLabel>All Icons (デザインシステム参考)</DividerLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {(Object.keys(ICONS) as IconName[]).map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                color: "var(--color-ink-500)",
                width: 60,
              }}
            >
              <Icon name={name} size={24} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </main>

      <BottomNav active={null} />
    </>
  );
}
