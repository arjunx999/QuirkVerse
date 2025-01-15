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
    const user = await User.findById(id).populate('followers', 'name picturePath');;

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
            user.followers = user.followers.filter((existingId) => existingId.toString() !== followerId);
            follower.following = follower.following.filter((existingId) => existingId.toString() !== id);
        } else {
            // friend does not exist so add
            user.followers.push(followerId);
            follower.following.push(id);
          }
        await user.save();
        await follower.save();
        res.status(200).json({ message: "Follower status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

// deleting a user
export const deleteUser = async (req, res) => {
    try {
        const { id }  = req.params

        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({message: "user not found"})
        }
        await User.findByIdAndDelete(id);

        // // Remove the post from users' saved or liked lists
        // await User.updateMany(
        //     { $or: [{ savedPosts: id }, { likedPosts: id }] },
        //     { $pull: { savedPosts: id, likedPosts: id } }
        // );

        res.status(200).json({message: "user deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}