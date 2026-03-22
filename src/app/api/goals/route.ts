import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const goals = await prisma.goal.findMany({ where: { userId: session.user.id } });
  return NextResponse.json(goals);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, targetAmount, currentAmount, deadline } = await req.json();
  const goal = await prisma.goal.create({
    data: {
      userId: session.user.id,
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount ?? 0),
      deadline: deadline ? new Date(deadline) : null,
    },
  });
  return NextResponse.json(goal, { status: 201 });
}
