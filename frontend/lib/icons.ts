/**
 * よりそい つながる — SVG アイコン辞書
 * Source: mockups/assets/js/icons-v2.js を React 用にエクスポート
 * 使い方: <Icon name="home" />
 * - 線幅 1.6pt（plus と check のみ 1.8/2 で強調）
 * - 色は currentColor — 親要素の color で制御
 */

export const ICONS = {
  // ナビ
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7v8.5a.5.5 0 0 1-.5.5H15v-5.5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1V20H4.5a.5.5 0 0 1-.5-.5V11Z"/></svg>`,
  stroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M3.5 12h17"/><path d="M5.5 7.5a13 13 0 0 0 13 9M5.5 16.5a13 13 0 0 1 13-9"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 5.5L20 7"/></svg>`,
  profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="3.8"/><path d="M4.5 20c1.4-3.5 4.2-5.2 7.5-5.2s6.1 1.7 7.5 5.2"/></svg>`,

  // 操作
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.5-4.5"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 17V11a6 6 0 1 1 12 0v6"/><path d="M4.5 17h15"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17l-1.5 3V7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5Z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><circle cx="8.5" cy="11" r="1.5"/><path d="m3.5 17 5-4 4 3 4-4 4 4"/></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12 16-8-5.5 16-3-7Z"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 4h11v17l-5.5-3.6L6.5 21Z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.8"/><path d="M12 3v2.4M12 18.6V21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M3 12h2.4M18.6 12H21M5.6 18.4 7.3 16.7M16.7 7.3 18.4 5.6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20S4 14.5 4 9a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 5.5-8 11-8 11Z"/></svg>`,

  // 装飾
  whisper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13c1.5-4 5-6 9-5 3.5 1 5 4 2 7-3 2-7 2-9 1l-2 3 .5-6Z"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c8-1 13-6 15-15-7 0-13 4-15 11 0 0-1 4 0 4Z"/><path d="M5 19c3-5 7-9 13-11"/></svg>`,
  flower: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.4"/><path d="M12 5.5c-1.5 0-2.5 1.4-2.5 3.4 0 1 .5 1.8 1.2 2.3M12 5.5c1.5 0 2.5 1.4 2.5 3.4 0 1-.5 1.8-1.2 2.3"/><path d="M5.5 12c0-1.5 1.4-2.5 3.4-2.5 1 0 1.8.5 2.3 1.2M5.5 12c0 1.5 1.4 2.5 3.4 2.5 1 0 1.8-.5 2.3-1.2"/><path d="M12 18.5c-1.5 0-2.5-1.4-2.5-3.4 0-1 .5-1.8 1.2-2.3M12 18.5c1.5 0 2.5-1.4 2.5-3.4 0-1-.5-1.8-1.2-2.3"/><path d="M18.5 12c0-1.5-1.4-2.5-3.4-2.5-1 0-1.8.5-2.3 1.2M18.5 12c0 1.5-1.4 2.5-3.4 2.5-1 0-1.8-.5-2.3-1.2"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`,
  knock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8 14c1 1.2 2.5 1.8 4 1.8s3-.6 4-1.8"/><circle cx="9" cy="10" r="0.8" fill="currentColor"/><circle cx="15" cy="10" r="0.8" fill="currentColor"/></svg>`,

  // 共感アイコン
  acknowledge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M8 12.5c1 1 2.5 1.5 4 1.5s3-.5 4-1.5"/></svg>`,
  understand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12c2-4 5-6 7-6s5 2 7 6"/><path d="M5 12c2 4 5 6 7 6s5-2 7-6"/><circle cx="12" cy="12" r="2"/></svg>`,
  hand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14V6a1.5 1.5 0 1 1 3 0v6"/><path d="M11 8V4.5a1.5 1.5 0 1 1 3 0V11"/><path d="M14 7.5a1.5 1.5 0 1 1 3 0V13"/><path d="M17 9.5a1.5 1.5 0 1 1 3 0V17a4 4 0 0 1-4 4h-3a4 4 0 0 1-3.5-2L5 14"/></svg>`,
  thanks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21S5 16 5 10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 16 12 21 12 21Z"/><path d="M9.5 11.5c.5.5 1.5.8 2.5.8s2-.3 2.5-.8"/></svg>`,
} as const;

export type IconName = keyof typeof ICONS;

export const ANIMAL_ICONS = {
  rabbit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 13a3.5 3.5 0 0 1 7 0v3.5a3.5 3.5 0 0 1-7 0Z"/><path d="M9 11.5C8 9.5 7.5 7 8.5 4c.5 0 2 1.5 1.8 5.5"/><path d="M15 11.5C16 9.5 16.5 7 15.5 4c-.5 0-2 1.5-1.8 5.5"/><circle cx="10.5" cy="13.5" r="0.7" fill="currentColor"/><circle cx="13.5" cy="13.5" r="0.7" fill="currentColor"/></svg>`,
  bear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13a6 6 0 0 1 12 0v3a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"/><circle cx="7" cy="9" r="2"/><circle cx="17" cy="9" r="2"/><circle cx="10" cy="13.5" r="0.7" fill="currentColor"/><circle cx="14" cy="13.5" r="0.7" fill="currentColor"/><path d="M11 16h2"/></svg>`,
  cat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5v3a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"/><path d="M6.5 11 4.5 5l4 3.5M17.5 11l2-6-4 3.5"/><circle cx="10" cy="14" r="0.7" fill="currentColor"/><circle cx="14" cy="14" r="0.7" fill="currentColor"/><path d="M11 16h2"/></svg>`,
  bird: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13c0-3.5 2.5-6 5-6s5 2.5 5 6v3a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3Z"/><path d="m17 11 3-1-3 3"/><circle cx="14" cy="11" r="0.7" fill="currentColor"/></svg>`,
  hedgehog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16c0-4.5 3-8 7-8s7 3.5 7 8H5Z"/><path d="M7 11l-.5-2M10 9l-.3-2.5M14 9l.3-2.5M17 11l.5-2"/><circle cx="7" cy="15" r="0.6" fill="currentColor"/><path d="M3 15a3 3 0 0 1 3-2"/></svg>`,
  fox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 6 4 5 3-2 3 2 4-5v9a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4Z"/><circle cx="10" cy="13" r="0.7" fill="currentColor"/><circle cx="14" cy="13" r="0.7" fill="currentColor"/><path d="M11 16h2"/></svg>`,
  owl: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11a7 7 0 0 1 14 0v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><circle cx="9" cy="12" r="2.2"/><circle cx="15" cy="12" r="2.2"/><circle cx="9" cy="12" r="0.7" fill="currentColor"/><circle cx="15" cy="12" r="0.7" fill="currentColor"/><path d="m11 14.5 1 1 1-1"/></svg>`,
  turtle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="13" rx="7" ry="5"/><path d="M12 8v10M8 9.5l1.5 7M16 9.5l-1.5 7"/><circle cx="18.5" cy="11" r="1.5"/><path d="M5 16l-1 2M19 16l1 2M7 18l1 1M17 18l-1 1"/></svg>`,
} as const;

export type AnimalName = keyof typeof ANIMAL_ICONS;
