import express from "express";
import { usersController } from "../controllers/usersController.js";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;
const router = express.Router();

router.get("/me/:userID", usersController.getProfile);
router.get("/me", usersController.getProfile);
router.put("/me/:userID", usersController.editProfile);
router.put("/me", requiresAuth(), usersController.editProfile);
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);

export default router;
