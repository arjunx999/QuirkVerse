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

// Editing a post
export const editPost = async (req, res) => {
  try {
    const { title, content, author, pictureUrl } = req.body;
    const { id } = req.params;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const postAfterUpdate = await Post.findByIdAndUpdate(
      id,
      { title, content, author, pictureUrl },
      { new: true }
    );

    if (!postAfterUpdate) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    return res.status(200).json({ 
      message: "Post Updated Successfully", 
      post: postAfterUpdate 
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: error.message });
  }
};


//  read all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username picturePath").sort({ createdAt: -1 });
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
  
      const user = await User.findById(userId).populate({
        path: "likedPosts",
        populate: {
          path: "author",
          select: "username picturePath",
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
    //   console.log(user)
    //   console.log(user.liked)
      await user.save()
      res.status(200).json(user.likedPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};  

// reading trending posts
export const getTrendingPosts = async (req, res) => {
  try {
    const posts = await Post.find({ likes: { $gt: 0 } }) // Filter posts with likes > 0
      .populate("author", "username picturePath")
      .sort({ likes: -1 });

    res.status(200).json(posts);
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
  
// update likes on a post AND IN THE USER'S DATABASE AS WELL
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params; 
        // const userId = req.user.id;
        const { userId } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const alreadyLiked = post.likedBy.includes(userId);

        if (alreadyLiked) {
            post.likes -=1;
            post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
        } else {
            post.likes +=1;
            post.likedBy.push(userId);
        }
        const updatedPost = await post.save();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const postIndex = user.likedPosts.indexOf(postId);

        if (postIndex === -1) {
        user.likedPosts.push(postId);
        } else {
        user.likedPosts.splice(postIndex, 1);
        }
        await user.save(); 

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// saving a post
export const savePost = async (req, res) => {
    const { postId } = req.params
    const { userId } = req.body
    try {
        const post = await Post.findById(postId)
        const user = await User.findById(userId)
        if(!post) {
            return res.status(404).json({ message: "Post Not Found" })
        }
        
        if (user.savedPosts.includes(postId)) {
            user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
          } else {
            // Save
            user.savedPosts.push(postId);
          }   
          await user.save()
          const updatedPost = await post.save();
          res.status(200).json(updatedPost) 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// fetching saved posts
export const getSavedPosts = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate({
        path: "savedPosts",
        populate: {
          path: "author",
          select: "username picturePath",
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
    //   console.log(user.savedPosts)
      res.status(200).json(user.savedPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// deleting a post
export const deletePost = async (req, res) => {
    try {
        const { id }  = req.params

        const post = await Post.findById(id)
        if(!post) {
            return res.status(404).json({message: "post not found"})
        }
        await Post.findByIdAndDelete(id);

        // Remove the post from users' saved or liked lists
        await User.updateMany(
            { $or: [{ savedPosts: id }, { likedPosts: id }] },
            { $pull: { savedPosts: id, likedPosts: id } }
        );

        res.status(200).json({message: "post deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Fetch all posts created by a specific user
export const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ author: userId }).populate("author", "username picturePath").sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};