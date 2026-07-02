# 開発引き継ぎメモ

作成日: 2026-06-30
対象: よりそい つながる / よりそい 3ボタンLINE

## 1. 最初に読むファイル

1. `.plans/designs/2026-06-30-yorisoi-ux-feedback-improvement/README.md`
2. `.plans/designs/2026-06-30-yorisoi-ux-feedback-improvement/01-requirements-definition.md`
3. `.plans/designs/2026-06-30-yorisoi-ux-feedback-improvement/03-ui-ux-specification.md`
4. `medicanvas/yorisoi/patient/0629meeting.md`
5. `medicanvas/yorisoi/patient/よりそい UXテスト アンケート（回答）.xlsx`

## 2. リポジトリ前提

対象フォルダ:

```text
C:\Users\green\Projects\medicanvas\yorisoi-tsunagaru
C:\Users\green\Projects\medicanvas\yorisoi\patient\yorisoi-3button-line
```

重要な前提:

- 2つは別リポジトリで、remoteも別。
- `yorisoi-tsunagaru` はNext.js。`frontend/package.json` は `pnpm@10.13.1` 指定。
- `yorisoi-3button-line` はExpress + 静的HTML中心。
- 機密値、`secure/`、`.env` は必要時以外読まない。
- rootや別リポを巻き込む `git add -A` はしない。

## 3. 現状

実装済み:

- つながるは `/home`, `/find`, `/rooms`, `/post`, `/me`, `/settings` など主要画面がある。
- つながるは病気・症状・不安を保存する `MemberHealthContext` 系がある。
- 3ボタンLINEは `/`, `/simple/record.html`, `/simple/calendar.html`, `/simple/show.html`, `/simple/settings.html`, `/simple/help.html` がある。
- 3ボタンLINEはCloud Run確認リビジョンが複数あるが、本番トラフィック切替は別判断。

未整理/改善対象:

- つながるで、検索や部屋操作後の変化が分かりにくい。
- 投稿時に、他人からどう見えるかが分からず不安。
- `置く`、`吐き出す` は雰囲気は良いが、初回では意味が伝わりにくい。
- 3ボタンLINEは、初回から `はなす/ふりかえる/みせる` が並列で重い。
- 3ボタンLINEは手入力導線が見つけにくい。
- 文字が小さい、一画面の情報量が多いという声がある。

## 4. 最重要要件

- P0は「分かりやすくする」。新機能追加は後。
- つながるは、読む/探す/投稿前確認を先に直す。
- 3ボタンは、はなすを主役にし、他2つは記録後に意味が出る導線として整理する。
- 2つのアプリは別々に見せず、記録と記録の間をコミュニティが支える流れにする。

## 5. 最初に着手するなら

1. つながる `/find` の選択状態と結果表示を改善する。
2. つながる `/post` に投稿前プレビューと公開範囲説明を追加する。
3. 3ボタン `/` の `本人の記録` を整理し、`はなす` 主役のホームへ再配置する。
4. 3ボタン `/simple/record.html` の手入力導線を見える位置へ上げる。
5. スマホ幅で文字サイズ・情報量を確認する。

## 6. 実行・検証コマンド

つながる:

```powershell
cd C:\Users\green\Projects\medicanvas\yorisoi-tsunagaru\frontend
pnpm run build
```

3ボタン:

```powershell
cd C:\Users\green\Projects\medicanvas\yorisoi\patient\yorisoi-3button-line\backend
npm start
```

## 7. 注意点

- Gitの所有者違いで `dubious ownership` が出る場合がある。安易にグローバル `safe.directory` を追加しない。必要な時だけ方針確認する。
- UI確認が必要な変更では、ビルド成功だけで完了扱いにしない。
- 患者さん本人が受け取る言葉を優先する。
- 症状改善や治療助言を示唆するコピーは避ける。
- つながる側のAI投稿感が出ると信頼を損なうため、体験談由来・案内役として表現する。
