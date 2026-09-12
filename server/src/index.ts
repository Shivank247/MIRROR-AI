import express, { type Request, type Response } from "express";

import futureSelfRoutes from "./routes/futureSelf.routes";

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/future-self", futureSelfRoutes);

app.listen(PORT, () => {
  console.log(
    `MIRROR//AI server running on http://localhost:${PORT}`,
  );
});