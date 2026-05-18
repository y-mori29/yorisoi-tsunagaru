あなたは「よりそい つながる」アプリのビジュアル素材生成を担当します。
以下 11 個の md ファイルを **順番に1つずつ** 処理してください。

【共通ルール】
- 各 md の冒頭にある _shared-style-guide.md を必ず参照すること（同じディレクトリにあります）
- 内蔵 image_gen ツールで画像を生成すること
- 出力先は md ファイル内の "target_path" に記載されているパス
- 1枚生成 → 保存 → 次の md、を繰り返す（並列禁止）
- 失敗したら止まって理由を出力すること
- 1枚ずつ完了報告（"[done] N/11 → <path>" 形式）

【共通スタイルガイド】（_shared-style-guide.md 抜粋）
- 手描き線画（sepia ink, 1.5pt 程度）+ 薄い水彩ウォッシュ
- 配色：くすみアース系（テラコッタ #C97B5C, モスグリーン #8FA68E, ラベンダー #B8A3C4, クリーム #FAF6EE）
- 質感：MUJI / 暮しの手帖 のような落ち着いた手仕事の温度感
- 透明背景（PNG）— 動物アバターは必須、ヒーローは可能なら透明、難しければ #FAF6EE のソフトクリーム背景
- 文字は一切入れない
- アニメ調・3D・写真風・西洋ファンタジー風は厳禁

【処理対象 11 ファイル】（プロジェクトルート: frontend/codex-prompts/）

1. animals/01-rabbit-moka.md     → public/assets/animals/rabbit.png   (1024x1024, 透明)
2. animals/02-bear-pao.md         → public/assets/animals/bear.png     (1024x1024, 透明)
3. animals/03-cat-sora.md         → public/assets/animals/cat.png      (1024x1024, 透明)
4. animals/04-bird-fuu.md         → public/assets/animals/bird.png     (1024x1024, 透明)
5. animals/05-fox.md              → public/assets/animals/fox.png      (1024x1024, 透明)
6. animals/06-owl.md              → public/assets/animals/owl.png      (1024x1024, 透明)
7. animals/07-turtle.md           → public/assets/animals/turtle.png   (1024x1024, 透明)
8. animals/08-hedgehog.md         → public/assets/animals/hedgehog.png (1024x1024, 透明)
9. heroes/01-onboarding-zabuton.md → public/assets/heroes/onboarding-zabuton.png (1024x1280)
10. heroes/02-voice-letter.md     → public/assets/heroes/voice-letter.png (1024x768)
11. heroes/03-stroll-path.md      → public/assets/heroes/stroll-path.png (1024x768)

【完了条件】
すべて完了したら、最終行に次を出力：
[DONE] all 11 images generated

途中で失敗したら止まって [FAIL] <md名> <理由> を出力。
