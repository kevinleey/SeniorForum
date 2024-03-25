import express from "express";
import { postsController } from "../controllers/postsController.js";
const router = express.Router();

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.get("/:id/comments", postsController.getCommentsByPostId);
router.post("/", postsController.addPost);
router.post("/:id/comments", postsController.addComment);
router.put("/:id/comments/:id", postsController.editComment);
router.put("/:id", postsController.editPost);
router.delete("/delete/:id", postsController.deletePost);

export default router;
