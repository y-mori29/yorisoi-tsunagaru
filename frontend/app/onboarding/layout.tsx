import { OnboardingProvider } from "@/lib/onboarding/context";

/**
 * オンボーディング全画面で OnboardingContext を共有するための layout。
 * /onboarding/* 配下すべてで useOnboarding() が使える。
 */
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
