import { connectRedis, redisClient } from "./config/redis.js";
import { executePythonCode } from "./services/codeExecuterService.js";
import type { Submission } from "./types/type.js";

async function startWorker() {
  await connectRedis();
  console.log("Worker started. Waiting for jobs...");

  while (true) {
    try {
      // 1. Blocking pop from "submission" queue
      const response = await redisClient.brPop("submission", 0);
      if (!response) continue;

      const submission: Submission = JSON.parse(response.element);
      console.log(`Processing job ${submission.jobId}`);

      //2 run python code with 3s timeout
      const result = await executePythonCode(submission);

      // 3. Save result back to redis 
      await redisClient.lPush(
        `results:${submission.jobId}`,
        JSON.stringify(result)
      );

      // Publish result to channel
      const channel = `result:${submission.jobId}`;
      await redisClient.publish(channel, JSON.stringify(result));

      console.log(
        `Job ${result.jobId} processed: ${result.success ? "SUCCESS" : "ERROR"}`
      );
    } catch (err) {
      console.error("Worker error:", err);
    }
  }
}

process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await redisClient.quit();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down worker...");
  await redisClient.quit();
  process.exit(0);
});

startWorker();
