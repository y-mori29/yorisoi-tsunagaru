import type { ReactNode } from "react";

type WhisperCardProps = {
  label?: string;
  body: string;
  /** 残り時間表示 (例: "あと 21時間") */
  timer?: string;
  /** 末尾の小さな差出人ライン (例: <Avatar /> + "あるお隣さん") */
  from?: ReactNode;
  children?: ReactNode;
};

/**
 * そっと届く声 — お手紙カード。
 * 左に plum-200 のアクセントライン、明朝体の本文、右上に残り時間表示。
 */
export function WhisperCard({ label = "届いた声", body, timer, from, children }: WhisperCardProps) {
  return (
    <article className="whisper-card">
      {timer && <span className="whisper-card__timer">{timer}</span>}
      <span className="whisper-card__label">{label}</span>
      <p className="whisper-card__body">{body}</p>
      {from && <div className="whisper-card__from" style={{ display: "flex", alignItems: "center", gap: 8 }}>{from}</div>}
      {children}
    </article>
  );
}
