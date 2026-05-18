import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

type LifeItem = {
  icon: IconName;
  label: string;
  /** 補足（時間不変・数字なしで動詞中心） */
  hint?: string;
};

const ITEMS: LifeItem[] = [
  { icon: "moon", label: "夜に、よく ことばを 置いています", hint: "22 時 〜 0 時 が多い" },
  { icon: "leaf", label: "「わかる」を、いちばん よく 添えます" },
  { icon: "whisper", label: "そっと届く声を、ときどき 受け取っています" },
];

/**
 * /me の暮らしのログ。
 * 数字を出さず、時間不変な「あなたの 傾向」を 3 行で示す。
 * 月ごとに数字が変わると気が散る、というフィードバックを反映した版。
 */
export function LifeLogCard() {
  return (
    <section className="life-log">
      <h3 className="life-log__title">あなたの 暮らし</h3>
      <ul className="life-log__list">
        {ITEMS.map((it) => (
          <li key={it.label} className="life-log__item">
            <span className="life-log__icon">
              <Icon name={it.icon} size={18} />
            </span>
            <div className="life-log__text">
              <p className="life-log__label">{it.label}</p>
              {it.hint && <p className="life-log__hint">{it.hint}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
