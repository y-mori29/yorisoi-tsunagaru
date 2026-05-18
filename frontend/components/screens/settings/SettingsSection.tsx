import type { ReactNode } from "react";

type SettingsSectionProps = {
  label: string;
  children: ReactNode;
};

export function SettingsSection({ label, children }: SettingsSectionProps) {
  return (
    <section className="settings-section">
      <div className="settings-section__label">{label}</div>
      <div className="settings-section__list">{children}</div>
    </section>
  );
}
