/**
 * 区切りラベル（「今日」「昨日」「あなたの案内」など）。
 * 左右に細い線、中央にラベル。
 */
export function DividerLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`divider-label ${className}`.trim()}>{children}</div>;
}
