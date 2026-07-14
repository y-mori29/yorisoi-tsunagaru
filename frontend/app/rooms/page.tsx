"use client";

import { use } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";
import { getRooms } from "@/lib/api/rooms";
import { getHealthRecommendation } from "@/lib/onboarding/recommendations";
import { useStoredHealthContext } from "@/lib/onboarding/useStoredHealthContext";
import type { Room, RoomKind } from "@/lib/api/types";

const KIND_LABEL: Record<RoomKind, string> = {
  disease: "病気",
  symptom: "症状",
  concern: "悩み",
  medication: "薬",
  treatment: "治療",
};

const ROOM_MOVEMENT: Record<string, string> = {
  "room-uc": "通院前の不安に、読んだよが届いています",
  "room-crohn": "食事の工夫を、そっと見にくる人がいます",
  "room-mg": "仕事中の見えづらさを話す声があります",
  "room-sle": "疲れやすさと日差しの話を読めます",
  "room-ra": "朝のこわばりと家事の工夫が残っています",
  "room-t1d": "学校生活を支える声があります",
  "room-fabry": "診断までの迷いを読めます",
  "room-pd": "外出の不安と患者会の声があります",
  "room-cancer": "周りに話しづらい不安を置けます",
  "room-treatment": "治療の日の過ごし方が集まっています",
  "room-work-school": "伝えるか迷う気持ちを読めます",
  "room-food": "食べられる日の工夫を置けます",
};

export default function RoomsPage() {
  const allRooms = use(getRooms());
  const { healthContext } = useStoredHealthContext();
  const healthRecommendation = getHealthRecommendation(healthContext);
  const diseases = allRooms.filter((room) => room.kind === "disease");
  const symptoms = allRooms.filter((room) => room.kind === "symptom");
  const concerns = allRooms.filter((room) => room.kind === "concern" || room.kind === "treatment");
  const suggested = healthRecommendation.roomIds
    .map((roomId) => allRooms.find((room) => room.id === roomId))
    .filter(Boolean)
    .slice(0, 5) as Room[];

  return (
    <>
      <main className="explore-shell rooms-explore-shell">
        <header className="find-header">
          <BackButton fallbackHref="/home" />
          <h1>テーマ</h1>
          <Link href="/find" className="explore-icon-btn" aria-label="探す">
            <Icon name="search" size={18} />
          </Link>
        </header>

        <section className="rooms-hero" aria-labelledby="rooms-title">
          <p>テーマから読む</p>
          <h2 id="rooms-title">同じ病気、症状、悩みの声をゆっくり読めます</h2>
          <span>
            登録しなくても読めます。近いと思ったテーマから、声をたどれます。
          </span>
        </section>

        <section className="rooms-guide" aria-label="テーマでできること">
          <div>
            <Icon name="whisper" size={17} />
            <strong>読む</strong>
            <span>近い体験談を読む</span>
          </div>
          <div>
            <Icon name="search" size={17} />
            <strong>絞る</strong>
            <span>テーマで声を絞り込む</span>
          </div>
          <div>
            <Icon name="plus" size={17} />
            <strong>置く</strong>
            <span>書ける日に吐き出す</span>
          </div>
        </section>

        <section className="rooms-personal-note" aria-label="近いテーマの案内">
          <Icon name="leaf" size={17} />
          <span>{healthRecommendation.roomsLead}</span>
          <Link href="/onboarding/condition">変更する</Link>
        </section>

        <Section title={healthRecommendation.roomsTitle} rooms={suggested} compact personal />
        <Section id="disease" title="病気から探す" empty="病気のテーマはまだありません。" rooms={diseases} />
        <Section id="symptom" title="症状から探す" empty="症状のテーマはまだありません。" rooms={symptoms} />
        <Section id="concern" title="悩みから探す" empty="悩みのテーマはまだありません。" rooms={concerns} />
      </main>

      <BottomNav active="stroll" />
    </>
  );
}

function Section({
  title,
  empty,
  rooms,
  compact = false,
  personal = false,
  id,
}: {
  title: string;
  empty?: string;
  rooms: Room[];
  compact?: boolean;
  personal?: boolean;
  id?: string;
}) {
  return (
    <section className="rooms-section" id={id}>
      <div className="rooms-section__head">
        <h2>{title}</h2>
        {!compact && <Link href="/find">探す</Link>}
      </div>
      {rooms.length === 0 ? (
        <p className="rooms-empty">{empty}</p>
      ) : (
        <ul className={`rooms-list ${compact ? "rooms-list--compact" : ""}`.trim()}>
          {rooms.map((room) => (
            <RoomRow key={room.id} room={room} personal={personal} />
          ))}
        </ul>
      )}
    </section>
  );
}

function RoomRow({ room, personal }: { room: Room; personal?: boolean }) {
  return (
    <li>
      <Link href={`/rooms/${room.id}`} className={`rooms-row rooms-row--${room.tone}`}>
        <span className="rooms-row__icon" aria-hidden="true">
          <Icon name={kindToIcon(room.kind)} size={20} />
        </span>
        <span className="rooms-row__body">
          <span className="rooms-row__titleline">
            <strong>{room.name}</strong>
            <em>{KIND_LABEL[room.kind]}</em>
            {personal && <small>近いかも</small>}
            {room.quiet && <small>しずか</small>}
          </span>
          <span className="rooms-row__description">{room.description}</span>
          <span className="rooms-row__movement">
            <Icon name="whisper" size={13} />
            {ROOM_MOVEMENT[room.id] ?? "近い声をゆっくり読めます"}
          </span>
        </span>
        <Icon name="chevronRight" size={19} />
      </Link>
    </li>
  );
}

function kindToIcon(kind: RoomKind): "leaf" | "flower" | "shield" | "heart" | "whisper" {
  switch (kind) {
    case "disease":
      return "leaf";
    case "symptom":
      return "whisper";
    case "concern":
      return "heart";
    case "medication":
      return "flower";
    case "treatment":
      return "shield";
  }
}
