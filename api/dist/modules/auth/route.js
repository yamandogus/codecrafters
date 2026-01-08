import { Router } from "express";
import { AuthController } from "./controller.js";
const router = Router();
const ctrl = new AuthController();
router.post("/register", (req, res) => ctrl.register(req, res));
router.post("/login", (req, res) => ctrl.login(req, res));
router.post("/refresh", (req, res) => ctrl.refresh(req, res));
export default router;
