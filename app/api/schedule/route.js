import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { accountId, content, mediaUrl, scheduledAt } = await req.json();

  // Log the payload for debugging
  console.log("Request Payload:", {
    accountId,
    content,
    mediaUrl,
    scheduledAt,
  });

  if (!accountId) {
    return new Response(JSON.stringify({ error: "accountId is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        user: {
          connect: {
            id: session.user.id, // ✅ Correct way to associate the user
          },
        },
        account: {
          connect: {
            id: accountId, // ✅ Correct way to associate the account
          },
        },
        content,
        mediaUrl,
        scheduledAt: new Date(scheduledAt),
        status: "PENDING",
      },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error scheduling post:", error);
    return new Response(JSON.stringify({ error: "Failed to schedule post" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
