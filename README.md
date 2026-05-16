# よりそい つながる

メディキャンバス案件の新規プロダクト。よりそいブランドの新サービス。
**病気を抱える方が安心して使い、続けたいと思える優しいSNS** を目指す、コミュニティ × 患者記録ハイブリッドアプリ。

> 「よりそい」ブランドを継承しつつ、人と人がゆるく「つながる」場、という意味の名称。既存PHRとは別プロダクト。

---

## クイックスタート

### モックを見る（推奨）

```
mockups/index.html を ブラウザで開く
```

→ 全画面（オンボ・おうち・こえを置く・そっと届く声・おさんぽ・となりさがし・わたし・おたより・いろいろ）に遷移できます。
スマホ実機サイズ（max-width 480px）想定です。

### 設計ドキュメントを読む

| ファイル | 内容 |
|---|---|
| `docs/concept.md` | コンセプト・ミーティング要旨 |
| `docs/value-proposition.md` | 価値の言語化（3層の受益者・課題・解） |
| `docs/community-design.md` | コミュニティ機能の機能設計（画面・データモデル・モデレーション） |
| `docs/visual-direction.md` | ビジュアル方針（色・トーン・キャラ） |
| `docs/design-system-gravity.md` | **GRAVITY のデザインシステム言語化**（モックの設計の元ネタ） |
| `docs/design-system-tsunagaru.md` | **「よりそい つながる」へのデザイン翻訳**（CSS変数・コンポーネント仕様まで） |
| `docs/gravity-research.md` | GRAVITY 徹底分析（約6000字） |
| `docs/gravity-research.xmind` | 上記のマインドマップ |
| `docs/20260516MTG.md` | 5/16(土) 10:00 MTG 議事録（冨澤・森） |

---

## このリポジトリの位置づけ

- 既存の `medicanvas/yorisoi/patient/yorisoi-phr/` とは **別プロダクト**。コードベース・GitHubリポジトリも分けています。
- ゼロベースで設計し直し、UI/UX・ビジュアル（イラスト・キャラクター）・コミュニティ体験を中心に据える。
- 既存PHRが「医療パスポート（医師×患者の記録）」だったのに対し、本プロダクトは「**患者×患者のコミュニティ＋自然に貯まる記録**」が起点。

## コンセプト（一行）

> グラビティのような優しいSNSで、同じ病気の人と気軽につながりながら、診察記録・薬・体調を「気づけば残っている」状態にする

## 2軸の核

1. **コミュニティ（前面）** — グラビティ風の匿名性・優しさ・気軽さ。患者会連携が一次集客導線。
2. **記録（裏でビジネスを支える）** — 製薬企業に提供できる「リアルな患者体験＋診察対話」を、ユーザーの負担を最小化して集める。

5/16 MTGでの合意：**まずコミュニティの最低限の価値を担保するのが先**。記録連携は後フェーズ。

## キャラクター・世界観

| キャラ | 動物 | 役割 | カラー |
|---|---|---|---|
| **もか** | うさぎ 🐰 | メイン・聞き役・案内役 | ピーチクリーム |
| **ぱお** | くま 🐻 | 静かに隣にいる・空状態 | ベージュ |
| **そら** | 猫 🐱 | 「おさんぽ」案内 | マッチャ |
| **ふう** | 小鳥 🐦 | おたより運び | ラベンダー |

世界観：**やわらかな庭・木漏れ日・小さな森の住人たち**。
医療っぽさ（白衣・聴診器・冷たい青）を徹底排除し、ピーチ × 抹茶クリーム × ラベンダーの暖色パレットで「家のすぐそばの安心できる場所」を演出。

---

## ディレクトリ構成

```
yorisoi-tsunagaru/
├── README.md                         ← このファイル
├── docs/                             ← 企画・設計・調査ドキュメント
│   ├── concept.md
│   ├── value-proposition.md
│   ├── community-design.md
│   ├── visual-direction.md
│   ├── design-system-gravity.md      ← GRAVITYのデザインシステム言語化
│   ├── design-system-tsunagaru.md    ← 医療版への翻訳（CSS変数・コンポーネント仕様）
│   ├── gravity-research.md
│   ├── gravity-research.xmind
│   └── 20260516MTG.md                ← 5/16 MTG 議事録
├── mockups/                          ← 静的HTMLモック（10画面）
│   ├── index.html                    ← モックインデックス
│   ├── onboarding.html
│   ├── home.html
│   ├── post.html
│   ├── voice-received.html
│   ├── stroll.html
│   ├── neighbor-search.html
│   ├── profile.html
│   ├── notifications.html
│   ├── settings.html
│   └── assets/
│       ├── css/style.css
│       ├── css/components.css
│       ├── js/icons.js
│       └── js/main.js
├── prompts/                          ← CodexCLI（GPT-Image-2）用画像生成プロンプトmd
│   ├── README.md
│   ├── 01-keyvisual-mood.md
│   ├── 02-mascot-moka-rabbit.md      ← もか（うさぎ）
│   ├── 03-mascot-pao-bear.md         ← ぱお（くま）
│   ├── 04-mascot-sora-cat.md         ← そら（猫）
│   └── 05-mascot-fuu-bird.md         ← ふう（小鳥）
└── assets/
    ├── mood/                         ← ムードボード・参考画像
    └── images/                       ← 生成済みキービジュアル・キャラ素材
```

---

## 次の打ち合わせ

- **2026-05-18(月) 20:00** — 冨澤さんと「記録との連携をどうするか」を主軸に議論。森側がこのモックを持参。
- 詳細は `.plans/active/2026-05-18-mtg-prep.md`（親リポジトリ側）

---

## 関係者

- 森 祐哉（モリ）— 企画・デザイン方針・開発・全体ディレクション
- 冨澤 健心（トミザワ）— プロダクト企画設計・方向性壁打ち
- Soeda Kei — メディキャンバス側ビジネスサイド・薬剤師

## 関連プロダクト

- `medicanvas/yorisoi/patient/yorisoi-phr/` — 既存PHR（医療パスポート）。本プロダクトとは別建てだが、将来的にデータ・導線で連携の余地。
- `medicanvas/uchiake/` — 既存「うちあけ」（患者体験談1.5万件・1.5万名）。コミュニティ立ち上げ初期のシード資産になり得る。
