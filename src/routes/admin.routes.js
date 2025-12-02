import { Router } from "express";
import { getUsers, getAgents, getLogs } from "../controllers/admin.controller.js";
const router = Router();
router.get("/users", getUsers);
router.get("/agents", getAgents);
router.get("/logs", getLogs);
export default router;
