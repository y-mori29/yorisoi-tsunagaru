/**
 * 通知バッジ（小さな terra のドット）。bell アイコンの右上に重ねるなど。
 */
export function DotBadge({ className = "" }: { className?: string }) {
  return <span className={`dot-badge ${className}`.trim()} aria-label="未読あり" />;
}
