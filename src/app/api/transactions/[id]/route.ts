import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const tx = await prisma.transaction.findFirst({ where: { id, userId: session.user.id } });
  if (!tx) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Revert balance
  const delta = tx.type === "INCOME" ? -tx.amount : tx.amount;
  await prisma.account.update({ where: { id: tx.accountId }, data: { balance: { increment: delta } } });
  await prisma.transaction.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
