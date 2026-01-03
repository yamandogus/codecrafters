import { Router } from "express";
import { EventController } from "./controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";

const router = Router();
const controller = new EventController();

// Public routes
router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));

// Protected routes (Admin / Moderator only for management)
router.post(
    "/",
    authenticate,
    authorizeRoles("MODERATOR", "ADMIN"),
    (req, res) => controller.create(req, res)
);

router.put(
    "/:id",
    authenticate,
    authorizeRoles("MODERATOR", "ADMIN"), // Sadece yetkililer güncelleyebilir
    (req, res) => controller.update(req, res)
);

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("MODERATOR", "ADMIN"),
    (req, res) => controller.delete(req, res)
);

// Register/Unregister routes (User)
router.post("/:id/register", authenticate, (req, res) => controller.register(req, res));
router.delete("/:id/register", authenticate, (req, res) => controller.unregister(req, res));

export default router;
