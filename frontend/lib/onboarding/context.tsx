"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { INITIAL_STATE, type OnboardingState } from "./types";

type Ctx = {
  state: OnboardingState;
  update: (patch: Partial<OnboardingState>) => void;
  patchProfile: (patch: Partial<OnboardingState["profile"]>) => void;
  reset: () => void;
};

const OnboardingContext = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(INITIAL_STATE);

  const update = (patch: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const patchProfile = (patch: Partial<OnboardingState["profile"]>) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  };

  const reset = () => setState(INITIAL_STATE);

  return (
    <OnboardingContext.Provider value={{ state, update, patchProfile, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding は OnboardingProvider の中で使ってください");
  }
  return ctx;
}
