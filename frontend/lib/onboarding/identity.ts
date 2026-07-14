import type { AuthUser } from "@/lib/auth/local-auth";
import type { AnimalName } from "@/lib/icons";
import type { OnboardingState } from "@/lib/onboarding/types";

type AvatarTone = NonNullable<OnboardingState["profile"]["avatarTone"]>;

export type MemberIdentity = {
  displayName: string;
  animal: AnimalName;
  avatarTone: AvatarTone;
  avatarSrc: string;
};

const NAMES = ["こもれび", "そらいろ", "つむぎ", "あさつゆ", "なぎ", "ひだまり", "しずく", "こはる"] as const;
const ANIMALS: AnimalName[] = ["rabbit", "bear", "cat", "bird", "fox", "owl", "turtle", "hedgehog"];
const TONES: AvatarTone[] = ["terra", "moss", "plum", "gold", "default"];

function hashSeed(seed: string) {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

export function createAutomaticIdentity(seed: string): MemberIdentity {
  const hash = hashSeed(seed || "yorisoi-member");
  const animal = ANIMALS[hash % ANIMALS.length];
  return {
    displayName: NAMES[hash % NAMES.length],
    animal,
    avatarTone: TONES[Math.floor(hash / ANIMALS.length) % TONES.length],
    avatarSrc: `/assets/animals/${animal}.png`,
  };
}

export function resolveMemberIdentity(
  session: AuthUser | null,
  state: OnboardingState,
): MemberIdentity {
  const automatic = createAutomaticIdentity(session?.id || "yorisoi-member");
  const animal = state.profile.animal ?? automatic.animal;
  return {
    displayName: state.profile.displayName?.trim() || automatic.displayName,
    animal,
    avatarTone: state.profile.avatarTone ?? automatic.avatarTone,
    avatarSrc: `/assets/animals/${animal}.png`,
  };
}
