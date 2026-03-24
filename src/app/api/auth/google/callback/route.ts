import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findOrCreateGoogleUser } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXTAUTH_URL ?? new URL(req.url).origin;
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error || !code || !state) {
    return NextResponse.redirect(`${appUrl}/login?error=google`);
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oauth_state")?.value;
  const plan = cookieStore.get("oauth_plan")?.value ?? "TRIAL";

  if (!savedState || state !== savedState) {
    return NextResponse.redirect(`${appUrl}/login?error=state`);
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${appUrl}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${appUrl}/login?error=token`);
  }

  const tokens = await tokenRes.json();

  // Get user info from Google
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const googleUser = await userRes.json();

  if (!googleUser.email || !googleUser.id) {
    return NextResponse.redirect(`${appUrl}/login?error=email`);
  }

  const user = await findOrCreateGoogleUser(
    googleUser.id,
    googleUser.email,
    googleUser.name ?? googleUser.email,
    plan
  );

  const token = await createSession(user.id);

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  cookieStore.delete("oauth_state");
  cookieStore.delete("oauth_plan");

  return NextResponse.redirect(`${appUrl}/dashboard`);
}
