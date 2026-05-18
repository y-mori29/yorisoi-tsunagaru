/* よりそい つながる — モック共通JS（最小限） */

// 装飾用：背景にふわっと葉っぱを散らす（オプション・data-decorate を持つ要素のみ）
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-decorate="leaves"]').forEach(el => {
    const wrap = document.createElement('div');
    wrap.className = 'floating-leaves';
    wrap.innerHTML = '<span></span><span></span><span></span><span></span><span></span>';
    el.prepend(wrap);
  });
});

// ボトムシートの開閉
function openSheet(id) {
  const sheet = document.getElementById(id);
  if (sheet) sheet.style.display = 'flex';
}
function closeSheet(id) {
  const sheet = document.getElementById(id);
  if (sheet) sheet.style.display = 'none';
}
// オーバーレイ自体のクリックで閉じる
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('sheet-overlay')) {
    e.target.style.display = 'none';
  }
});

// セグメント切替
document.addEventListener('click', (e) => {
  const item = e.target.closest('.segment__item');
  if (item) {
    const parent = item.parentElement;
    parent.querySelectorAll('.segment__item').forEach(i => i.classList.remove('is-active'));
    item.classList.add('is-active');
  }
});

// 簡易トースト（任意・モック用）
function showToast(message, emoji = '🌸') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${emoji}</span><span>${message}</span>`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
