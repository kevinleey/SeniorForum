import express from "express";
import { postsController } from "../controllers/postsController.js";
const router = express.Router();

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.get("/:id/comments", postsController.getCommentsByPostId);
router.post("/", postsController.addPost);
router.post("/:id/comments", postsController.addComment);
router.put("/:id", postsController.editPost);

export default router;
