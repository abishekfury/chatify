import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied) {
      if (decision.reason.isRateLimit) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Access denied for bots." });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security rules." });
      }
    }

    // Additional check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "SpoofedBotDetected",
        message: "Access denied for spoofed bots.",
      });
    }
  } catch (error) {
    console.error("ArcJet protection error:", error);
    return res.status(500).json({ message: "Internal server error" });
    next();
  }
};
