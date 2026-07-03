import { redirect } from "next/navigation";

/** 旧 complete 画面。2026-07-03 の初回フロー変更で /home へリダイレクト。 */
export default function CompletePage() {
  redirect("/home");
}
