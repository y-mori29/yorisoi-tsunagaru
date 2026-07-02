"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { INITIAL_STATE, type OnboardingState } from "./types";
import { clearOnboardingState, readOnboardingState, writeOnboardingState } from "./storage";

type Ctx = {
  state: OnboardingState;
  update: (patch: Partial<OnboardingState>) => void;
  patchProfile: (patch: Partial<OnboardingState["profile"]>) => void;
  reset: () => void;
};

const OnboardingContext = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(() => readOnboardingState());

  const update = (patch: Partial<OnboardingState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      writeOnboardingState(next);
      return next;
    });
  };

  const patchProfile = (patch: Partial<OnboardingState["profile"]>) => {
    setState((prev) => {
      const next = { ...prev, profile: { ...prev.profile, ...patch } };
      writeOnboardingState(next);
      return next;
    });
  };

  const reset = () => {
    clearOnboardingState();
    setState(INITIAL_STATE);
  };

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
