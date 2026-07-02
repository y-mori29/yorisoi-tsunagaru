# よりそい つながる コミュニティ版 参照UI・素材

作成日: 2026-06-23

このフォルダは、森さん確認で「この方向が一番よい」となったコミュニティ版UIを、実装・資料化・追加素材制作で再利用できるように固定したものです。

## 参照UI

- `ui-near-voices-v1.png`
  - ホームの正本候補。登録前でも体験談を読める公開タイムライン、投稿欄、反応ボタン、下部ナビの方向性。
- `ui-explore-tags-v1.png`
  - 探す画面の正本候補。病気・症状・暮らしの悩みを大量タグから探せる方向性。
- `ui-room-detail-v1.png`
  - 部屋詳細の正本候補。読むだけOK、比べない、診断しないという安心設計と、部屋内の近い声。

## 素材シート

- `asset-sheet-community-avatars-rooms-v1.png`
  - 匿名アバター、部屋サムネイル、カテゴリモチーフの切り出し用。
- `asset-sheet-community-care-motifs-v1.png`
  - 医療・生活・安心感を表す小物イラストの切り出し用。
- `asset-sheet-community-care-motifs-clean-v2.png`
  - 余白を広く取り直した実装用の切り出し正本。生活モチーフは原則こちらを使う。

## 単体切り出し

- `cutouts/avatars/anonymous-avatar-01.png` から `anonymous-avatar-08.png`
  - 投稿カードや匿名プロフィール用。
- `cutouts/rooms/room-thumb-01.png` から `room-thumb-04.png`
  - 部屋カードや部屋詳細ヘッダー用。
- `cutouts/category-motifs/category-motif-01.png` から `category-motif-04.png`
  - タブ、カテゴリ、空状態の小さな装飾用。
- `cutouts/care-motifs/care-motif-01.png` から `care-motif-20.png`
  - 医療・生活・安心感を表す小物素材。`asset-sheet-community-care-motifs-clean-v2.png` の白いセル領域を基準に再切り出し済み。
- `cutouts/contact-sheet.png`
  - 単体切り出し確認用の一覧画像。

## 実装時の注意

- UIは画像をそのまま貼るのではなく、HTML/CSS/Reactで再現し、素材だけを必要箇所へ自然に配置する。
- 投稿者名は分類ラベルではなく、通常のユーザーネームにする。
- 病気・症状・悩みの選択肢は少数固定に見せず、検索・もっと見る・タグ拡張で広がる前提にする。
- 体験談数のような少なさが目立つ数字はトップには出さない。
- 未ログインでも読めるが、投稿・反応・保存は登録導線へ進める。
