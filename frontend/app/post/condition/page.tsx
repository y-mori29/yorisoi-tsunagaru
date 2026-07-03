"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { AppHeader } from "@/components/layout/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { ConditionSelector } from "@/components/screens/post/ConditionSelector";
import { OneWordPrompt } from "@/components/screens/post/OneWordPrompt";
import {
  getConditionMetaList,
  postCondition,
} from "@/lib/api/conditions";
import type { ConditionLevel } from "@/lib/api/types";

/**
 * /post/condition — ワンタップで「きょうの 体調」を投稿する画面（Phase 7A）。
 *
 * 5/20 冨澤 MTG での提案を実装：
 *  1. 5 段階セレクタをタップ → 自動で次へ
 *  2. 「よかったら ひとこと」（任意・スキップ可）
 *  3. 完了アニメ → /home に戻る
 *
 * 「ワンタップで終わってもいい」が最重要設計。
 * Step 1 で「タップ → 自動遷移」にしたうえで Step 2 を全部任意にすることで、
 * 1 タップ + 「書かずに 送る」の 2 タップで投稿を完結できる。
 */

type Step = "select" | "write" | "done";

export default function ConditionPostPage() {
  const router = useRouter();
  const pathname = usePathname();
  const metaList = useMemo(() => getConditionMetaList(), []);

  useEffect(() => {
    const gate = signInGateHref(pathname);
    if (gate) router.replace(gate);
  }, [pathname, router]);

  const [step, setStep] = useState<Step>("select");
  const [level, setLevel] = useState<ConditionLevel | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedMeta = level
    ? metaList.find((m) => m.level === level) ?? null
    : null;

  const handleSelect = (next: ConditionLevel) => {
    setLevel(next);
    // 自動で次のステップへ（タップしたら即進む）
    setStep("write");
  };

  const submit = async (input: { topic?: string; body?: string }) => {
    if (!level || submitting) return;
    setSubmitting(true);
    try {
      await postCondition({ level, ...input });
      setStep("done");
      setTimeout(() => router.push("/home"), 1500);
    } catch (e) {
      console.error("[condition-post] submit failed:", e);
      setSubmitting(false);
    }
  };

  return (
    <>
      <AppHeader
        title="きょうの 体調"
        left={
          <Link href="/home" aria-label="戻る">
            <IconButton icon="back" label="戻る" />
          </Link>
        }
      />

      <main className="app-main">
        {step === "select" && (
          <>
            <p
              style={{
                font: "400 14px/1.8 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.06em",
                padding: "12px 16px 6px",
              }}
            >
              いまの からだの ちょうし、
              <br />
              ひとつ えらんで みてください。
            </p>
            <ConditionSelector value={level ?? undefined} onSelect={handleSelect} />
          </>
        )}

        {step === "write" && selectedMeta && (
          <OneWordPrompt
            selectedMeta={selectedMeta}
            onSubmit={submit}
            onSkip={() => submit({})}
          />
        )}

        {step === "done" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 24px 40px",
              textAlign: "center",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                font: "400 56px/1 var(--font-mincho)",
                color: "var(--color-terra-500)",
                marginBottom: 24,
                letterSpacing: "0.08em",
              }}
            >
              ✦
            </div>
            <p
              style={{
                font: "400 17px/1.95 var(--font-mincho)",
                color: "var(--color-ink-900)",
                letterSpacing: "0.06em",
                whiteSpace: "pre-line",
              }}
            >
              そっと、置きました。
              {"\n"}
              きょうの あなたを、
              {"\n"}
              ちゃんと 受けとりました。
            </p>
          </div>
        )}
      </main>
    </>
  );
}
