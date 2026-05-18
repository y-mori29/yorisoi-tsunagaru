import type { ReactNode } from "react";

type MobileFrameProps = {
  children: ReactNode;
};

/**
 * モバイルフレーム外殻：StatusBar → children → (BottomNav は children 内) → HomeIndicator
 * app-frame クラスは layout.tsx 側で root の div が持っている。
 */
export function MobileFrame({ children }: MobileFrameProps) {
  return <>{children}</>;
}
