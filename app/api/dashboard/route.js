import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // Get the userId from the query

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Fetch social media accounts for the logged-in user
    const socialMediaAccounts = await prisma.socialMediaAccount.findMany({
      where: { userId }, // Filter by userId
      include: {
        analytics: true,
        posts: true,
      },
    });

    // Fetch posts for the logged-in user
    const posts = await prisma.post.findMany({
      where: { userId }, // Filter by userId
      include: {
        account: true,
      },
    });

    // Fetch analytics for the logged-in user
    const analytics = await prisma.analytics.findMany({
      where: { account: { userId } }, // Filter by userId
      include: {
        account: true,
      },
    });

    return new Response(
      JSON.stringify({ socialMediaAccounts, posts, analytics }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
