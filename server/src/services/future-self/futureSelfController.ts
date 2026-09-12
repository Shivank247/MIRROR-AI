import type { Request, Response } from "express";

import { FutureSelfService } from "./futureSelfService";
import { FutureSelfChatService } from "./futureSelfChatService";

import { grokFutureSelfReasoner } from "../ai/grokReasoner";
import { grokFutureSelfChatReasoner } from "../ai/grokChatReasoner";

const futureSelfService = new FutureSelfService(
  grokFutureSelfReasoner,
);

const futureSelfChatService =
  new FutureSelfChatService(
    grokFutureSelfChatReasoner,
  );

export async function generateFutureSelf(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const {
      profile,
      gameState,
      trajectory,
    } = req.body;

    if (!profile || !gameState) {
      res.status(400).json({
        error: "profile and gameState are required.",
      });

      return;
    }

    const futureSelf =
      await futureSelfService.generate({
        profile,
        gameState,
        trajectory:
          typeof trajectory === "string"
            ? trajectory
            : "Generated from the player's current gameplay trajectory.",
      });

    res.status(200).json({
      futureSelf,
    });
  } catch (error) {
    console.error(
      "Future Self generation failed:",
      error,
    );

    const message =
      error instanceof Error
        ? error.message
        : "Future Self generation failed.";

    res.status(500).json({
      error: message,
    });
  }
}

export async function chatFutureSelf(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const {
      futureSelf,
      question,
      context,
    } = req.body;

    if (!futureSelf) {
      res.status(400).json({
        error: "futureSelf is required.",
      });

      return;
    }

    if (
      typeof question !== "string" ||
      !question.trim()
    ) {
      res.status(400).json({
        error: "question is required.",
      });

      return;
    }

    if (!context) {
      res.status(400).json({
        error: "context is required.",
      });

      return;
    }

    const response =
      await futureSelfChatService.chat({
        futureSelf,
        question,
        context,
      });

    res.status(200).json({
      response,
    });
  } catch (error) {
    console.error(
      "Future Self chat failed:",
      error,
    );

    const message =
      error instanceof Error
        ? error.message
        : "Future Self chat failed.";

    res.status(500).json({
      error: message,
    });
  }
}