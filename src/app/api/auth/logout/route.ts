import { NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function POST() {
  const session = await getSession();
  if (session) await deleteSession(session.token);

  const cookieStore = await cookies();
  cookieStore.delete("session");
  return NextResponse.json({ success: true });
}
