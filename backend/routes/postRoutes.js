import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getPosts, getPostById, likePost, deletePost } from "../controllers/posts.js";

const router = express.Router();

// Create a post (authenticated)
router.post("/", verifyToken, createPost);

// Get all posts
router.get("/", getPosts);

// Get a specific post by ID
router.get("/:id", getPostById);

// Like a post (authenticated)
router.patch("/:id/like", verifyToken, likePost);

// Delete a post (authenticated)
router.delete("/:id", verifyToken, deletePost);

export default router;
