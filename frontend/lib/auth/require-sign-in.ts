"use client";

import { getCurrentSession } from "@/lib/auth/local-auth";

/** 未登録なら登録画面へのリダイレクト先URLを返す。登録済みなら null。 */
export function signInGateHref(next: string): string | null {
  if (getCurrentSession()) return null;
  return `/auth/register?next=${encodeURIComponent(next)}`;
}
