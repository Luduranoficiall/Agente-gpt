import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();
router.post("/", authMiddleware, chatController);
export default router;
