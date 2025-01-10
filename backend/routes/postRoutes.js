import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getPosts, getPostById, likePost, deletePost, getLikedPosts, getPostsFromFollowedUsers, savePost, getSavedPosts } from "../controllers/posts.js";

const router = express.Router();

// Create a post (authenticated)
// router.post("/", verifyToken, createPost);
router.post("/create", verifyToken, createPost);

// Get all posts
router.get("/", getPosts);

// Get a specific post by ID
router.get("/:id", getPostById);

// Getting only Liked posts
router.get("/users/:userId/liked-posts", verifyToken, getLikedPosts);

// getting only posts from followed people
router.get("/users/:userId/following-posts", verifyToken, getPostsFromFollowedUsers);

// Like a post (authenticated)
router.patch("/:postId/like", verifyToken, likePost);
// router.patch("/posts/:postId/like/:userId", likePost);

// Like a save (authenticated)
router.patch("/:postId/save", verifyToken, savePost);

// getting saved posts
router.get("/users/:userId/saved-posts", verifyToken, getSavedPosts);

// Delete a post (authenticated)
router.delete("/:id", verifyToken, deletePost);

export default router;
