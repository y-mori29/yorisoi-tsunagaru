# 実装ロードマップ

作成日: 2026-06-30
対象: よりそい つながる / よりそい 3ボタンLINE

## 1. 実装方針

先に機能を増やさない。今回のUXテストで出た課題は、主に「分からない」「多い」「変化が見えない」「投稿後が不安」である。

したがって最初の改善は、既存画面を削る・並べ替える・見え方を明確にする作業に集中する。

## 2. フェーズ

| フェーズ | 目的 | 主な作業 | 完了条件 |
|---|---|---|---|
| A. 即時修正 | 明らかな迷いを減らす | `本人の記録` チップ整理、押せる/押せない見た目整理、文字サイズ下限確認 | 主要導線に押しても反応しない表示が残らない |
| B. つながる 探す改善 | 操作後の変化を見せる | `/find` の選択状態、結果サマリー、チップ状態、結果エリア誘導 | 病名/症状選択後に何が変わったか分かる |
| C. つながる 投稿前確認 | 投稿不安を下げる | `/post` にプレビュー、公開範囲説明、投稿後の表示先説明 | 投稿前に「どう見えるか」が確認できる |
| D. 3ボタン ホーム再重みづけ | 初回は「はなす」に集中 | `/` で `はなす` 主役化、ふりかえる/みせるの補助化 | 記録がないユーザーがまず何をするか分かる |
| E. 3ボタン はなす整理 | 入力手段の迷いを減らす | `/simple/record.html` で録音/手入力/AI会話の重みを整理 | 手入力で残す方法が迷わず分かる |
| F. 横断接続 | WebとLINEの別物感を減らす | つながると3ボタンの補助導線・説明を追加 | 2つの役割が一連の体験として説明できる |
| G. 再テスト | 改善効果を測る | 新アンケート設計、10件以上再実施 | 理解度・直感性・利用意向の変化が測れる |

## 3. 次回打ち合わせまでの最短順

1. この計画をもとに、改善方針を1枚に要約する。
2. つながる: `/find` と `/post` の改善モックを先に出す。
3. 3ボタン: ホームの `はなす` 主役化モックを出す。
4. 「記録がない期間をコミュニティが支える」横断サイクルを図で説明する。

## 4. 実装時に触る可能性が高いファイル

### よりそい つながる

- `medicanvas/yorisoi-tsunagaru/frontend/app/find/page.tsx`
- `medicanvas/yorisoi-tsunagaru/frontend/app/post/page.tsx`
- `medicanvas/yorisoi-tsunagaru/frontend/app/rooms/page.tsx`
- `medicanvas/yorisoi-tsunagaru/frontend/app/rooms/[id]/page.tsx`
- `medicanvas/yorisoi-tsunagaru/frontend/app/home/page.tsx`
- `medicanvas/yorisoi-tsunagaru/frontend/app/globals.css`

### よりそい 3ボタンLINE

- `medicanvas/yorisoi/patient/yorisoi-3button-line/backend/public/index.html`
- `medicanvas/yorisoi/patient/yorisoi-3button-line/backend/public/simple/record.html`
- `medicanvas/yorisoi/patient/yorisoi-3button-line/backend/public/simple/calendar.html`
- `medicanvas/yorisoi/patient/yorisoi-3button-line/backend/public/simple/show.html`
- `medicanvas/yorisoi/patient/yorisoi-3button-line/backend/public/simple/help.html`

## 5. 検証方法

### 構文・ビルド

つながる:

```powershell
pnpm run build
```

3ボタン:

```powershell
npm start
```

必要に応じてHTTP 200確認を行う。ただし、HTTP 200は視覚確認の代わりにしない。

### UI確認

- 主要画面をスマホ幅で確認する。
- 押せるもの/押せないものの見分けを確認する。
- 文字がLINE内ブラウザで読めるか確認する。
- 投稿前プレビュー、録音以外の入力導線、空状態を確認する。

### 再アンケート

次回は以下を追加する。

- 疾患名または状況を任意で聞く。
- つながるに「参加したい/読みたい/投稿したい」を分けて聞く。
- 3ボタンをどの場面で使うかを聞く。
- 迷った画面名を選択式で聞く。

## 6. リスクと代替案

| リスク | 影響 | 代替案 |
|---|---|---|
| やさしい言葉を普通の操作名に寄せすぎてブランド感が薄れる | よりそいらしさが弱くなる | 初回だけ普通の言葉を併記し、詳細画面でブランド語を使う |
| 情報量を削りすぎて価値が伝わらない | 何ができるか分からない | 最初の1操作を強め、下部に「あとでできること」を置く |
| 文字サイズを上げて画面が長くなる | スクロール量が増える | 文字を大きくしつつ、項目数を減らす |
| 機能追加要望に流れて複雑化する | 今回の主要課題が悪化する | P0完了までは新機能を入れない |
| 視覚QAが外部Edge headless禁止/ブラウザ接続問題で止まる | 実表示確認が不足する | Browser/Chrome正規QA復旧、または森さん実ブラウザスクショを代替証拠にする |
