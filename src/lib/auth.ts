import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(name: string, email: string, password: string, plan = "TRIAL") {
  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      plan,
      trialEndsAt: plan === "TRIAL" ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) : null,
    },
  });
  // Create default account
  await prisma.account.create({
    data: {
      userId: user.id,
      name: "Conta Principal",
      type: "CHECKING",
      balance: 0,
      color: "#2563EB",
    },
  });
  // Create default categories
  const defaultCategories = [
    { name: "Salário", type: "INCOME", color: "#22c55e", icon: "💰" },
    { name: "Freelance", type: "INCOME", color: "#10b981", icon: "💻" },
    { name: "Alimentação", type: "EXPENSE", color: "#f59e0b", icon: "🍔" },
    { name: "Transporte", type: "EXPENSE", color: "#6366f1", icon: "🚗" },
    { name: "Moradia", type: "EXPENSE", color: "#ec4899", icon: "🏠" },
    { name: "Saúde", type: "EXPENSE", color: "#ef4444", icon: "🏥" },
    { name: "Lazer", type: "EXPENSE", color: "#8b5cf6", icon: "🎮" },
    { name: "Educação", type: "EXPENSE", color: "#0ea5e9", icon: "📚" },
  ];
  await prisma.category.createMany({
    data: defaultCategories.map((c) => ({ ...c, userId: user.id })),
  });
  return user;
}

export async function validateUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return user;
}

export function canAddTransaction(plan: string, transactionCount: number) {
  if (plan === "FREE" && transactionCount >= 20) return false;
  return true;
}

export function canAddAccount(plan: string, accountCount: number) {
  if (plan === "FREE" && accountCount >= 1) return false;
  return true;
}
