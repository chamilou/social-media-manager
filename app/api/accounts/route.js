import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const accounts = await prisma.socialMediaAccount.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        platform: true,
        username: true,
      },
    });

    return new Response(JSON.stringify(accounts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch accounts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
