import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Webhook is active");
});

router.post("/", (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).send("RECEIVED");
});

export default router;
