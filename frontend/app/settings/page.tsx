"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { IconButton } from "@/components/ui/IconButton";
import { ListRow } from "@/components/ui/ListRow";
import { IconPill } from "@/components/ui/IconPill";
import { Toggle } from "@/components/ui/Toggle";
import { Chip } from "@/components/ui/Chip";
import { SettingsSection } from "@/components/screens/settings/SettingsSection";
import { SettingsSafetyCard } from "@/components/screens/settings/SettingsSafetyCard";

/**
 * 設定画面 — output_v02/09-settings.png を踏襲。
 * - おまもりレポート（最上部・運営の見守りを伝える）
 * - アカウント / お便り / 守る設定 / 記録 / 困ったとき の 5 セクション
 * - 各行は詳細画面へ遷移、トグル付き行は左テキスト=詳細遷移 / 右=トグル独立
 * - フッターにバージョンとログアウト（ゴースト）
 */
export default function SettingsPage() {
  const [notify, setNotify] = useState(true);
  const [quietNight, setQuietNight] = useState(true);
  const [hideFromSearch, setHideFromSearch] = useState(false);

  return (
    <>
      <AppHeader
        title="設定"
        left={<IconButton icon="back" label="戻る" />}
      />

      <main className="app-main">
        <SettingsSection label="あなたを守るために">
          <SettingsSafetyCard
            title="おまもりの しくみ"
            intro="ここが いつも やさしい場で あり続けるために、いくつかの 仕組みが 静かに 働いています。"
            items={[
              {
                icon: "shield",
                title: "運営チームの 見守り",
                sub: "気になる投稿や 相談に、人が 目を通しています。",
              },
              {
                icon: "hand",
                title: "そっと ブロックできる",
                sub: "会いたくない 相手とは、いつでも 距離を 取れます。",
              },
              {
                icon: "leaf",
                title: "強い ことばは、その場で 止まる",
                sub: "攻撃的な 表現は、相手に 届く前に 止めています。",
              },
              {
                icon: "lock",
                title: "あなたの 情報は 守られる",
                sub: "個人情報や 大切な情報が、外に 漏れないようにしています。",
              },
            ]}
          />
        </SettingsSection>

        <SettingsSection label="アカウント">
          <ListRow
            href="/me"
            leftIcon={<IconPill icon="profile" tone="terra" />}
            title="プロフィール"
            sub="名前・アバター・自己紹介"
          />
          <ListRow
            href="/find"
            leftIcon={<IconPill icon="flower" tone="moss" />}
            title="案内（性格・暮らしのリズム）"
            sub="お隣さがしを、より近づけるために"
          />
        </SettingsSection>

        <SettingsSection label="お便り">
          <ListRow
            href="/settings/notify-types"
            leftIcon={<IconPill icon="bell" tone="plum" />}
            title="お便りを受け取る"
            sub="そっと届く声・反応・お隣さん"
            right={<Toggle on={notify} onChange={setNotify} label="お便りを受け取る" />}
          />
          <ListRow
            href="/settings/quiet-hours"
            leftIcon={<IconPill icon="moon" tone="plum" />}
            title="夜は、静かにする"
            sub="22:00 〜 7:00 は通知をオフにする"
            right={<Toggle on={quietNight} onChange={setQuietNight} label="夜は静かにする" />}
          />
        </SettingsSection>

        <SettingsSection label="あなたを守る設定">
          <ListRow
            href="/settings/voice-visibility"
            leftIcon={<IconPill icon="lock" tone="terra" />}
            title="声のデフォルト公開"
            sub="みんな / お隣さんだけ / しずか"
            right={<Chip tone="terra">みんな</Chip>}
          />
          <ListRow
            href="/settings/private-search"
            leftIcon={<IconPill icon="search" tone="moss" />}
            title="検索されないようにする"
            sub="名前で探されても、出てこなくなる"
            right={<Toggle on={hideFromSearch} onChange={setHideFromSearch} label="検索されないようにする" />}
          />
          <ListRow
            href="/settings/blocked"
            leftIcon={<IconPill icon="shield" tone="plum" />}
            title="ブロックしている お隣さん"
            sub="今 2 人"
          />
        </SettingsSection>

        <SettingsSection label="記録について">
          <ListRow
            href="/me/voices"
            leftIcon={<IconPill icon="whisper" tone="moss" />}
            title="記録を振り返る"
            sub="これまでの声を、そっと見返す"
          />
          <ListRow
            href="/settings/medical-records"
            leftIcon={<IconPill icon="mic" tone="terra" />}
            title="診察の記録（便利機能）"
            sub="声で簡単に記録できる"
          />
        </SettingsSection>

        <SettingsSection label="困ったとき">
          <ListRow
            href="/settings/help"
            leftIcon={<IconPill icon="chat" tone="plum" />}
            title="ヘルプ・お問い合わせ"
          />
          <ListRow
            href="/hotline"
            leftIcon={<IconPill icon="heart" tone="gold" />}
            title="ホットライン"
            sub="よりそいホットライン・いのちの電話 ほか"
          />
        </SettingsSection>

        <p className="app-footer-credit">
          よりそい つながる v0.1.0
          <br />
          © 2026 medicanvas
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <button type="button" className="btn btn--ghost btn--sm">
            ログアウト
          </button>
        </div>
      </main>

      <BottomNav active="profile" />
    </>
  );
}
