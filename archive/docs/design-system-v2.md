# 「よりそい つながる」デザインシステム v2（大人版）

作成日: 2026-05-16
位置づけ: v1 (`design-system-tsunagaru.md`) を **大人の患者向けに全面改訂** したもの。今後のモック制作はこの v2 に従う。

---

## 0. v1からの方針転換

| 項目 | v1（破棄） | v2（採用） |
|---|---|---|
| 文体 | ひらがな多用「いまの きもち、ここに そっと 置いてみる？」 | **ハイブリッド**：ナビ＝標準語、コア体験語のみ独自語＋漢字バランス |
| マスコット | 絵本タッチ・擬人化動物4種・大きな顔・パステル | **静かなライン画／ミニマルシルエット**・存在感を抑える |
| カラー | 高彩度パステル（ピーチ・抹茶・ラベンダー） | **彩度を1段落とした成熟トーン**（テラコッタ・モス・グレイッシュパープル） |
| アイコン | 絵文字（🌸🐰🍵）＋手書きSVG混在 | **統一線画アイコン**（Gemini CLI生成＋SVGブラッシュアップ） |
| 全体印象 | 童話・絵本・子供向け | **静かなカフェ・整った診療所の待合室・大人の安らぎ** |
| 文末 | 「〜だよ」「〜してね」 | 「〜です」「〜ます」を基調、押し付けない言い切り |

**変更の理由**：
ユーザーは自分の体・病気・人生に責任を持つ大人の患者。「優しさ」を演出しようとして子供扱いになると逆効果＝**裏切り**になる。
信頼・温かさは、敬意のある言葉と整ったデザインから生まれる。

---

## 1. カラーパレット v2

### 1-1. CSS Variables（彩度を落とし、ややくすみ寄りに）

```css
:root {
  /* ベース：紙のような自然白・暖色オフホワイト */
  --bg-paper:        #FAF6EE;  /* メイン背景・無垢のような紙の色 */
  --bg-soft:         #F3EDE2;  /* セクション区切り・少し沈んだ紙 */
  --bg-card:         #FFFDF8;  /* カード背景・わずかにクリーム */
  --bg-overlay:      rgba(250, 246, 238, 0.92); /* モーダル・ヘッダー背景 */

  /* プライマリ：くすみテラコッタ（旧ピーチの大人化） */
  --terra-50:        #F8EFE7;
  --terra-100:       #EFDCC9;
  --terra-200:       #E0C2A5;
  --terra-300:       #C99F7B;
  --terra-500:       #A47556;   /* 主要アクセント・ボタン */
  --terra-700:       #7E5A40;   /* テキスト用テラコッタ */

  /* セカンダリ：モスグリーン（旧抹茶クリームの大人化） */
  --moss-50:         #EFF1E6;
  --moss-100:        #DCE0C8;
  --moss-200:        #C0C6A1;
  --moss-300:        #A2AB7D;
  --moss-500:        #757F55;
  --moss-700:        #545C3C;

  /* アクセント：グレイッシュパープル（旧ラベンダーの大人化） */
  --plum-50:         #ECE7EC;
  --plum-100:        #D8CFD9;
  --plum-200:        #BAACBC;
  --plum-400:        #8E7E92;
  --plum-600:        #6A5C6E;

  /* 控えめなゴールド（特別なお知らせのみ・最小限） */
  --gold-400:        #C9A961;
  --gold-600:        #8C7239;

  /* テキスト：暖色グレー（より深く） */
  --ink-900:         #2A2622;   /* 本文・見出し・濃いめ */
  --ink-700:         #4F4843;   /* 強調しない本文 */
  --ink-500:         #7A7068;   /* キャプション */
  --ink-300:         #B0A89F;   /* 補助情報 */
  --ink-on-color:    #FAF6EE;   /* ボタン上文字 */

  /* セマンティック（赤・原色青を避ける） */
  --hint-success:    #6E8856;   /* 成功 */
  --hint-warning:    #B0833D;   /* 注意 */
  --hint-quiet:      #7B8896;   /* 情報・控えめ */

  /* ボーダー（極力使わない・余白で区切る） */
  --line-soft:       #ECE2D2;
  --line-medium:     #D6C8B2;

  /* シャドウ（より控えめに） */
  --shadow-card:     0 2px 8px rgba(74, 56, 38, 0.06),
                     0 8px 24px rgba(74, 56, 38, 0.04);
  --shadow-floating: 0 4px 12px rgba(74, 56, 38, 0.08),
                     0 16px 40px rgba(74, 56, 38, 0.08);
  --shadow-glow:     0 0 0 1px rgba(164, 117, 86, 0.06),
                     0 12px 32px rgba(164, 117, 86, 0.10);

  /* ラディアス：少し抑える（角丸を控えめに） */
  --radius-sm:       6px;
  --radius-md:       12px;
  --radius-lg:       18px;
  --radius-xl:       28px;
  --radius-pill:     999px;

  /* タイポ */
  --font-jp:         "Yu Gothic", "游ゴシック", "ヒラギノ角ゴ Pro",
                     "Hiragino Kaku Gothic Pro", "Noto Sans JP", sans-serif;
  --font-jp-mincho:  "Yu Mincho", "游明朝", "ヒラギノ明朝 Pro",
                     "Hiragino Mincho Pro", "Noto Serif JP", serif;
  --font-num:        "Inter", "SF Pro Text", sans-serif;

  /* モーション：より静かに */
  --ease-soft:       cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-spring:     cubic-bezier(0.34, 1.2, 0.64, 1);
  --duration:        260ms;

  /* レイアウト */
  --max-width:       480px;
  --safe-bottom:     env(safe-area-inset-bottom, 0);
  --nav-height:      64px;
}
```

