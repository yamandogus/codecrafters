import { Router } from "express";
import { DashboardController } from "./controller";
import { authenticate } from "../../middleware/auth";
const router = Router();
const controller = new DashboardController();
router.get("/user", authenticate, (req, res) => controller.getUserDashboard(req, res));
export default router;
