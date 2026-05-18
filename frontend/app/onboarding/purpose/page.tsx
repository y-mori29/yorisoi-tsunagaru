"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";
import { OnboardingShell } from "@/components/screens/onboarding/OnboardingShell";
import { CheckOption } from "@/components/screens/onboarding/CheckOption";
import { nextStep } from "@/lib/onboarding/routing";
import type { PurposeId } from "@/lib/onboarding/types";

const PURPOSES: Array<{ id: PurposeId; label: string; sub?: string }> = [
  { id: "same-condition", label: "同じ病気の方と、ことばを 交わしたい" },
  {
    id: "same-rhythm",
    label: "似た 生活リズムの方と、つながりたい",
    sub: "（朝型・夜型・通院ペース など）",
  },
  { id: "same-thinking", label: "考え方が 近い方と、ゆっくり 話したい" },
  { id: "consult-self", label: "相談したい" },
  { id: "consult-others", label: "相談に 乗りたい" },
  { id: "observe", label: "他の方の 体験や工夫を、見たい" },
  { id: "drift", label: "決めずに、ふらっと 過ごしたい" },
];

/**
 * /onboarding/purpose — 「ここで、何を したいですか？」
 * 複数選択チェックボックス。「決めずに」を選ぶと他がクリアされ、
 * 逆に他を選ぶと「決めずに」が外れる排他ロジック。
 */
export default function PurposePage() {
  const router = useRouter();
  const { state, update } = useOnboarding();

  const toggle = (id: PurposeId) => {
    const isOn = state.purposes.includes(id);
    let next: PurposeId[];

    if (id === "drift") {
      // 「決めずに」をオンにするときは他をクリア、オフにするときはただ消す
      next = isOn ? [] : ["drift"];
    } else {
      next = isOn ? state.purposes.filter((p) => p !== id) : [...state.purposes, id];
      // 他を選んだら「決めずに」を外す
      next = next.filter((p) => p !== "drift");
    }

    update({ purposes: next });
  };

  const onContinue = () => {
    router.push(nextStep("/onboarding/purpose", state.purposes));
  };

  return (
    <OnboardingShell current="/onboarding/purpose" showBack backHref="/onboarding">
      <h2 className="onboarding-section-title">ここで、何を したいですか？</h2>
      <p className="onboarding-section-sub">
        当てはまるものを、いくつでも 選んでください。
        <br />
        あとから 変えられます。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PURPOSES.map((p) => (
          <CheckOption
            key={p.id}
            label={p.label}
            sub={p.sub}
            checked={state.purposes.includes(p.id)}
            onChange={() => toggle(p.id)}
          />
        ))}
      </div>

      <div className="onboarding-footer">
        <button type="button" className="btn btn--primary btn--full" onClick={onContinue}>
          進む
        </button>
        <p style={{ font: "400 11px/1.6 var(--font-jp)", color: "var(--color-ink-300)", textAlign: "center", letterSpacing: "0.04em" }}>
          何も 選ばずに、進んでも 大丈夫です。
        </p>
      </div>
    </OnboardingShell>
  );
}
