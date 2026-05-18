import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type ListRowProps = {
  /** 行クリック時の遷移先 */
  href?: string;
  /** 左のアイコン（icon-pill の中に置く SVG） */
  leftIcon?: ReactNode;
  title: string;
  sub?: string;
  /** 右端のインタラクティブ要素（Toggle / Chip 等）。
   *  渡された場合、行はテキスト部分(Link/button)と右側(Toggle 等)を分離して
   *  <button> ネストを避ける構造になる。 */
  right?: ReactNode;
  /** chevron を表示するか（href があるとき自動 true） */
  showChevron?: boolean;
  onClick?: () => void;
};

/**
 * 設定画面・プロフィールで使う共通のリスト行。
 *
 * 構造のキモ：
 * - right が無ければ Link or button をそのまま `.list-row` に使う
 * - right がある場合は、左テキスト側(Link/button)と右側(Toggle 等)を分離。
 *   Toggle は内部で <button> なので、外側を <button> にしてしまうと
 *   button ネスト → 一部ブラウザで Toggle が下に押し出される事象が再現する。
 *   そのため right がある時の外枠は <div>。
 */
export function ListRow({
  href,
  leftIcon,
  title,
  sub,
  right,
  showChevron,
  onClick,
}: ListRowProps) {
  const shouldShowChevron = right === undefined && (showChevron ?? !!href);

  const textPart = (
    <>
      {leftIcon}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="list-row__title">{title}</div>
        {sub && <div className="list-row__sub">{sub}</div>}
      </div>
      {shouldShowChevron && (
        <span className="list-row__chevron">
          <Icon name="chevronRight" />
        </span>
      )}
    </>
  );

  // 右に Toggle/Chip 等のインタラクティブ要素がある場合
  if (right !== undefined) {
    const main = href ? (
      <Link href={href} className="list-row__main">
        {textPart}
      </Link>
    ) : (
      <button type="button" className="list-row__main" onClick={onClick}>
        {textPart}
      </button>
    );
    return (
      <div className="list-row list-row--with-action">
        {main}
        <div className="list-row__action">{right}</div>
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href} className="list-row">
        {textPart}
      </Link>
    );
  }

  return (
    <button type="button" className="list-row" onClick={onClick}>
      {textPart}
    </button>
  );
}
