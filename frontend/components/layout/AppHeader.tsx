import type { ReactNode } from "react";

type AppHeaderProps = {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  titleAlign?: "center" | "left";
};

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