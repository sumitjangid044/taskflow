import { Router } from "express";

import { login, logout, me, register } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { loginValidator, registerValidator } from "../validators/auth.validators";

const authRouter = Router();

authRouter.post("/signup", registerValidator, validateRequest, register);
authRouter.post("/login", loginValidator, validateRequest, login);
authRouter.get("/me", protect, me);
authRouter.post("/logout", protect, logout);

export default authRouter;
