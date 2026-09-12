import { Router, type Request, type Response } from "express";

import { generatePlayerProfile } from "../services/ai/profileService.js";
// @ts-ignore - scenarioService is an existing JavaScript AI service
import { generateScenario } from "../services/ai/scenarioService.js";

const router = Router();

router.post("/profile", async (req: Request, res: Response) => {
  try {
    const { inputText } = req.body;

    if (typeof inputText !== "string" || !inputText.trim()) {
      return res.status(400).json({
        error: "inputText is required.",
      });
    }

    const profile = await generatePlayerProfile(inputText.trim());

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    console.error("AI profile generation error:", error);

    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Unable to generate player profile.",
    });
  }
});

router.post("/scenario", async (req: Request, res: Response) => {
  try {
    const {
      profile,
      gameState,
      decisionHistory = [],
      memories = [],
      timeline = [],
    } = req.body;

    if (!profile) {
      return res.status(400).json({
        error: "profile is required.",
      });
    }

    if (!gameState) {
      return res.status(400).json({
        error: "gameState is required.",
      });
    }

    const scenario = await generateScenario({
      profile,
      gameState,
      decisionHistory,
      memories,
      timeline,
    });

    return res.status(200).json({
      scenario,
    });
  } catch (error) {
    console.error("AI scenario generation error:", error);

    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Unable to generate game scenario.",
    });
  }
});

export default router;