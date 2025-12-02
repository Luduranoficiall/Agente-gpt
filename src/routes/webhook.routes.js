import { Router } from "express";
import { pixWebhook } from "../controllers/webhook.controller.js";
const router = Router();
router.post("/pix", pixWebhook);
export default router;