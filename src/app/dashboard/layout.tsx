import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import DashboardNav from "@/components/DashboardNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <DashboardNav user={{ name: session.user.name ?? "Usuário", email: session.user.email, plan: session.user.plan }} />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
