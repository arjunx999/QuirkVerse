import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUser, getUserFollowers, addRemoveFollower } from "../controllers/users.js";

const router = express.Router();

// Get user details by ID
router.get("/:id", getUser);

// Get user's followers
router.get("/:id/followers", getUserFollowers);

// Add or remove a follower (authenticated)
router.patch("/:id/:followerId", verifyToken, addRemoveFollower);

export default router;
