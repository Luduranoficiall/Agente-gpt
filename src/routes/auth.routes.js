import { Router } from "express";
import { loginController, registerController, meController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", authMiddleware, meController);
export default router;