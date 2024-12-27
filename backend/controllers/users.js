import { User } from "../models/user.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field for security
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ a particular user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// getting followers
export const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user.followers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// managing followers
export const addRemoveFollower = async (req, res) => {
    try {
        const { id, followerId } = req.params
        const user = await User.findById(id)
        const follower = await User.findById(followerId)

        if(user.followers.includes(followerId)) {
            // friend already exists so remove
            user.followers = user.followers.filter((id) => id !== followerId);
            follower.followers = follower.followers.filter((id) => id !== id);
        } else {
            // friend does not exist so add
            user.followers.push(followerId);
            follower.followers.push(id);
          }
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}