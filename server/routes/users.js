import express from "express";
import { usersController } from "../controllers/usersController.js";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;
const router = express.Router();

router.get("/me", requiresAuth(), usersController.getProfile);
router.put("/me", requiresAuth(), usersController.editProfile);
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);

export default router;