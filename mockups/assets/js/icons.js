/* よりそい つながる — SVGアイコン辞書
 * 使い方: <span data-icon="home"></span>  → JSが置換
 * すべて currentColor で色追従。手描き感のあるラウンドラインで統一。
 */

window.ICONS = {

  // ナビ系
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 11.5 12 4l9 7.5"/>
    <path d="M5 10v9.5a.5.5 0 0 0 .5.5H9v-5.5h6V20h3.5a.5.5 0 0 0 .5-.5V10"/>
    <circle cx="12" cy="6.5" r="0.8" fill="currentColor"/>
  </svg>`,

  stroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21c-3-3-7-6-7-11a7 7 0 0 1 14 0c0 5-4 8-7 11Z"/>
    <path d="M12 15c-2-2 0-5 2-5"/>
    <path d="M9 10c1-1 3-1 4 0"/>
  </svg>`,

  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>`,

  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 7c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"/>
    <path d="m4 8 8 5 8-5"/>
    <circle cx="18" cy="6" r="2.5" fill="var(--peach-400, #FF8E70)" stroke="none"/>
  </svg>`,

  profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="9" r="4"/>
    <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/>
    <path d="M7 7c0-1 .5-1.5 1.5-1.5" opacity="0.6"/>
  </svg>`,

  // 操作系
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <path d="M6 6l12 12M18 6l-12 12"/>
  </svg>`,

  more: `<svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.6"/>
    <circle cx="12" cy="12" r="1.6"/>
    <circle cx="19" cy="12" r="1.6"/>
  </svg>`,

  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="6"/>
    <path d="m20 20-4.5-4.5"/>
  </svg>`,

  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 17V11a6 6 0 1 1 12 0v6"/>
    <path d="M4 17h16"/>
    <path d="M10 20a2 2 0 0 0 4 0"/>
  </svg>`,

  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 17l-2 3V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5Z"/>
  </svg>`,

  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3"/>
    <circle cx="9" cy="11" r="2"/>
    <path d="m3 17 5-4 4 3 4-5 5 6"/>
  </svg>`,

  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 2 11 13"/>
    <path d="M22 2l-7 20-4-9-9-4Z"/>
  </svg>`,

  bookmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 4h12v17l-6-4-6 4Z"/>
  </svg>`,

  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4"/>
  </svg>`,

  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 6l6 6-6 6"/>
  </svg>`,

  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12l5 5L20 7"/>
  </svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>`,

  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="11" width="14" height="10" rx="3"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
  </svg>`,

  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20S4 14.5 4 9a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 5.5-8 11-8 11Z"/>
  </svg>`,

  // 装飾・特別
  whisper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 12c2-4 6-6 10-5 4 1 5 5 1 8-3 2-7 2-9 1l-3 3 1-7Z"/>
    <circle cx="11" cy="12" r="0.8" fill="currentColor"/>
    <circle cx="15" cy="11" r="0.8" fill="currentColor"/>
  </svg>`,

  sparkle: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 13.5 9 21 10.5 13.5 12 12 19 10.5 12 3 10.5 10.5 9Z"/>
    <circle cx="19" cy="4" r="1.2"/>
    <circle cx="5" cy="19" r="1"/>
  </svg>`,

  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/>
  </svg>`,

  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 20c10-2 14-8 16-16-8 0-14 4-16 12 0 0-1 4 0 4Z"/>
    <path d="M4 20c4-6 8-10 14-12"/>
  </svg>`,

  flower: `<svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="2.5"/>
    <ellipse cx="12" cy="6" rx="2.5" ry="3.5" opacity="0.85"/>
    <ellipse cx="12" cy="18" rx="2.5" ry="3.5" opacity="0.85"/>
    <ellipse cx="6" cy="12" rx="3.5" ry="2.5" opacity="0.85"/>
    <ellipse cx="18" cy="12" rx="3.5" ry="2.5" opacity="0.85"/>
  </svg>`,

  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="3" width="6" height="12" rx="3"/>
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
  </svg>`,

  knock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M9 11h.01M15 11h.01"/>
    <path d="M9 16c1 1 4 1 6 0"/>
  </svg>`,

  // 共感スタンプ用（絵文字主体だがフォールバック）
  reaction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M9 14c.5.8 1.5 1.5 3 1.5s2.5-.7 3-1.5"/>
    <circle cx="9" cy="10" r="0.8" fill="currentColor"/>
    <circle cx="15" cy="10" r="0.8" fill="currentColor"/>
  </svg>`,

};

// DOM置換
function renderIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    if (window.ICONS[name]) {
      el.innerHTML = window.ICONS[name];
      // class追加：すべてのSVGに統一クラスを付ける（display: blockなど制御用）
      const svg = el.querySelector('svg');
      if (svg && !svg.getAttribute('class')) {
        svg.setAttribute('class', 'i-svg');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => renderIcons());
