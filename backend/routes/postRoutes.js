import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getPosts, getPostById, likePost, deletePost, getLikedPosts, getPostsFromFollowedUsers } from "../controllers/posts.js";

const router = express.Router();

// Create a post (authenticated)
router.post("/", verifyToken, createPost);

// Get all posts
router.get("/", getPosts);

// Get a specific post by ID
router.get("/:id", getPostById);

// Getting only Liked posts
router.get("/users/:userId/liked-posts", getLikedPosts);

// getting only posts from followed people
router.get("/users/:userId/following-posts", verifyToken, getPostsFromFollowedUsers);

// Like a post (authenticated)
router.patch("/posts/:postId/like", verifyToken, likePost);
// router.patch("/posts/:postId/like/:userId", likePost);

// Delete a post (authenticated)
router.delete("/:id", verifyToken, deletePost);

export default router;
