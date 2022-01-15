import express from "express";
import {
  allPosts,
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controller";
import loginRequired from "../middleware/loginRequired";

const router = express.Router();

router.get("/", allPosts);
router.get("/:id([0-9]+)", getPost);
router.post("/", loginRequired, createPost);
router.delete("/:id([0-9]+)", loginRequired, deletePost);
router.patch("/:id([0-9]+)", loginRequired, updatePost);
router.put("/:id([0-9]+)", loginRequired, updatePost);

export default router;
