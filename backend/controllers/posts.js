import { Post } from "../models/post.js"
import { User } from "../models/user.js"

// creating a post 
export const createPost = async (req, res) => {
    try {
        const { title, content, author, pictureUrl } = req.body

        const newPost = new Post({
            title,
            content,
            author,
            pictureUrl,
        })

        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//  read all posts
export const getPosts = async (Req, res) => {
    try {
        const posts = await Post.find().populate("author", "username picturePath");
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// reading a particular post
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id).populate("author", "username picturePath");
        if(!post) {
            return res.status(404).json({message: "post not found"})
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// reading  only liked posts
export const getLikedPosts = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate("likedPosts");
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json(user.likedPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};  

// Fetch posts from followed users
export const getPostsFromFollowedUsers = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user and get their "following" list
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Fetch posts where the author is in the user's "following" list
      const posts = await Post.find({ author: { $in: user.following } }).populate("author", "username");
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
};
  
// update likes on a post 
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params; 
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const alreadyLiked = post.likedBy.includes(userId);

        if (alreadyLiked) {
            post.likes -= 1;
            post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
        } else {
            post.likes += 1;
            post.likedBy.push(userId);
        }

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// deleting a post
export const deletePost = async (req, res) => {
    try {
        const { id }  = req.params

        const post = await Post.findByIdAndDelete(id)
        if(!post) {
            return res.status(404).json({message: "post not found"})
        }
        res.status(200).json({message: "post deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}