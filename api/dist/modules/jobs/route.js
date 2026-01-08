import { Router } from "express";
import { JobController } from "./controller.js";
import { authenticate, authorizeRoles } from "../../middleware/auth.js";
const router = Router();
const controller = new JobController();
// Public routes
router.get("/", (req, res) => controller.getAll(req, res));
// Protected routes (User)
router.get("/applications/me", authenticate, (req, res) => controller.getMyApplications(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
// Admin routes
router.post("/", authenticate, authorizeRoles("ADMIN"), (req, res) => controller.create(req, res));
router.put("/:id", authenticate, authorizeRoles("ADMIN"), (req, res) => controller.update(req, res));
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), (req, res) => controller.delete(req, res));
router.get("/:id/applications", authenticate, authorizeRoles("ADMIN"), (req, res) => controller.getApplications(req, res));
// User routes
router.post("/:id/apply", authenticate, (req, res) => controller.apply(req, res));
export default router;
