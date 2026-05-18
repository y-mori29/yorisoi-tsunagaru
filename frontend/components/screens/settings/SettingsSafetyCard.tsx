import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

type SafetyItem = {
  icon: IconName;
  title: string;
  sub: string;
};

type Props = {
  title: string;
  intro: string;
  items: SafetyItem[];
};

/**
 * 「おまもりの しくみ」カード。
 * 月次のレポート（数字が毎月変わる）ではなく、常設の「仕組み紹介」。
 * コミュニケーション安心 + セキュリティ／プライバシー安心 の両面を、
 * 数字なしで端的に伝える。
 */
export function SettingsSafetyCard({ title, intro, items }: Props) {
  return (
    <div className="safety-card">
      <h2 className="safety-card__title">{title}</h2>
      <p className="safety-card__intro">{intro}</p>
      <ul className="safety-card__items">
        {items.map((it) => (
          <li key={it.title} className="safety-card__item">
            <span className="safety-card__icon" aria-hidden>
              <Icon name={it.icon} />
            </span>
            <div className="safety-card__text">
              <div className="safety-card__item-title">{it.title}</div>
              <div className="safety-card__item-sub">{it.sub}</div>
            </div>
          </li>
        ))}
      </ul>
      <Image
        src="/assets/heroes/voice-letter.png"
        alt=""
        width={130}
        height={98}
        className="safety-card__motif"
        aria-hidden
        priority={false}
      />
    </div>
  );
}
