# よりそい つながる コミュニティ版 画像素材マニフェスト

作成日: 2026-06-22  
対象: 水曜デモに向けた公開コミュニティUI（ホーム、探す、部屋、投稿）

## 方針

今回のUIは「病気や症状の不安を抱える人が、登録前でも近い声を読めて、必要な時だけそっと参加できる場所」として見せる。画像素材は、SNSらしい活気を出しつつ、医療サービス特有の緊張感やAIっぽさを避けるため、やわらかい水彩えほん風に統一する。

素材は次の2層で用意した。

- 画面にそのまま置く単体PNG: 実装で直接使う
- 切り取り前提のブランドシート: 追加の小物や装飾が必要になった時に使う

## 保存場所

実装用素材:

`frontend/public/assets/community-brand/`

アバター個別素材:

`frontend/public/assets/community-brand/avatars/`

既存の継続利用素材:

`frontend/public/assets/community/explore-paper-bg.png`  
`frontend/public/assets/community/shared-notes.png`  
`frontend/public/assets/animals/*.png`

## 新規作成した素材

| ファイル | 主な用途 | 推奨画面 |
| --- | --- | --- |
| `/assets/community-brand/brand-asset-sheet-v1.png` | 切り取り前提のブランド素材集。紙片、メモ、葉、ノート、部屋、小物、反応モチーフ | 追加装飾、将来の素材切り出し |
| `/assets/community-brand/paper-bg-v2.png` | 低コントラストの紙背景。HTML/CSSの背面に敷く | 全画面背景、セクション背景 |
| `/assets/community-brand/home-gathered-voices-v1.png` | 体験談が集まっている印象を出すホーム用挿絵 | `/home` 冒頭、公開タイムライン上部 |
| `/assets/community-brand/room-quiet-place-v1.png` | 部屋に入る安心感を出す挿絵 | `/rooms/[id]` の部屋ヘッダー |
| `/assets/community-brand/composer-notebook-v1.png` | 少しだけ吐き出す投稿体験を支える挿絵 | `/post` 冒頭、投稿完了画面 |
| `/assets/community-brand/empty-soft-room-v1.png` | 検索結果なし、部屋投稿が少ない時の空状態 | `/find`、`/rooms/[id]`、通知や保存一覧 |
| `/assets/community-brand/animal-avatar-sheet-v1.png` | 匿名ユーザー用アバターの統一シート | 追加切り出し、デザイン確認 |

## 個別アバター

| ファイル | 用途 |
| --- | --- |
| `/assets/community-brand/avatars/avatar-rabbit-v1.png` | 投稿者アバター |
| `/assets/community-brand/avatars/avatar-bird-v1.png` | 投稿者アバター |
| `/assets/community-brand/avatars/avatar-cat-v1.png` | 投稿者アバター |
| `/assets/community-brand/avatars/avatar-fox-v1.png` | 投稿者アバター |
| `/assets/community-brand/avatars/avatar-owl-v1.png` | 投稿者アバター |
| `/assets/community-brand/avatars/avatar-turtle-v1.png` | 投稿者アバター |
| `/assets/community-brand/avatars/avatar-bear-v1.png` | 投稿者アバター |
| `/assets/community-brand/avatars/avatar-hedgehog-v1.png` | 投稿者アバター |

既存の `public/assets/animals/*.png` も使えるが、今回の新UIでは `community-brand/avatars/` を優先すると、全体の水彩トーンが揃う。

## 画面ごとの使い方

### ホーム

- 背景に `paper-bg-v2.png`
- 冒頭の「読む・探す・部屋・吐き出す」導線付近に `home-gathered-voices-v1.png`
- タイムライン投稿カードには個別アバターをランダム割り当て
- 投稿カードの小さな装飾が必要な場合は `brand-asset-sheet-v1.png` から紙片や葉を切り出す

### 探す

- 背景に `paper-bg-v2.png`
- 検索結果がない時、または診断前・夜の不安などの入口カードに `empty-soft-room-v1.png`
- 病気・症状・悩みタグは画像化せずHTML/CSSで表現する。何千件規模に増えるため、画像に閉じ込めない

### 部屋

- 部屋詳細のヘッダーに `room-quiet-place-v1.png`
- 投稿が少ない部屋の空状態に `empty-soft-room-v1.png`
- 部屋一覧の背景や上部装飾に `brand-asset-sheet-v1.png` の葉・紙片を切り出し可能

### 投稿

- 投稿画面の冒頭または投稿完了画面に `composer-notebook-v1.png`
- 気持ちチップ、公開範囲、部屋選択は画像ではなくHTML/CSSで作る
- 文字を画像に含めないことで、あとから文言を森さんの確認に合わせて自然に変えられる

## 生成時の親レシピ

やわらかい日本の水彩えほん風。温かいオフホワイトの紙、少し揺れたココアブラウンの輪郭、丸い形、低ディテール、淡いにじみ、余白多め。病院らしい冷たさではなく、声を読める・そっと置ける・無理に参加しなくてよい居場所の印象を優先する。

避けるもの:

- 読める文字、疑似文字、ロゴ
- 医療十字、病院機器、白衣などの直接的な医療記号
- 3D、ベクター風、アニメ風、強い彩度
- SNSらしすぎる派手なリアクション表現

## 次に実装で行うこと

1. `/home`、`/rooms/[id]`、`/post` の既存挿絵を今回の素材へ差し替える
2. 投稿カードのアバター割り当てを `community-brand/avatars/` に寄せる
3. 背景を `paper-bg-v2.png` に統一し、画像の上に文字が乗る箇所は必ずコントラストを確認する
4. 必要になった小物だけ `brand-asset-sheet-v1.png` から切り出し、切り出し済み素材は `community-brand/crops/` に保存する

