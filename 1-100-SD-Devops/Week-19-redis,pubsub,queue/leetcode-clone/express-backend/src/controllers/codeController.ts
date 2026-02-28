import { redisClient, redisSubscriber } from "../config/redis.js";
import type { Request, Response } from "express";
import { randomUUID } from "crypto";

// Pub/Sub model
export async function runCode(req: Request, res: Response) {
  try {

    const { code } = req.body;
    const jobId = randomUUID();

    const submission = { jobId, code };

    // 1. Push job to "submission" queue
    await redisClient.lPush("submission", JSON.stringify(submission));
    console.log(`New job submitted: ${jobId}`);

    // 2. Subscribe to the result channel for this job
    const channel = `result:${jobId}`;
    let responded = false;

    await redisSubscriber.subscribe(channel, async (message) => {
      if (responded) return; // avoid duplicate sends
      responded = true;

      const result = JSON.parse(message);
      res.json(result);

      // Cleanup subscription
      redisSubscriber.unsubscribe(channel).catch(console.error);
    });

    // 3. Timeout if worker doesn’t respond
    // setTimeout(async () => {
    //   if (!responded) {
    //     responded = true;
    //     await redisSubscriber.unsubscribe(channel);
    //     res.status(504).json({
    //       success: false,
    //       output: "Timeout waiting for worker response",
    //     });
    //   }
    // }, 6000);
  } catch (err) {
    console.error("runCode error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
