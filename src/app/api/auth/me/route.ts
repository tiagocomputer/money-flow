import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, plan: user.plan, trialEndsAt: user.trialEndsAt });
}
