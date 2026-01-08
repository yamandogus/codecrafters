import { Router } from "express";
import { DashboardController } from "./controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();
const controller = new DashboardController();

router.get("/user", authenticate, (req, res) => controller.getUserDashboard(req, res));

export default router;
