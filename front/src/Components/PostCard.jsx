import React from 'react'
import { useAppContext } from '../Contexts/UserContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const PostCard = ({post}) => {
    const token = sessionStorage.getItem("token");
    const { user, setUser } = useAppContext();
    const { posts, setPosts } = useAppContext();
    // console.log(post)
    // console.log(user)
    const isLiked = user.likedPosts.includes(post._id)
    // console.log(isLiked)
    const isSaved = user.savedPosts.includes(post._id)
    const Navigate = useNavigate()

    const handleLike = async () => {
        try {
            const response = await axios.patch(`http://localhost:9999/posts/${post._id}/like`, {
                userId: user._id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // const updatedPost = response.data.post;

            setUser((prev) => ({
                ...prev,
                likedPosts: isLiked
                  ? prev.likedPosts.filter((id) => id !== post._id)
                  : [...prev.likedPosts, post._id],
              }));
            //   console.log(updatedPost)        
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    }

    const handleSave = async () => {
        try {
            const response = await axios.patch(`http://localhost:9999/posts/${post._id}/save`, {
                userId: user._id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // const updatedPost = response.data.post;

            setUser((prev) => ({
                ...prev,
                savedPosts: isSaved
                  ? prev.savedPosts.filter((id) => id !== post._id)
                  : [...prev.savedPosts, post._id],
              }));
            //   console.log(updatedPost)        
        } catch (error) {
            console.error('Error saving the post:', error);
        }
    }

    const PostDetails = () => {
        // sessionStorage.setItem("post", JSON.stringify(post))
        setPosts(post)
        Navigate(`/posts/${post._id}`)
    }

  return (
    // <div className="flex-grow-0 flex-shrink-0 w-[calc(33.33%-1vw)] h-[33.6vh] bg-blue-600 rounded-3xl glass-effect3 "></div>
    <div className="flex-grow-0 flex-shrink-0 w-[37vw] h-[42vh] bg-blue-600 rounded-[1.5rem] glass-effect3 px-4 pt-3 pb-[0.40rem] flex flex-col">
        <div className='w-full h-[84%] bg--500'>
            <h1 className='font-brunoAce leading-relaxed text-zinc-200 '>{post.title}</h1>
            <hr className='my-1'/>
            <h3 className='font-fredoka leading-snug text-zinc-300'>{post.content}</h3>
        </div>
        <div className='w-full h-[16%] bg--500 flex items-center justify-between bg--500 '>
            <div className='flex items-center gap-x-2'>
                <div className='w-[2.6vw] h-[2.6vw] bg-zinc-100 overflow-hidden 
                rounded-full object-contain '><img src={post.author.picturePath} alt=""/></div>
                <h3 className='font-fredoka text-zinc-300 font-bold'>{post.author.username}</h3>
            </div>
            <div className='flex items-centert text-2xl gap-x-2'>
                <i className={`ri-heart-${isLiked ? 'fill text-red-600' : 'line'} like-icon`} onClick={handleLike}></i>
                {post.likes != 0 ? <h3>{post.likes}</h3> : null}
                <i className={`ri-bookmark-${isSaved ? 'fill text-zinc-300' : 'line'} save-icon`} onClick={handleSave}></i>
                <i className="ri-arrow-right-up-line cursor-pointer" onClick={PostDetails}></i>
            </div>
        </div>
    </div>
  )
}

export default PostCard