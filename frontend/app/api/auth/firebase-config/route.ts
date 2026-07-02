import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function readEnv(name: string) {
  return process.env[name] || process.env[`NEXT_PUBLIC_${name}`] || "";
}

export function GET() {
  const apiKey = readEnv("FIREBASE_API_KEY");
  const projectId = readEnv("FIREBASE_PROJECT_ID");
  const authDomain = readEnv("FIREBASE_AUTH_DOMAIN");

  if (!apiKey || !projectId || !authDomain) {
    return NextResponse.json({
      enabled: false,
      missing: [
        !apiKey ? "FIREBASE_API_KEY" : null,
        !projectId ? "FIREBASE_PROJECT_ID" : null,
        !authDomain ? "FIREBASE_AUTH_DOMAIN" : null,
      ].filter(Boolean),
    });
  }

  return NextResponse.json({
    enabled: true,
    config: {
      apiKey,
      projectId,
      authDomain,
      appId: readEnv("FIREBASE_APP_ID") || undefined,
      messagingSenderId: readEnv("FIREBASE_MESSAGING_SENDER_ID") || undefined,
      storageBucket: readEnv("FIREBASE_STORAGE_BUCKET") || undefined,
    },
  });
}
