import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Dashboard from "../components/dashboard/Dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return <Dashboard />;
}
