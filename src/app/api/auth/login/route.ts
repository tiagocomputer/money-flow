import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });

    const user = await validateUser(email, password);
    if (!user)
      return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 });

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
