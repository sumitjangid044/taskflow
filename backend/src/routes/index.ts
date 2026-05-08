import { Router } from "express";

import authRouter from "./auth.routes";

const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "TaskFlow API",
    timestamp: new Date().toISOString(),
  });
});

apiRouter.use("/auth", authRouter);

export default apiRouter;
