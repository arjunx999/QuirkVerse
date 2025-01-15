import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUser, getUserFollowers, addRemoveFollower, getAllUsers, deleteUser } from "../controllers/users.js";

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get user details by ID
router.get("/:id", verifyToken, getUser);

// Get user's followers
router.get("/:id/followers", getUserFollowers);

// Add or remove a follower (authenticated)
router.patch("/:id/:followerId", verifyToken, addRemoveFollower);

// delete a user 
// router.delete("/:id", deleteUser);

export default router;
