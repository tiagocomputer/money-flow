import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });

    const existing = await getUserByEmail(email);
    if (existing)
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });

    const user = await createUser(name, email, password);
    const token = await createSession(user.id);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, plan: user.plan } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
