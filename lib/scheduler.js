import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import axios from "axios"; // For making API requests to social media platforms

const prisma = new PrismaClient();

// Function to publish a post
const publishPost = async (post) => {
  try {
    // Replace with the actual API call to the social media platform
    const response = await axios.post(
      `https://api.socialmedia.com/posts`,
      {
        content: post.content,
        mediaUrl: post.mediaUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${post.account.accessToken}`,
        },
      }
    );

    // Update the post status to "POSTED"
    await prisma.post.update({
      where: { id: post.id },
      data: {
        status: "POSTED",
        postedAt: new Date(),
      },
    });

    console.log(`Post ${post.id} published successfully.`);
  } catch (error) {
    console.error(`Failed to publish post ${post.id}:`, error);

    // Update the post status to "FAILED"
    await prisma.post.update({
      where: { id: post.id },
      data: {
        status: "FAILED",
      },
    });
  }
};

// Schedule a job to run every minute
cron.schedule("* * * * *", async () => {
  console.log("Checking for scheduled posts...");

  const posts = await prisma.post.findMany({
    where: {
      status: "PENDING",
      scheduledAt: {
        lte: new Date(), // Posts where scheduledAt is less than or equal to now
      },
    },
    include: {
      account: true, // Include the associated social media account
    },
  });

  for (const post of posts) {
    await publishPost(post);
  }
});

console.log("Scheduler started.");
