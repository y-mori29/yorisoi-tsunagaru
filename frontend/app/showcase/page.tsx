import { redirect } from "next/navigation";

// 旧UI Showcase画面。2026-07-03 のそぎ落とし（UX監査フェーズA）で導線から外した。
// 実装の本体は git 履歴にある。
export default function Page() {
  redirect("/home");
}
