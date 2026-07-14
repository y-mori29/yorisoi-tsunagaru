# よりそい コミュニティ版「探す」再設計 デザインQA

source visual truth path:

- アイコンずれの報告画像: `C:\Users\green\AppData\Local\Temp\codex-clipboard-241ac7f1-7d51-44f2-961d-37c6f97c6ee2.png`
- 旧「探す」の報告画像: `C:\Users\green\AppData\Local\Temp\codex-clipboard-3dc314f3-4e40-4135-a9b0-02344651415e.png`
- テーマ画面の構造参照: `C:\Users\green\Projects\.tmp\tsunagaru-find-qa\rooms-target.png`
- 同一画像内の比較: `C:\Users\green\Projects\.tmp\tsunagaru-find-qa\rooms-find-comparison.png`, `C:\Users\green\Projects\.tmp\tsunagaru-find-qa\icon-before-after.png`

implementation screenshot path:

- `C:\Users\green\Projects\.tmp\tsunagaru-find-qa\find-after-local.png`
- `C:\Users\green\Projects\.tmp\tsunagaru-find-qa\me-icon-fixed.png`

viewport: Chrome `1294x1015`、中央アプリ領域は幅430px

state: ローカル実装、未検索の「探す」初期画面、マイページの健康情報カード

## full-view comparison evidence

- 旧画面は病気タグ、診断前カード、症状タグ、声一覧が同じ階層で連続し、押した後にテーマへ進むのか声だけを絞るのか判断しづらかった。
- 修正版は `/rooms` と同じ「テーマ行」を正本にし、初期画面を検索欄、3つの入口、近いテーマの順に限定した。
- `/rooms` の紙背景、和文見出し、淡いテーマ行、アイコン、説明、右向き矢印の構成を維持しながら、「探す」側では入口選択を1つの連続リストにまとめた。
- 下部ナビは球体に見える `stroll` アイコンから虫眼鏡へ変更し、ラベルを読まなくても検索機能だと判断できる。

## focused region comparison evidence

- マイページの健康情報カードを拡大比較した。旧CSSでは説明文用の `span` 指定が丸アイコン内にも適用され、2pxの上余白とblock表示が入っていた。修正版は説明文を直接の子要素に限定し、18pxアイコンを36px円の中央へ固定した。
- 下部ナビを重点確認し、虫眼鏡の22px外枠、SVGの描画位置、アクティブ色、ラベルとの4px間隔がホーム・お便り・マイページと揃っている。
- 「症状から探す」操作後のテーマ行を確認し、行全体が `/rooms/[id]` へのリンクになり、腹痛テーマ詳細まで遷移できた。
- 「クローン病」検索時に、近いテーマ1件を先に、その後に近い声4件を表示し、テーマ詳細と体験談詳細の両方へ進めることを確認した。

## findings

P0/P1/P2の未解決項目はなし。

## required fidelity surfaces

- Fonts and typography: `/rooms` と同じ明朝見出し・ゴシック本文を使用。入口タイトル13px、説明10.5px、例示9.5pxで階層を分離し、長い病名や説明はテーマ行内で2行までに制限した。
- Spacing and layout rhythm: 初期画面は14pxのセクション間隔、入口行は最小88px、テーマ行は既存12〜13px余白を再利用。固定フッターとの重なりはない。
- Colors and visual tokens: 既存の `moss`、`terra`、`plum`、紙背景、線色のみを使用。病気・症状・悩みの入口は淡い色差で区別し、意味のない強調色は追加していない。
- Image quality and asset fidelity: 新規画像は追加していない。背景画像と既存SVGアイコンをそのまま利用し、文字記号やCSS描画による代替はない。
- Copy and content: 「何千もの病気・症状から探せます」から、操作が分かる「言葉で検索するか、入口を選ぶと、近いテーマと声をたどれます」へ変更。テーマと声の順序も画面上で明示した。

## patches made since previous QA pass

- `Icon` の外枠を中央揃え・line-height 0へ統一。
- 健康情報カードの説明文CSSを子要素へ限定し、丸アイコン内への誤適用を解消。
- 下部ナビの「探す」を虫眼鏡アイコンへ変更。
- `/find` の大量タグ初期表示を撤去。
- `/find` を検索、3カテゴリ入口、近いテーマのハブへ変更。
- 検索結果を「近いテーマ」→「近い声」の順へ変更。
- カテゴリ選択後は `/rooms` と同じテーマ行を表示し、テーマ詳細へ直接遷移。
- `/rooms` の病気・症状・悩みセクションにアンカーを追加。

## validation

- TypeScript `tsc --noEmit`: passed
- ESLint `app components lib`: passed
- Next.js production build: passed（41 routes）
- Chrome: `/find`初期画面、症状カテゴリ、腹痛テーマ詳細への遷移 passed
- Chrome: `クローン病`検索、テーマ結果、声結果、投稿文脈リンク passed
- Chrome: マイページ健康情報カード、下部ナビのアイコン位置 passed

## follow-up polish

- 実バックエンド接続時に、テーマ件数と声件数を検索APIの集計値へ置き換える。

final result: passed
