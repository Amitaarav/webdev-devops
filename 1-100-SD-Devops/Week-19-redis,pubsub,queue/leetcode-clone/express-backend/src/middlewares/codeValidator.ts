import type { Request, Response, NextFunction } from "express";

export function validateCode(req: Request, res: Response, next: NextFunction) {
  const { code } = req.body;

  if (typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid code input. Expected non-empty string.",
    });
  }

  next();
}
