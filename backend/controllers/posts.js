import { Post } from "../models/post.js"

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

// update likes on a post 
export const likePost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        if(!post) {
            return res.status(404).json({message: "post not found"})
        }

        post.likes += 1
        const updatedPost = await post.save()
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

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