import { redirect } from "next/navigation";

/**
 * 旧ようこそ画面。2026-07-03 の初回フロー変更（案1・森さん承認）で廃止。
 * 読むのは登録不要のため、初回は /home で直接読める。
 */
export default function OnboardingWelcomePage() {
  redirect("/home");
}
