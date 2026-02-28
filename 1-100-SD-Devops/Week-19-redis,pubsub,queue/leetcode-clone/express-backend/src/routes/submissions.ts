import { redisClient } from "../config/redis.js";
import type { Request, Response } from "express";

export async function getSubmissions(req: Request, res: Response) {
  try {
    
    const submissions = await redisClient.lRange("submissions_list", 0, 49); // last 50

    const parsed = submissions.map((s) => {
      try {
        return JSON.parse(s);
      } catch {
        return { error: "Corrupted submission entry" };
      }
    });
    res.json(parsed);
  } catch (err) {
    console.error("getSubmissions error:", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
}