### 1-2. 配色原則
- **白に近いベース**は使わない。`--bg-paper` (#FAF6EE) を基本
- **赤・原色青・ネオン色は禁止**
- グラデーションは **terra → moss** または **terra → plum** の **隣接トーン** で。コントラスト大きい組み合わせは使わない
- 一画面のアクセント色は **1つ**（主にterra）に絞る。複数色がぶつかると安っぽくなる

---

## 2. タイポグラフィ v2

### 2-1. フォントスタック
- **本文：游ゴシック（Yu Gothic）** をベース。Noto Sans JPはフォールバック
- 見出し：状況に応じて **游明朝（Yu Mincho）** を選択肢に。落ち着きが出る場合に使う
- 角丸ゴシック（Zen Maru Gothic）は **使わない**（子供っぽく見える原因）

### 2-2. スケール（行間広めで余白を作る）
```css
.text-hero      { font: 500 28px/1.5 var(--font-jp); letter-spacing: 0.02em; }
.text-h1        { font: 500 22px/1.55 var(--font-jp); letter-spacing: 0.02em; }
.text-h2        { font: 500 18px/1.6 var(--font-jp); }
.text-h3        { font: 500 16px/1.6 var(--font-jp); }
.text-body      { font: 400 15px/1.85 var(--font-jp); letter-spacing: 0.02em; }
.text-body-lg   { font: 400 16px/1.9 var(--font-jp); letter-spacing: 0.02em; }
.text-caption   { font: 400 12px/1.6 var(--font-jp); color: var(--ink-500); }
.text-num       { font-family: var(--font-num); font-variant-numeric: tabular-nums; }

/* 詩的な見出しに限定して使う */
.text-mincho    { font: 400 22px/1.7 var(--font-jp-mincho); letter-spacing: 0.04em; }
```

### 2-3. 太字運用
- 太字は **W500 まで**。W700以上は使わない（圧が出る）
- **絶対に W900 (Black) は使わない**

---

## 3. 文言ルール v2（ハイブリッド）

### 3-1. ナビ・標準操作 → 標準語

| v1（廃止） | v2 |
|---|---|
| おうち | **ホーム** |
| おさんぽ | **めぐる** |
| おたより | **お知らせ** |
| わたし | **プロフィール** |
| いろいろ | **設定** |
| こえを置く | **声を残す**（投稿） |
| となりさがし | **似た人を探す** |

### 3-2. コア体験語 → 残す（漢字込み）

差別化の核なので残す。ただし漢字を使い、大人語に。

| v1（ひらがな） | v2 |
|---|---|
| こえ | **声** |
| そっと届く声 | **そっと届く声**（そのまま・印象的） |
| となりさん | **となり** or **となりの人**（要議論） |
| きょうのきざし | **今日のひとこと** or **今日の問いかけ** |
| しずか（自分だけ公開） | **しずか**（残す） |
| おう・そっか・きいたよ・だいじょうぶ・ありがと（リアクション） | **そう／わかる／読んだよ／気にかけてる／ありがとう**（敬意のある共感語） |

### 3-3. UI文言の書き換え例

| v1 | v2 |
|---|---|
| よく きてくれたね | **ようこそ、よりそい つながるへ。** |
| なんて よばれたい？ | **どのように呼ばれたいですか？** |
| いまの きもち、ここに そっと 置いてみる？ | **今日の声を、そっと残せる場所です。** |
| よかったら すこしだけ おしえて | **よかったら、少しだけ教えてください。** |
| さいごに、ひとこと だけ | **最後に、ひとことだけ。** |
| あなたの すがたを えらんでね | **あなたの姿を選んでください。** |
| そっと とどける | **そっと届ける** |
| そっと とじる | **そっと閉じる** |
| あとで | **あとで** or **スキップ** |

### 3-4. トーン原則
- **常体（だ・である）は使わない**
- **敬体（です・ます）を基本**
- **過剰な「〜ですね」「〜してみませんか？」を避ける**：押し付けに聞こえる
- **言い切り or 提示型**：「ここに、あります」「これが、わたしです」
- **読点（、）を多めに**：呼吸を作る

---

## 4. アイコン・ビジュアル要素 v2

### 4-1. アイコン仕様

- **線画ベース**（線幅 1.5px・ラウンドキャップ）
- **色は単色**：基本は `var(--ink-700)`、アクティブ時は `var(--terra-500)`
- **塗りベタは禁止**
- **角を完全に鋭くしない**（ラウンドジョイン）
- サイズ：18 / 22 / 24 / 32px

**生成方針**：
- Gemini CLI / nano BANANA 2 で **線画スタイルのアイコンセット** を生成（透過PNG）
- ナビ系（ホーム・通知・投稿・プロフィール・設定）など基幹アイコンは生成PNGを試す
- 万一品質が UI 用途として不足なら、既存の手描きSVG（icons.js）をv2スタイルにブラッシュアップして併用
- **どちらにせよ「絵文字」は全廃**

### 4-2. 装飾・背景画像

- **大きなパターン背景・装飾レイヤーは使わない**（疲れさせる）
- カードや画面の隅にちょっとした **線画の植物の枝** や **柔らかい光のグラデ円** を控えめに置く程度
- ヒーローセクションは **Codex CLI で高品質メイン画像** を1枚生成して、画面の温度を決める

### 4-3. マスコット

- 絵本タッチを廃止
- **静かなシルエット or ミニマルなライン画** で4キャラを再構築
- 顔の表情はほぼ無表情（穏やか）に近い
- 線画＋淡い水彩シャドウ程度。塗り絵的に色を入れない
- **画面の脇役** に徹する（ヒーロー・空状態・特定通知に限定）

---

## 5. コンポーネント仕様 v2

### 5-1. ボタン

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-pill);
  font: 500 15px/1 var(--font-jp);
  letter-spacing: 0.04em;
  text-align: center;
  transition: all var(--duration) var(--ease-soft);
  white-space: nowrap;
  user-select: none;
  border: none;
  cursor: pointer;
}
.btn--primary {
  background: var(--terra-500);
  color: var(--ink-on-color);
}
.btn--primary:hover {
  background: var(--terra-700);
}
.btn--secondary {
  background: var(--bg-card);
  color: var(--terra-700);
  border: 1px solid var(--line-medium);
}
.btn--ghost {
  background: transparent;
  color: var(--ink-500);
}
.btn--quiet {
  background: var(--bg-soft);
  color: var(--ink-700);
}
```

- グラデは原則使わない。単色ベタで品よく
- ホバーで色を1段濃くするだけ
- 押下アニメは scale でなく、shadowを軽く沈める程度

### 5-2. カード

```css
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
  box-shadow: var(--shadow-card);
}
.voice-card {
  /* 同上 + 行間広く */
  padding: 22px 24px;
}
.voice-card__body {
  font: 400 16px/1.95 var(--font-jp);
  letter-spacing: 0.02em;
  color: var(--ink-900);
}
```

- 影は **ほぼ感じない程度** に控える
- 角丸は v1 の 24px から **18px** へ落とす（少し角張った大人の佇まい）

### 5-3. 入力

```css
.input, .textarea {
  width: 100%;
  background: var(--bg-soft);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: 14px 16px;
  font: 400 16px/1.7 var(--font-jp);
  color: var(--ink-900);
  outline: none;
  transition: border-color var(--duration) var(--ease-soft);
}
.input:focus, .textarea:focus {
  border-color: var(--terra-300);
  background: var(--bg-card);
}
```

### 5-4. アバター

- **円形**は維持
- **glow は廃止 or 極小化**（v1で派手すぎ）
- 周囲を細い線で囲うだけ
- ユーザーアバターは Gemini で生成した **静かな動物ライン画** をプリセット

### 5-5. リアクション

```
そう（共感）／わかる（共感）／読んだよ（既読）／気にかけてる（心配）／ありがとう（感謝）
```

- アイコンは **線画＋単色**（絵文字使わず）
- 押すと色が `--terra-500` に変化
- 数字は **本人だけに通知**（他人からは見えない・GRAVITY継承）

---

## 6. レイアウト原則 v2

- **情報密度は低く保つ**：1画面で見るカード数 = 3〜5枚程度を目安
- **左右余白は16px → 24px に広げる**（より静か）
- **セクション間の余白は 32〜40px**
- 「ヒーロー・カード・余白」の **3つの体積バランス** を意識
- **ヒーロー画像があるときは、その下のテキスト・カードは色味を抑える**（画像の主役性を尊重）

---

## 7. 廃止・削除する v1要素

- `.text-hero` の Zen Maru Gothic 指定 → 游ゴシック / 游明朝へ
- `.fab-center` のグラデ + アニメ（脈打つ・glow） → **単色ボタン + わずかな影** に
- `.breathing` アニメ全般 → **ヒーロー位置のマスコットだけに限定**、他の場所では使わない
- `.floating-leaves` （ふわっと飛ぶ葉っぱドット）→ **削除**（やりすぎ）
- `.bg-pattern` の派手な radial-gradient → より控えめに

---

## 8. 「子供っぽさ」NGリスト（モック制作・画像生成共通）

- 大きな目のキャラ
- パステル原色を平塗りした背景
- 「〜だよ♪」「〜してね♡」のような語尾
- 絵文字の多用
- 角丸が大きすぎるカード（24px超）
- ふわふわ系のフォント（丸ゴシック太字）
- バブル・吹き出し・⭐︎などの装飾
- 漫画的なふきだし・効果線
- パーティクル・キラキラエフェクト

---

## 9. ファイル構造

```
mockups/
├── assets/
│   ├── css/
│   │   ├── style-v2.css         ← v2: 新カラー変数・グローバル・ナビ
│   │   ├── components-v2.css    ← v2: ボタン・カード・入力
│   │   ├── style.css            ← v1: 旧（参考用に残す・最終的に削除）
│   │   └── components.css       ← v1: 旧
│   ├── js/icons.js              ← v2でブラッシュアップ
│   └── icons/                   ← Geminiで生成したPNGアイコン置き場
└── *.html                       ← v2ベースで書き直し
```

v1のCSSは削除せず、最終的に v2 完成後に整理する。

---

## 10. 移行の手順

1. ✅ このドキュメント（design-system-v2.md）作成
2. ⏳ `style-v2.css` + `components-v2.css` 作成
3. ⏳ Gemini CLI で新マスコット4種＋基幹アイコンセット生成
4. ⏳ 代表2画面（onboarding + home）を v2 で書き直し → ユーザー確認
5. ⏳ 残り8画面を v2 で展開
6. ⏳ v1ファイルを削除して整理
