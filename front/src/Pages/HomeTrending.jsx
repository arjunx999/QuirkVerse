import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/quirkverse.svg";
import PostCard from "../Components/PostCard";
import notfound from "../assets/warning_404.svg"
import AuthButton from "../Components/AuthButton";

const HomeTrending = () => {
  const Navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const token = sessionStorage.getItem("token");

  const HeadToHome = () => {
    Navigate("/");
  };

  const createPostRoute =() => {
    Navigate("/posts/create")
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user === null) {
      alert("User Not Logged In. Please Login to Continue");
      Navigate("/login");
    }
    const fetchLikedPosts = async () => {
      try {
        const url = `http://localhost:9999/posts/users/${user._id}/trending-posts`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        // console.log(result)
        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchLikedPosts();
  }, [user, Navigate]);

  const handleLogOut = () => {
    // localStorage.removeItem("user")
    sessionStorage.removeItem("token")
    setUser(null)
    Navigate("/")
  }

  // useEffect(() => {
  //   console.log("All posts:", posts);
  // }, [posts]);

  const { person, setPerson } = useAppContext()
    const viewYourProfile = () => {
      setPerson(user._id)
      Navigate(`/users/${user._id}`)
  }
  

  if (user === null) {
    return <div className="w-[100vw] h-[100vh] bg-[#050405] flex items-center justify-center flex-col ">
      <img src={notfound} alt="" className="scale-75" />
      <h1 className="text-zinc-300 text-5xl font-fredoka font-semibold ">Bad request. 404</h1>
    </div>
    // add a basic ui in future with the same message as above
  }

  return (
    <div className="w-[100vw] min-h-[100vh] h-auto bg-[#050405] flex">
      {/* Sidebar */}
      <div className="w-[20%] h-[100vh] glass-sidebar">
        <div className="flex flex-col items-center relative">
          <div className="w-full h-[8vh] bg--500 mt-[3vh] overflow-hidden z-0 relative ">
            <img
              onClick={HeadToHome}
              src={logo}
              alt=""
              className="scale-90 cursor-pointer absolute z-100 -top-[16.2vh] "
            />
          </div>
          <div className="w-[90%] h-[0.5px] rounded-full bg-zinc-400 mb-9 mt-4"></div>
          <div className="w-full h-[80vh] bg--600 flex flex-col px-3">
            <div className="flex flex-col items-center gap-3 h-[50%] bg--600">
              <div className='w-[5vw] h-[5vw] bg-zinc-100 rounded-full overflow-hidden cursor-pointer' onClick={viewYourProfile}><img src={user.picturePath} alt="" /></div>
              <h2 className="font-brunoAce text-lg font-medium  cursor-pointer" onClick={viewYourProfile}>{user.name}</h2>
              <div className="w-full h-[0.5px] rounded-full bg-zinc-400 mb-3 mt-3"></div>
              <div className="w-full flex flex-col bg--300 text-zinc-400 gap-1 ">
                <h2 className="font-fredoka text-sm font-medium ">Username: {user.username}</h2>
                <h2 className="font-fredoka text-sm font-medium ">Email: {user.email}</h2>
              </div>
            </div>
            
            <div className="h-[50%] w-full bg--600 font-fredoka pt-[2vh] px-3 flex gap-x-6">
              {/* <h2>124 posts</h2>
              <h2>{user.followers.length} followers</h2> */}
              
            </div>
            <div className="mb-1 font-fredoka button-6" onClick={handleLogOut}>Logout</div>
            
          </div>
        </div>
      </div>

      {/* Main Screen */}
      <div className="w-[80%] min-h-[100vh] h-full relative">
        <div className=" absolute bottom-0 right-0 m-[1.5vw] z-[1000] ">
          <div onClick={createPostRoute} ><AuthButton text="Create New Post" /></div>
          
        </div>
        {/* Navbar */}
        <div className="w-[53%] h-[7.5vh] bg-red-500 mx-auto rounded-3xl my-[2.2vh] glass-navbar2 flex items-center justify-center gap-x-[2vw] font-fredoka font-medium text-zinc-200 absolute 
        top-[0.5vh] z-[100] left-[25%] ">
          <h3 className="cursor-pointer relative group" onClick={() => Navigate("/home/for-you")} >
            For-you
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
          <div className="w-[1.3px] h-[40%] bg-zinc-400 rounded-full "></div>
          <h3 className="cursor-pointer relative group" onClick={() => Navigate("/home/trending")}>
            Trending
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
          <div className="w-[1.3px] h-[40%] bg-zinc-400 rounded-full "></div>
          <h3 className="cursor-pointer relative group" onClick={() => Navigate("/home/following")}>
            Following
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
          <div className="w-[1.3px] h-[40%] bg-zinc-400 rounded-full "></div>
          <h3 className="cursor-pointer relative group" onClick={() => Navigate("/home/liked")}>
            Liked
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
          <div className="w-[1.3px] h-[40%] bg-zinc-400 rounded-full "></div>
          <h3 className="cursor-pointer relative group" onClick={() => Navigate("/home/saved")}>
            Saved
            <span className="absolute bottom-[-1.1px] left-0 right-0 mx-auto h-[1.1px] w-full bg-purple-500 scale-x-0 origin-center transition-transform group-hover:scale-x-100"></span>
          </h3>
        </div>

        {/* Posts */}
        {/* <div className="w-full h-[88vh] flex flex-wrap gap-x-[1.5vw] gap-y-[2.5vh] px-[1.5vw] overflow-y-auto overflow-x-hidden pb-[2.5vh] z-50"> */}
        <div className="w-full h-[100vh] pt-[12.9vh] flex flex-wrap gap-x-[2vw] gap-y-[3vh] px-[2vw] overflow-y-auto overflow-x-hidden pb-[2.5vh] z-50">
          {posts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomeTrending;
