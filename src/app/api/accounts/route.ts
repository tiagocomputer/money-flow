import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { canAddAccount } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const accounts = await prisma.account.findMany({ where: { userId: session.user.id } });
  return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const plan = session.user.plan;
  const count = await prisma.account.count({ where: { userId } });

  if (!canAddAccount(plan, count))
    return NextResponse.json({ error: "Limite do plano FREE: 1 conta. Faça upgrade para PRO." }, { status: 403 });

  const { name, type, balance, color } = await req.json();
  const account = await prisma.account.create({
    data: { userId, name, type: type ?? "CHECKING", balance: parseFloat(balance ?? 0), color },
  });
  return NextResponse.json(account, { status: 201 });
}
