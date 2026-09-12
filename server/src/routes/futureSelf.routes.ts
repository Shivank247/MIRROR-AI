import { Router } from "express";

import {
  generateFutureSelf,
  chatFutureSelf,
} from "../services/future-self/futureSelfController";

const router = Router();

router.post(
  "/generate",
  generateFutureSelf,
);

router.post(
  "/chat",
  chatFutureSelf,
);

export default router;