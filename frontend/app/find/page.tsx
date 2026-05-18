"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar } from "@/components/ui/Avatar";
import { DividerLabel } from "@/components/layout/DividerLabel";
import { QuestionCard } from "@/components/screens/find/QuestionCard";
import { MatchRow } from "@/components/screens/find/MatchRow";

/**
 * お隣さがし — output_v02/06-neighbor-search.png を踏襲。
 * - 3 つの質問だけ（やさしい問い合わせ）
 * - 質問カード 2 枚 + マッチ候補 3 件
 * - 「ノックする」は控えめなテラ色
 */
export default function FindPage() {
  const [q1, setQ1] = useState<number | null>(0);
  const [q2, setQ2] = useState<number | null>(1);
  const [q3, setQ3] = useState<number | null>(null);

  return (
    <>
      <AppHeader
        title="お隣さがし"
        left={<IconButton icon="back" label="戻る" />}
      />

      <main className="app-main">
        <div className="intro-card">
          <Avatar animal="rabbit" src="/assets/animals/rabbit.png" tone="terra" size={40} alt="お隣さがしの案内役" />
          <div className="intro-card__text">
            <div className="intro-card__title">3 つの質問だけ</div>
            <div className="intro-card__sub">
              ご病気のこと・生活のリズム・考え方の癖。<br />
              3 つの軸から、お隣さんを そっと さがします。
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
          <QuestionCard
            step="1 / 3"
            title="しんどい日は、どうしたいですか。"
            options={[
              "誰とも話さず、静かに過ごしたい",
              "誰かと、少しだけ話したい",
              "同じ気持ちの人を、読みたい",
              "散歩に出たい",
            ]}
            selectedIndex={q1}
            onSelect={setQ1}
          />

          <QuestionCard
            step="2 / 3"
            title="一日のなかで、動きやすい時間は？"
            options={[
              "朝、動きやすい",
              "夜、動きやすい",
              "日によって、変わる",
            ]}
            selectedIndex={q2}
            onSelect={setQ2}
          />

          <QuestionCard
            step="3 / 3"
            title="今、いちばん 求めたいことは？"
            options={[
              "同じ病気の方と、ことばを 交わしたい",
              "似た 生活リズムの方と、つながりたい",
              "考え方が 近い方と、ゆっくり 話したい",
              "決めずに、ふらっと 出会いたい",
            ]}
            selectedIndex={q3}
            onSelect={setQ3}
          />
        </div>

        <DividerLabel>あなたのお隣さん候補</DividerLabel>
        <p style={{
          font: "400 12px/1.6 var(--font-jp)",
          color: "var(--color-ink-500)",
          textAlign: "center",
          marginTop: -8,
          marginBottom: 16,
        }}>
          考え方が近い 3 人を 見つけました
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <MatchRow
            name="こもれび"
            animal="fox"
            avatarSrc="/assets/animals/fox.png"
            avatarTone="terra"
            attrs="SLE ルーム ・ 夜型 ・ しずか派"
          />
          <MatchRow
            name="そらまめ"
            animal="bird"
            avatarSrc="/assets/animals/bird.png"
            avatarTone="moss"
            attrs="UC ルーム ・ 朝型 ・ 読む派"
          />
          <MatchRow
            name="ゆっくり"
            animal="turtle"
            avatarSrc="/assets/animals/turtle.png"
            avatarTone="plum"
            attrs="クローン ルーム ・ ペース近い"
          />
        </div>
      </main>

      <BottomNav active={null} />
    </>
  );
}
