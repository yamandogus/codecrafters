import { Router } from "express";
import { ForumController } from "./controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();
const controller = new ForumController();

// Public routes
router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));

// Protected routes (User)
router.post("/", authenticate, (req, res) => controller.create(req, res));
router.put("/:id", authenticate, (req, res) => controller.update(req, res));
router.delete("/:id", authenticate, (req, res) => controller.delete(req, res));

export default router;
