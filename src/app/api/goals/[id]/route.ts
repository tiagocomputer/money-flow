import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const goal = await prisma.goal.findFirst({ where: { id, userId: session.user.id } });
  if (!goal) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { currentAmount } = await req.json();
  const updated = await prisma.goal.update({
    where: { id },
    data: { currentAmount: parseFloat(currentAmount) },
  });

  if (updated.currentAmount >= updated.targetAmount) {
    await prisma.notification.create({
      data: { userId: session.user.id, type: "GOAL_REACHED", message: `Meta "${updated.name}" atingida! 🎉` },
    });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const goal = await prisma.goal.findFirst({ where: { id, userId: session.user.id } });
  if (!goal) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.goal.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
