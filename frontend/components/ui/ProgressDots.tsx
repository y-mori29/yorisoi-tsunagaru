type ProgressDotsProps = {
  total: number;
  current: number; // 0-indexed
  className?: string;
};

/**
 * オンボのステップ進捗ドット。active な 1 つは細長い rectangle になる。
 */
export function ProgressDots({ total, current, className = "" }: ProgressDotsProps) {
  return (
    <div className={`progress-dots ${className}`.trim()} aria-label={`ステップ ${current + 1} / ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`progress-dots__dot ${i === current ? "is-active" : ""}`.trim()}
        />
      ))}
    </div>
  );
}
