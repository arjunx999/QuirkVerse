import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/quirkverse.svg";
import PostCard from "../Components/PostCard";
import notfound from "../assets/warning_404.svg";
import AuthButton from "../Components/AuthButton";

const CreatePost = () => {
  const Navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const token = sessionStorage.getItem("token");

  const HeadToHome = () => {
    Navigate("/home/for-you");
  };

  if (user === null) {
    return (
      <div className="w-[100vw] h-[100vh] bg-[#050405] flex items-center justify-center flex-col ">
        <img src={notfound} alt="" className="scale-75" />
        <h1 className="text-zinc-300 text-5xl font-fredoka font-semibold ">
          Bad request. 404
        </h1>
      </div>
    );
    // add a basic ui in future with the same message as above
  }

  const handleLogOut = () => {
    // localStorage.removeItem("user")
    sessionStorage.removeItem("token");
    setUser(null);
    Navigate("/");
  };

  const { person, setPerson } = useAppContext();
  const viewYourProfile = () => {
    setPerson(user._id);
    Navigate(`/users/${user._id}`);
  };

  const [ postDetails, setPostDetails ] = useState({
    title: "",
    content: "",
    pictureUrl: "",
    author: user._id,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value)
    setPostDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9999/posts/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetails),
      })
      if(response.status === 201) {
        alert("Post successfully created !")
        setTimeout(() => {
          Navigate("/home/for-you");
        }, 450);
      } else {
        alert("Error Creating Post Try Again Later")
        Navigate("/posts/create");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#050405] flex">
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
              <div
                className="w-[5vw] h-[5vw] bg-zinc-100 rounded-full overflow-hidden cursor-pointer"
                onClick={viewYourProfile}
              >
                <img src={user.picturePath} alt="" />
              </div>
              <h2
                className="font-brunoAce text-lg font-medium  cursor-pointer"
                onClick={viewYourProfile}
              >
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
              {/* <h2>124 posts</h2>
                    <h2>{user.followers.length} followers</h2> */}
            </div>
            <div className="mb-1 font-fredoka button-6" onClick={handleLogOut}>
              Logout
            </div>
          </div>
        </div>
      </div>

      {/* Main Screen */}
      <div className="w-[80%] h-[100vh] relative">
      <div
          className="flex items-center justify-center absolute top-[.10rem] left-0 w-[3.4vw] h-[3.4vw] rounded- bg--600 glass-navbar2 m-[1.5vw] z-[1000] "
          onClick={() => Navigate(-1)}
        >
          <i className="ri-arrow-left-s-line cursor-pointer text-3xl"></i>
        </div>
       
        <div className="w-[85%] h-[100vh] bg--700 mx-auto">
          <form onSubmit={handleNewPost}>
            <h1 className="font-fredoka text-zinc-300 font-bold text-4xl pt-[4vh]">
              Title :
            </h1>
            <input
              type="text"
              placeholder="write the title here.."
              required
              className="w-[100%] overflow-y-auto h-[8vh] rounded-xl mt-[1.5vh] p-2 bg-zinc-300 glass-effect2 font-fredoka"
              name="title"
              value={postDetails.title}
              onChange={handleInputChange}
            />
            <h1 className="font-fredoka text-zinc-300 font-bold text-4xl mt-[4vh]">
              Content :
            </h1>
            <textarea
              type="text"
              placeholder="write the content here.."
              required
              className="w-[100%] h-[56vh] rounded-xl mt-[1.5vh] p-2 bg-zinc-300 glass-effect2 font-fredoka overflow-y-auto resize-none"
              name="content"
              value={postDetails.content}
              onChange={handleInputChange}
            />
            <div className="absolute bottom-[.80rem] left-[35vw]"> <AuthButton text="Post Now" type="submit" /></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
