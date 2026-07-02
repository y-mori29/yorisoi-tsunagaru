# よりそいUXテスト改善計画

作成日: 2026-06-30
対象: よりそい つながる / よりそい 3ボタンLINE

## このフォルダの目的

2026-06-26のUXテスト回答10件と、2026-06-29のミーティング文字起こしをもとに、2つのよりそいプロダクトを次にどう改善するかをまとめる。

今回はコード変更ではなく、後続実装のための横断計画である。`yorisoi-tsunagaru` と `yorisoi-3button-line` は別リポジトリなので、混線を避けるためワークスペース側の `.plans/designs/` に置く。

## 読む順番

1. [01-requirements-definition.md](01-requirements-definition.md)
2. [02-functional-design.md](02-functional-design.md)
3. [03-ui-ux-specification.md](03-ui-ux-specification.md)
4. [04-implementation-roadmap.md](04-implementation-roadmap.md)
5. [05-development-handoff.md](05-development-handoff.md)

## 今回の結論

- 反応は悪くない。雰囲気は好評で、LINE版は10件すべて開けて操作できている。
- 課題は機能不足よりも、分かりにくさ、手順の多さ、押した後の変化の見えにくさ。
- まずは機能追加ではなく、核以外を削り、初回ユーザーが迷わず1つ目の行動へ進める状態を作る。
- つながると3ボタンを別サービスに見せず、「記録のない期間をコミュニティが支える」サイクルとして接続する。

## 参照元

- `medicanvas/yorisoi/patient/よりそい UXテスト アンケート（回答）.xlsx`
- `medicanvas/yorisoi/patient/0629meeting.md`
- `.plans/designs/2026-06-10-tsunagaru-red-team-value-architecture.md`
- `medicanvas/yorisoi-tsunagaru/docs/community-product-restructure-principles-20260623.md`
- `medicanvas/yorisoi-tsunagaru/docs/community-remaining-screen-restructure-plan-20260624.md`
- `.plans/designs/2026-06-23-yorisoi-3button-ui-ux-restructure.md`

## 開発上の重要注意

- `medicanvas/yorisoi-tsunagaru` の remote は `https://github.com/y-mori29/yorisoi-tsunagaru.git`。
- `medicanvas/yorisoi/patient/yorisoi-3button-line` の remote は `https://github.com/y-mori29/yorisoi-3button-line.git`。
- 2つは別リポジトリ。rootで広い `git add -A` をしない。
- 医療判断、症状改善、治療助言を約束する文言にしない。価値は「近い声を読む」「記録を残す」「見返す/見せる」。
- UIは水彩・やさしい雰囲気を残す。ただし、見た目を保つために操作の分かりやすさを犠牲にしない。
