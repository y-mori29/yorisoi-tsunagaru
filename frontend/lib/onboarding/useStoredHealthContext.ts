"use client";

import { useEffect, useState } from "react";
import { readOnboardingState } from "./storage";
import { createInitialHealthContext, type MemberHealthContext } from "./types";

export function useStoredHealthContext() {
  const [healthContext, setHealthContext] = useState<MemberHealthContext>(() => createInitialHealthContext());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHealthContext(readOnboardingState().healthContext);
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return { healthContext, loaded };
}
