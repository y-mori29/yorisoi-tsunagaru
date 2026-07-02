# よりそい つながる コミュニティ版 デザインQA

source visual truth path: `C:\Users\green\.codex\generated_images\019ee975-c3f7-7aa0-81af-5066631a107d\ig_040de0b51b75bb74016a37c27bb99c819184f647146a13678c.png`
implementation screenshot path: `C:\Users\green\Projects\.tmp\tsunagaru-reference-restore\home-4.png`, `C:\Users\green\Projects\.tmp\tsunagaru-reference-restore\find.png`
viewport: `430x932`
state: 未ログイン、公開閲覧、ホーム最新タブ、探す初期表示

## full-view comparison evidence

- ホームは参照画像右の構成に合わせ、ヘッダー、タブ、投稿欄、タイムラインカード、下部ナビの順で表示されている。
- 探すは参照画像中央の構成に合わせ、戻る、タイトル、大きな説明、検索欄、病気・症状・暮らしの悩みの大量タグが縦に続く。
- 参照画像のスマホフレームは実装には含めていない。実アプリ画面として、同じモバイル幅の内容領域で比較した。

## focused region comparison evidence

- アバター領域を重点確認した。縦長の個別アバター素材では丸抜き時に顔がずれていたため、投稿カードと投稿欄は正方形の動物素材に切り替えた。
- 投稿カード領域を重点確認した。投稿者名、タグ、時間、本文、部屋リンク、保存、共感・応援・ありがとうの順が参照案と同じ情報密度になっている。
- 探すのタグ領域を重点確認した。参照案と同じく、病気は緑・紫・薄茶のタグが多く並び、症状・悩みへ続く構成になっている。

## findings

P0/P1/P2 の未解決項目はなし。

## required fidelity surfaces

- Fonts and typography: 既存の和文フォント指定を維持。参照案と同じく、ブランド名と見出しはゆったり、カード本文は読みやすい本文サイズにしている。
- Spacing and layout rhythm: ホームの投稿欄、カード、アクションボタンの間隔は参照案に近い密度へ調整。探す画面はタグ群の余白を保ち、情報量が多くても詰まりすぎない。
- Colors and visual tokens: 既存の `terra`、`moss`、`plum`、`gold` を利用し、参照案の淡い紙背景、くすみグリーン、薄い紫、薄茶のバランスに寄せた。
- Image quality and asset fidelity: 背景とアバターは既存の水彩系画像素材を使用。投稿カードの丸アバターは切り抜き崩れを避けるため、正方形素材へ変更した。
- Copy and content: ホーム、探す、タイムライン、反応、登録誘導の表示文言を文字化けなしの日本語へ修正。投稿データも患者体験談らしい短文に差し替えた。

## patches made since previous QA pass

- `/home` を参照案右画面に寄せ、未ログインでも投稿欄の入口と豊富なタイムラインが見える構成へ変更。
- `/find` を参照案中央画面に寄せ、病気・症状・暮らしの悩みを大量タグで探せる構成へ変更。
- `lib/mock/explore.ts` の病気・症状・悩み・投稿データを日本語で再作成。
- 下部ナビの表示名を正常な日本語に修正。
- アバターの切り抜き違和感を減らすため、投稿カード用素材を正方形素材に切り替え。

## validation

- `tsc --noEmit`: passed
- `eslint app components lib`: passed with 2 existing warnings for `<img>` in `Avatar.tsx` and `VoiceCard.tsx`
- `next build`: passed

## follow-up polish

- 参照画像のiPhoneフレームまで含むプレゼン用モックは別途生成・配置するとさらに見栄えが上がる。
- 右上プロフィール画像だけは個別アバター素材を使っているため、最終的には小円専用に切り出したアセットを用意するとさらに安定する。

final result: passed
