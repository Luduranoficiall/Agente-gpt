import { Router } from "express";
import { getUsers, toggleUser, getAgents, getLogs, getAnalytics } from "../controllers/admin.controller.js";

const router = Router();



router.get("/users", getUsers);
router.put("/users/:id/toggle", toggleUser);
router.get("/agents", getAgents);
router.get("/logs", getLogs);
router.get("/analytics", getAnalytics);

export default router;
