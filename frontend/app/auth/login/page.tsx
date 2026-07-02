"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";
import { continueWithGoogle, loginWithEmail } from "@/lib/auth/local-auth";

const TEXT = {
  title: "\u30ed\u30b0\u30a4\u30f3",
  heading: "\u7d9a\u304d\u304b\u3089\u3001\u305d\u3063\u3068\u5165\u308b",
  lead: "\u767b\u9332\u6e08\u307f\u306e\u65b9\u306f\u30ed\u30b0\u30a4\u30f3\u3059\u308b\u3068\u3001\u6295\u7a3f\u3084\u4fdd\u5b58\u3001\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3092\u7d9a\u304d\u304b\u3089\u4f7f\u3048\u307e\u3059\u3002",
  submit: "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u30ed\u30b0\u30a4\u30f3\u3059\u308b",
  switchText: "\u306f\u3058\u3081\u3066\u5229\u7528\u3059\u308b\u65b9",
  account: "\u30a2\u30ab\u30a6\u30f3\u30c8",
  eyebrow: "\u3088\u308a\u305d\u3044\u30a2\u30ab\u30a6\u30f3\u30c8",
  google: "Google\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u7d9a\u3051\u308b",
  divider: "\u307e\u305f\u306f",
  name: "\u304a\u540d\u524d",
  namePlaceholder: "\u4f8b\uff1a\u305d\u3089\u3044\u308d",
  email: "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9",
  password: "\u30d1\u30b9\u30ef\u30fc\u30c9",
  done: "\u6e96\u5099\u3067\u304d\u307e\u3057\u305f\u3002\u623b\u308a\u307e\u3059\u3002",
  fail: "\u30ed\u30b0\u30a4\u30f3\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
  close: "\u9589\u3058\u308b",
};

export default function LoginPage() {
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

  const finish = () => {
    setDone(true);
    window.setTimeout(() => router.push(next), 450);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginWithEmail({ email, password });
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
        <Link className="auth-switch" href={`/auth/register?next=${encodeURIComponent(next)}`}>
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
