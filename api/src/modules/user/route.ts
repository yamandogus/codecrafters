import { Router } from "express";
import { UserController } from "./controller";
import { authenticate } from "../../middleware/auth";

const router = Router();
const userController = new UserController();

// Korumalı rotalar (authentication gerekli)
router.get("/me", authenticate, (req, res) => userController.getProfile(req, res));
router.get("/profile", authenticate, (req, res) => userController.getProfile(req, res));
router.put("/profile", authenticate, (req, res) => userController.updateProfile(req, res));
router.put("/change-password", authenticate, (req, res) => userController.changePassword(req, res));

// Genel rotalar (herkese açık)
router.get("/list", (req, res) => userController.getUsers(req, res));
router.get("/:username", (req, res) => userController.getUserByUsername(req, res));

export default router;