import { Router } from "express";
import { gerarPix } from "../controllers/pagamento.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();
router.post("/gerar", authMiddleware, gerarPix);
export default router;