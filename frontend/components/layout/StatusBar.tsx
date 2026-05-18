/**
 * iOS ステータスバー（静的）。
 * 9:41 + signal + WiFi + battery。
 * SVG は iOS 風の細線シンボル。
 */
export function StatusBar() {
  return (
    <div className="status-bar" role="presentation">
      <span className="status-bar__time">9:41</span>
      <div className="status-bar__indicators" aria-hidden="true">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function SignalIcon() {
  // 4 本のバー、左から低 → 高
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" className="status-bar__signal">
      <rect x="0" y="8" width="3" height="4" rx="0.5" />
      <rect x="5" y="6" width="3" height="6" rx="0.5" />
      <rect x="10" y="3" width="3" height="9" rx="0.5" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="status-bar__wifi">
      <path d="M1.5 4.5C3.5 2.5 5.5 1.5 8 1.5s4.5 1 6.5 3" />
      <path d="M3.5 7C5 5.5 6.5 5 8 5s3 .5 4.5 2" />
      <path d="M5.5 9.5c.7-.7 1.5-1 2.5-1s1.8.3 2.5 1" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1" className="status-bar__battery">
      <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" />
      <rect x="2" y="2" width="13" height="8" rx="1" fill="currentColor" stroke="none" />
      <rect x="23" y="4" width="2" height="4" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
