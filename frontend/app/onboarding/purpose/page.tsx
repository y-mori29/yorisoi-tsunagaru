import { redirect } from "next/navigation";

// 旧オンボーディング質問。2026-07-03 の3ステップ化（UX監査フェーズB）で廃止。
// 実装の本体は git 履歴にある。
export default function Page() {
  redirect("/onboarding/condition");
}
