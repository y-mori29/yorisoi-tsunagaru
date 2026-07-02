import { redirect } from "next/navigation";

// 旧ふりかえり画面。2026-07-03 のそぎ落とし（UX監査フェーズA・森さん承認）で導線から外した。
// 実装の本体は git 履歴にある。
export default function Page() {
  redirect("/home");
}
