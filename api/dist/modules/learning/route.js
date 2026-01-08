import { Router } from "express";
import { LearningController } from "./controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";
const router = Router();
const controller = new LearningController();
// Public routes
router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
// Protected routes (Admin only)
router.post("/", authenticate, authorizeRoles("ADMIN", "MODERATOR"), (req, res) => controller.create(req, res));
router.put("/:id", authenticate, authorizeRoles("ADMIN"), (req, res) => controller.update(req, res));
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), (req, res) => controller.delete(req, res));
export default router;
