"use client";

import { INITIAL_STATE, createInitialHealthContext, type MemberHealthContext, type OnboardingState } from "./types";

const STORAGE_KEY = "yorisoi-tsunagaru:onboarding:v1";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function normalizeHealthContext(value: unknown): MemberHealthContext {
  if (!isRecord(value)) return createInitialHealthContext();

  const initial = createInitialHealthContext();
  return {
    ...initial,
    ...value,
    primaryDisease: isRecord(value.primaryDisease) ? (value.primaryDisease as MemberHealthContext["primaryDisease"]) : null,
    secondaryDiseases: Array.isArray(value.secondaryDiseases)
      ? (value.secondaryDiseases as MemberHealthContext["secondaryDiseases"])
      : [],
    symptoms: Array.isArray(value.symptoms) ? (value.symptoms as MemberHealthContext["symptoms"]) : [],
    concerns: Array.isArray(value.concerns) ? (value.concerns as MemberHealthContext["concerns"]) : [],
    diagnosisStatus:
      value.diagnosisStatus === "diagnosed" ||
      value.diagnosisStatus === "suspected" ||
      value.diagnosisStatus === "pending" ||
      value.diagnosisStatus === "unknown"
        ? value.diagnosisStatus
        : initial.diagnosisStatus,
    visibility:
      value.visibility === "private" || value.visibility === "room_members" || value.visibility === "matched_members"
        ? value.visibility
        : initial.visibility,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : initial.updatedAt,
  };
}

export function normalizeOnboardingState(value: unknown): OnboardingState {
  if (!isRecord(value)) return INITIAL_STATE;

  return {
    ...INITIAL_STATE,
    ...value,
    purposes: Array.isArray(value.purposes) ? (value.purposes as OnboardingState["purposes"]) : [],
    conditions: Array.isArray(value.conditions) ? (value.conditions as string[]) : [],
    conditionDeclined: typeof value.conditionDeclined === "boolean" ? value.conditionDeclined : false,
    healthContext: normalizeHealthContext(value.healthContext),
    preferences: isRecord(value.preferences) ? (value.preferences as OnboardingState["preferences"]) : {},
    profile: isRecord(value.profile) ? { ...INITIAL_STATE.profile, ...value.profile } : INITIAL_STATE.profile,
  };
}

export function readOnboardingState(): OnboardingState {
  if (typeof window === "undefined") return INITIAL_STATE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeOnboardingState(JSON.parse(raw)) : INITIAL_STATE;
  } catch {
    return INITIAL_STATE;
  }
}

export function writeOnboardingState(state: OnboardingState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeOnboardingState(state)));
}

export function clearOnboardingState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
