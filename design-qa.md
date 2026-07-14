# よりそい コミュニティ版 投稿・お便り デザインQA

source visual truth path:

- 投稿の問題画面: `C:\Users\green\AppData\Local\Temp\codex-clipboard-6ff3811a-cb64-47d7-8b77-5d849fa3163c.png`
- DM一覧の構造参照: `C:\Users\green\Projects\medicanvas\yorisoi-tsunagaru\archive\docs\ref\11_GRAVITYメッセージ画面.png`
- 比較画像: `C:\Users\green\Projects\.tmp\tsunagaru-qa\post-before-after.png`, `C:\Users\green\Projects\.tmp\tsunagaru-qa\mail-reference-after.png`

implementation screenshot path:

- `C:\Users\green\Projects\.tmp\tsunagaru-qa\post-production.png`
- `C:\Users\green\Projects\.tmp\tsunagaru-qa\mail-production.png`

viewport: `1920x992`（中央のアプリ領域は幅430px）

state: Cloud Run公開版、投稿は未登録初期状態、お便りはメッセージタブ初期状態

## full-view comparison evidence

- 投稿画面は、旧画面で説明カードと常時表示プレビューが縦方向を占有していた。修正版は本文入力を主役にし、登録案内を2行へ圧縮、プレビューを確認操作後に展開する構成へ変更した。
- お便り画面は、参照画像の「相手・最新メッセージ・時刻・未読数を一覧から判断できる」構造を、よりそいの紙背景・水彩アバター・静かな配色で再構成した。
- 通知はDM一覧から切り離し、「お知らせ」補助タブへ移動した。初期表示は常に1対1のメッセージ一覧である。

## focused region comparison evidence

- 投稿上部を重点確認し、登録前説明が本文入力より強く見えないこと、タイトル・説明・入力欄の順序が自然なことを確認した。
- 投稿下部を重点確認し、届け先、プレビュー操作、固定CTAが重ならず、初期表示の一画面内で役割を判断できることを確認した。
- お便り一覧を重点確認し、4件の会話で名前・疾患/テーマ・本文プレビュー・時刻・未読数が視線順に並ぶことを確認した。
- 独自画像の差し替えはないため、画像の詳細比較はアバターの丸抜き・鮮明さ・背景とのなじみだけを確認した。

## findings

P0/P1/P2の未解決項目はなし。

## required fidelity surfaces

- Fonts and typography: 既存の和文フォントと階層を維持。投稿本文を最も読みやすい15px、お便りの名前・本文・補助情報を段階的に小さくし、長文は1行で省略される。
- Spacing and layout rhythm: 投稿の説明カードとテキスト欄を圧縮し、届け先とプレビュー操作の間隔を12px前後で統一。会話一覧は個別カードの連続ではなく、1つの一覧面と区切り線でDMらしい密度にした。
- Colors and visual tokens: `moss`、`terra`、紙背景、既存の線色のみを使用。未読数だけをterraで明確にし、その他は低コントラストの落ち着いた階層にした。
- Image quality and asset fidelity: 既存の水彩動物アバターを再利用し、文字記号や仮画像への置き換えはしていない。返信候補の装飾記号は既存SVGアイコンへ置き換えた。
- Copy and content: 「24時間で消えるお便り」を初期画面から撤去し、「1対1で、ゆっくり話せる場所」と明示。投稿は「登録なしでプレビューまで」「公開時だけ登録」に整理した。

## patches made since previous QA pass

- お便りの初期タブをメッセージ一覧へ変更。
- 「お便り / やりとり」を「メッセージ / お知らせ」へ整理。
- 会話一覧をDM向けの連続リスト、時刻、文脈、未読数表示へ再設計。
- 個別会話への遷移と戻り先を実画面で確認。
- 投稿の登録前説明を圧縮し、プレビューを折りたたみ式へ変更。
- 投稿CTAを「プレビューを確認」から「登録して公開へ」へ段階的に変化させた。
- Firebase AuthenticationのGoogleプロバイダーを有効化し、公開画面でGoogleログイン完了と下書き復元を確認。

## validation

- TypeScript `tsc --noEmit`: passed
- ESLint `app components lib`: passed
- Next.js production build: passed
- Chrome: 投稿入力→プレビュー→登録→Googleログイン→投稿画面復帰 passed
- Chrome: お便り一覧→個別会話 passed
- Cloud Run revision: `tsunagaru-frontend-00015-227`、100%配信

## follow-up polish

- 実バックエンド接続時に、会話の未読既読更新と送信後の永続化を同じ見た目のまま接続する。

final result: passed
