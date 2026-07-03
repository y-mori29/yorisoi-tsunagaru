"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";
import { continueWithGoogle, registerWithEmail } from "@/lib/auth/local-auth";

const TEXT = {
  title: "\u767b\u9332",
  heading: "\u30e1\u30fc\u30eb\u3060\u3051\u3067\u3001\u305d\u3063\u3068\u59cb\u3081\u308b\uff08\u7121\u6599\u3067\u767b\u9332\uff09",
  lead: "\u8aad\u3080\u3060\u3051\u306a\u3089\u767b\u9332\u306a\u3057\u3067\u5927\u4e08\u592b\u3067\u3059\u3002\u53cd\u5fdc\u3084\u6295\u7a3f\u3092\u3057\u305f\u3044\u6642\u3060\u3051\u3001\u5f8c\u304b\u3089\u540d\u524d\u3084\u30a2\u30d0\u30bf\u30fc\u3092\u6c7a\u3081\u3089\u308c\u307e\u3059\u3002",
  submit: "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u767b\u9332\u3059\u308b",
  switchText: "\u3059\u3067\u306b\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u304a\u6301\u3061\u306e\u65b9",
  account: "\u30a2\u30ab\u30a6\u30f3\u30c8",
  eyebrow: "\u3088\u308a\u305d\u3044\u30a2\u30ab\u30a6\u30f3\u30c8",
  google: "Google\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u7d9a\u3051\u308b",
  divider: "\u307e\u305f\u306f",
  email: "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9",
  password: "\u30d1\u30b9\u30ef\u30fc\u30c9",
  done: "\u6e96\u5099\u3067\u304d\u307e\u3057\u305f\u3002\u623b\u308a\u307e\u3059\u3002",
  fail: "\u30ed\u30b0\u30a4\u30f3\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
  close: "\u9589\u3058\u308b",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthShell title={TEXT.title} />}>
      <AuthForm />
    </Suspense>
  );
}

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/home";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onboardingHref = `/onboarding/profile?next=${encodeURIComponent(next)}`;

  const finish = () => {
    setDone(true);
    window.setTimeout(() => router.push(onboardingHref), 450);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await registerWithEmail({ name: "よりそいユーザー", email, password });
      finish();
    } catch (err) {
      setError(err instanceof Error ? err.message : TEXT.fail);
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await continueWithGoogle();
      finish();
    } catch (err) {
      setError(err instanceof Error ? err.message : TEXT.fail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title={TEXT.title}>
      <section className="auth-card" aria-label={TEXT.account}>
        <p className="auth-eyebrow">{TEXT.eyebrow}</p>
        <h2>{TEXT.heading}</h2>
        <p className="auth-lead">{TEXT.lead}</p>
        <button type="button" className="auth-google" onClick={onGoogle} disabled={submitting}>
          <span aria-hidden="true">G</span>
          {TEXT.google}
        </button>
        <div className="auth-divider"><span>{TEXT.divider}</span></div>
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            {TEXT.email}
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required />
          </label>
          <label>
            {TEXT.password}
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={6} autoComplete="current-password" required />
          </label>
          {error && <p className="auth-error">{error}</p>}
          {done && <p className="auth-done">{TEXT.done}</p>}
          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? "確認しています" : TEXT.submit}
          </button>
        </form>
        <Link className="auth-switch" href={`/auth/login?next=${encodeURIComponent(next)}`}>
          {TEXT.switchText}
          <Icon name="chevronRight" size={14} />
        </Link>
      </section>
    </AuthShell>
  );
}

function AuthShell({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <main className="explore-shell auth-shell">
      <header className="find-header">
        <BackButton fallbackHref="/home" />
        <h1>{title}</h1>
        <Link href="/home" className="explore-icon-btn" aria-label={TEXT.close}>
          <Icon name="close" size={18} />
        </Link>
      </header>
      {children}
    </main>
  );
}
