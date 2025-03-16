import { Queue, Worker, FlowProducer } from "bullmq";
import IORedis from "ioredis";

// Update Redis options
const connection = new IORedis("redis://192.168.50.184:6379", {
  maxRetriesPerRequest: null, // Set this option to null
});

// Create a job queue
export const postQueue = new Queue("postQueue", { connection });

// FlowProducer to manage job scheduling
const flowProducer = new FlowProducer({ connection });

// Worker to process jobs
new Worker(
  "postQueue",
  async (job) => {
    console.log(`Processing job: ${job.id}`, job.data);

    // Simulate posting to social media
    if (job.data.content) {
      console.log(`Posting content: ${job.data.content}`);
      return { status: "success", message: "Post uploaded!" };
    } else {
      throw new Error("Missing content");
    }
  },
  { connection }
);

// Example of adding a job to the queue
async function addJob() {
  const jobs = await flowProducer.add("postQueue", [
    {
      name: "socialMediaPost",
      data: { content: "Hello world, this is my first post!" },
    },
  ]);

  console.log("Job added:", jobs);
}

// Call addJob to add a post
addJob();
