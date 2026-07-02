"use client";

import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type Auth,
  type User,
} from "firebase/auth";

export type AuthProvider = "email" | "google";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  provider: AuthProvider;
  createdAt: string;
};

type FirebaseConfigResponse =
  | { enabled: false; missing?: string[] }
  | { enabled: true; config: FirebaseOptions };

type StoredUser = AuthUser & { password?: string };

const USERS_KEY = "yorisoi-auth-users-v1";
const SESSION_KEY = "yorisoi-auth-session-v1";
const DEFAULT_NAME = "よりそいユーザー";
const GOOGLE_NAME = "Googleユーザー";
const LOGIN_ERROR = "メールアドレスまたはパスワードが違います。";
const CONFIG_ERROR = "認証設定を読み込めませんでした。";

let firebaseConfigPromise: Promise<FirebaseConfigResponse> | null = null;
let firebaseAuthPromise: Promise<Auth | null> | null = null;

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function publicUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    createdAt: user.createdAt,
  };
}

function fromFirebaseUser(user: User, provider: AuthProvider): AuthUser {
  const session: AuthUser = {
    id: user.uid,
    name: user.displayName || user.email?.split("@")[0] || DEFAULT_NAME,
    email: user.email || "",
    provider,
    createdAt: user.metadata.creationTime
      ? new Date(user.metadata.creationTime).toISOString()
      : new Date().toISOString(),
  };
  safeWrite(SESSION_KEY, session);
  return session;
}

function mapAuthError(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code.includes("auth/configuration-not-found")) return "Firebase Authenticationの設定がまだ完了していません。";
  if (code.includes("auth/operation-not-allowed")) return "このログイン方法がまだ有効化されていません。";
  if (code.includes("auth/popup-closed-by-user")) return "Googleログインが閉じられました。";
  if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password")) return LOGIN_ERROR;
  if (code.includes("auth/email-already-in-use")) return "このメールアドレスはすでに登録されています。";
  if (code.includes("auth/weak-password")) return "パスワードは6文字以上で入力してください。";
  return error instanceof Error ? error.message : CONFIG_ERROR;
}

async function getFirebaseConfig(): Promise<FirebaseConfigResponse> {
  if (!firebaseConfigPromise) {
    firebaseConfigPromise = fetch("/api/auth/firebase-config", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(CONFIG_ERROR);
        return response.json() as Promise<FirebaseConfigResponse>;
      })
      .catch(() => ({ enabled: false }));
  }
  return firebaseConfigPromise;
}

async function getFirebaseAuth(): Promise<Auth | null> {
  if (!firebaseAuthPromise) {
    firebaseAuthPromise = (async () => {
      const response = await getFirebaseConfig();
      if (!response.enabled) return null;
      const app = getApps()[0] ?? initializeApp(response.config);
      const auth = getAuth(app);
      await setPersistence(auth, browserLocalPersistence);
      return auth;
    })();
  }
  return firebaseAuthPromise;
}

export function getCurrentSession(): AuthUser | null {
  return safeRead<AuthUser | null>(SESSION_KEY, null);
}

export async function signOut() {
  const auth = await getFirebaseAuth();
  if (auth?.currentUser) await firebaseSignOut(auth);
  if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
}

export async function registerWithEmail(input: { name: string; email: string; password: string }): Promise<AuthUser> {
  const auth = await getFirebaseAuth();
  if (auth) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, input.email.trim().toLowerCase(), input.password);
      const displayName = input.name.trim() || input.email.split("@")[0] || DEFAULT_NAME;
      if (displayName) await updateProfile(credential.user, { displayName });
      return fromFirebaseUser(credential.user, "email");
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  }

  const email = input.email.trim().toLowerCase();
  const users = safeRead<StoredUser[]>(USERS_KEY, []);
  const existing = users.find((user) => user.email === email);
  if (existing) {
    safeWrite(SESSION_KEY, publicUser(existing));
    return publicUser(existing);
  }
  const user: StoredUser = {
    id: `u-${Date.now()}`,
    name: input.name.trim() || email.split("@")[0] || DEFAULT_NAME,
    email,
    provider: "email",
    password: input.password,
    createdAt: new Date().toISOString(),
  };
  safeWrite(USERS_KEY, [user, ...users]);
  safeWrite(SESSION_KEY, publicUser(user));
  return publicUser(user);
}

export async function loginWithEmail(input: { email: string; password: string }): Promise<AuthUser> {
  const auth = await getFirebaseAuth();
  if (auth) {
    try {
      const credential = await signInWithEmailAndPassword(auth, input.email.trim().toLowerCase(), input.password);
      return fromFirebaseUser(credential.user, "email");
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  }

  const email = input.email.trim().toLowerCase();
  const users = safeRead<StoredUser[]>(USERS_KEY, []);
  const found = users.find((user) => user.email === email && user.password === input.password);
  if (!found) throw new Error(LOGIN_ERROR);
  const user = publicUser(found);
  safeWrite(SESSION_KEY, user);
  return user;
}

export async function continueWithGoogle(): Promise<AuthUser> {
  const auth = await getFirebaseAuth();
  if (auth) {
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      return fromFirebaseUser(credential.user, "google");
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  }

  const users = safeRead<StoredUser[]>(USERS_KEY, []);
  const email = "google-demo@yorisoi.local";
  const existing = users.find((user) => user.email === email);
  if (existing) {
    const user = publicUser(existing);
    safeWrite(SESSION_KEY, user);
    return user;
  }
  const user: StoredUser = {
    id: `u-google-${Date.now()}`,
    name: GOOGLE_NAME,
    email,
    provider: "google",
    createdAt: new Date().toISOString(),
  };
  safeWrite(USERS_KEY, [user, ...users]);
  safeWrite(SESSION_KEY, publicUser(user));
  return publicUser(user);
}
