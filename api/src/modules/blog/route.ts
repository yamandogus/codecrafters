import { Router } from "express";
import { BlogController } from "./controller.js";
import { authenticate, authorizeRoles } from "../../middleware/auth.js";

const router = Router();
const controller = new BlogController();

// Public routes
router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));

// Protected routes
router.post(
    "/",
    authenticate,
    authorizeRoles("MODERATOR", "ADMIN"),
    (req, res) => controller.create(req, res)
);

router.put(
    "/:id",
    authenticate,
    (req, res) => controller.update(req, res)
);

router.delete(
    "/:id",
    authenticate,
    (req, res) => controller.delete(req, res)
);

export default router;
