import type { ReactNode } from "react";

type AppHeaderProps = {
  title?: ReactNode;
  /** 左側のアクション（戻る矢印など） */
  left?: ReactNode;
  /** 右側のアクション（bell / settings など） */
  right?: ReactNode;
  /** タイトルを左寄せに（onboarding で空ヘッダーのとき等） */
  titleAlign?: "center" | "left";
};

/**
 * App ヘッダー（タイトル + 左右アクション）。
 * sticky で画面上部に固定、cream paper の半透明背景。
 */
export function AppHeader({ title, left, right, titleAlign = "center" }: AppHeaderProps) {
  return (
    <header className="app-header">
      {left ?? <span className="app-header__action app-header__action--spacer" />}
      {title && (
        <h1 className={`app-header__title ${titleAlign === "left" ? "app-header__title--left" : ""}`}>
          {title}
        </h1>
      )}
      {right ?? <span className="app-header__action app-header__action--spacer" />}
    </header>
  );
}
