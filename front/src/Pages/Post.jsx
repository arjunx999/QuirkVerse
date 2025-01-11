import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/quirkverse.svg";
import { useAppContext } from "../Contexts/UserContext";
import AuthButton from "../Components/AuthButton";
import axios from "axios";
import notfound from "../assets/warning_404.svg"

const Post = () => {
  const Navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const { posts, setPosts } = useAppContext();
  const token = sessionStorage.getItem("token");

  if (user === null) {
    return (
      <div className="w-[100vw] h-[100vh] bg-[#050405] flex items-center justify-center flex-col ">
        <img src={notfound} alt="" className="scale-75" />
        <h1 className="text-zinc-300 text-5xl font-fredoka font-semibold ">
          Bad request. 404
        </h1>
      </div>
    );
  }

  const isLiked = user.likedPosts.includes(posts._id);
  const handleLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:9999/posts/${posts._id}/like`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const updatedPost = response.data.post;
      // setPosts(updatedPost)

      setUser((prev) => ({
        ...prev,
        likedPosts: isLiked
          ? prev.likedPosts.filter((id) => id !== posts._id)
          : [...prev.likedPosts, posts._id],
      }));
      //   console.log(updatedPost)
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const isSaved = user.savedPosts.includes(posts._id);
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:9999/posts/${posts._id}/save`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const updatedPost = response.data.post;

      setUser((prev) => ({
        ...prev,
        savedPosts: isSaved
          ? prev.savedPosts.filter((id) => id !== posts._id)
          : [...prev.savedPosts, posts._id],
      }));
      //   console.log(updatedPost)
    } catch (error) {
      console.error("Error saving the post:", error);
    }
  };

  const handleLogOut = () => {
    // localStorage.removeItem("user")
    sessionStorage.removeItem("token");
    setUser(null);
    Navigate("/");
  };

  const viewUserProfile = () => {
    
  }

  // useEffect(() => {
  //   console.log(posts)
  //   // const post = sessionStorage.getItem("post");
  //   // if(post) {
  //   //   setCurrentPost(JSON.parse(post))
  //   // }
  //   // console.log(post)
  //   // console.log(currentPost)
  // }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] h-auto bg-[#050405] flex">
      {/* Sidebar */}
      <div className="w-[20%] h-[100vh] glass-sidebar">
        <div className="flex flex-col items-center relative">
          <div className="w-full h-[8vh] bg--500 mt-[3vh] overflow-hidden z-0 relative ">
            <img
              onClick={() => Navigate("/home/for-you")}
              src={logo}
              alt=""
              className="scale-90 cursor-pointer absolute z-100 -top-[16.2vh] "
            />
          </div>
          <div className="w-[90%] h-[0.5px] rounded-full bg-zinc-400 mb-9 mt-4"></div>
          <div className="w-full h-[80vh] bg--600 flex flex-col px-3">
            <div className="flex flex-col items-center gap-3 h-[50%] bg--600">
              <div className="w-[5vw] h-[5vw] bg-zinc-100 rounded-full overflow-hidden">
                <img src={user.picturePath} alt="" />
              </div>
              <h2 className="font-brunoAce text-lg font-medium ">
                {user.name}
              </h2>
              <div className="w-full h-[0.5px] rounded-full bg-zinc-400 mb-3 mt-3"></div>
              <div className="w-full flex flex-col bg--300 text-zinc-400 gap-1 ">
                <h2 className="font-fredoka text-sm font-medium ">
                  Username: {user.username}
                </h2>
                <h2 className="font-fredoka text-sm font-medium ">
                  Email: {user.email}
                </h2>
              </div>
            </div>

            <div className="h-[50%] w-full bg--600 font-fredoka pt-[2vh] px-3 flex gap-x-6">
              {/* <h2>124 post</h2>
                  <h2>{user.followers.length} followers</h2> */}
            </div>
            <div className="mb-1 font-fredoka button-6" onClick={handleLogOut}>
              Logout
            </div>
          </div>
        </div>
      </div>

      {/* Main Screen */}
      <div className="w-[80%] min-h-[100vh] h-full relative">
        <div className=" absolute bottom-0 right-0 m-[1.5vw] z-[1000] ">
          <div onClick={() => Navigate("/post/create")}>
            <AuthButton text="Create New Post" />
          </div>
        </div>
        <div
          className="flex items-center justify-center absolute top-[.10rem] left-0 w-[3.4vw] h-[3.4vw] rounded- bg--600 glass-navbar2 m-[1.5vw] z-[1000] "
          onClick={() => Navigate(-1)}
        >
          <i className="ri-arrow-left-s-line cursor-pointer text-3xl"></i>
        </div>
        {/* Navbar */}
        <div
          className="w-[42%] h-[7.5vh] bg-red-500 mx-auto rounded-3xl my-[2.2vh] glass-navbar2 flex items-center justify-center gap-x-[2vw] font-fredoka font-medium text-zinc-200 absolute 
        top-[0.5vh] z-[100] left-[30%] "
        >
          <h3 className="cursor-pointer relative group">
            For-you
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
          <div className="w-[1.3px] h-[40%] bg-zinc-400 rounded-full "></div>
          <h3
            className="cursor-pointer relative group"
            onClick={() => Navigate("/home/following")}
          >
            Following
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
          <div className="w-[1.3px] h-[40%] bg-zinc-400 rounded-full "></div>
          <h3
            className="cursor-pointer relative group"
            onClick={() => Navigate("/home/liked")}
          >
            Liked
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
          <div className="w-[1.3px] h-[40%] bg-zinc-400 rounded-full "></div>
          <h3
            className="cursor-pointer relative group"
            onClick={() => Navigate("/home/saved")}
          >
            Saved
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
        </div>

        {/* Post */}
        <div className="w-full h-[100vh] pt-[12.1vh] flex items- justify-center gap-x-[2vw] gap-y-[3vh] px-[1.2vw] overflow-y-auto overflow-x-hidden pb-[2.5vh] z-50 bg--600">
          <div className="w-[100%] h-[85.3vh] bg--500 glass-effect3 rounded-3xl flex flex-col overflow-hidden text-zinc-300 px-3">
            <div className="w-full min-h-[8.5vh] max-h-[14vh] pb-2 bg--900 px-1 pt-[.80rem] flex-shrink-0 ">
              <h1 className="font-brunoAce text-2xl font-semibold leading-7">
                {posts.title}
              </h1>
            </div>
            <div className="w-full h-[0.5px] rounded-full bg-zinc-300 mb-3 mt-[.15rem] "></div>
            <div className="w-full h-[61vh] bg--400 overflow-auto flex-grow ">
              <h3 className="font-lato text-lg font-semibold leading-6 text-zinc-300 ">
                {posts.content}
              </h3>
            </div>

            <div className="w-[81%] h-[0.5px] rounded-full mt-2 bg-zinc-400"></div>
            <div className="w-full h-[8.3vh] bg--300 flex items-center relative ">
              <div className="flex items-center gap-x-3 absolute left-[0.2vw]">
                <div
                  className="w-[2.6vw] h-[2.6vw] bg-zinc-100 overflow-hidden 
                rounded-full object-contain "
                >
                  <img src={posts.author.picturePath} className="cursor-pointer" alt="" onClick={viewUserProfile} />
                </div>
                <h3 className="font-fredoka text-zinc-300 text- font-bold cursor-pointer " onClick={viewUserProfile}>
                  {posts.author.username}
                </h3>
                <div className="px-2 h-[4.2vh] text-sm font-medium button-5">
                  Follow
                </div>
              </div>
              <div className="flex items-center text-3xl gap-x-3 right-[15vw] absolute ">
                <i
                  className={`ri-heart-${
                    isLiked ? "fill text-red-600" : "line"
                  } like-icon`}
                  onClick={handleLike}
                ></i>
                {/* {posts.likes != 0 ? <h3>{posts.likes}</h3> : null} */}
                <i
                  className={`ri-bookmark-${
                    isSaved ? "fill text-zinc-300" : "line"
                  } save-icon`}
                  onClick={handleSave}
                ></i>
                <i
                  className="ri-arrow-right-up-line cursor-pointer"
                  onClick={() => Navigate(`/post/${post._id}`)}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
