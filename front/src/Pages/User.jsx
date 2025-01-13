import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/quirkverse.svg";
import { useAppContext } from "../Contexts/UserContext";
import AuthButton from "../Components/AuthButton";
import axios from "axios";
import notfound from "../assets/warning_404.svg";
import { useEffect } from "react";
import PostCard from "../Components/PostCard";
import { ThemeConsumer } from "styled-components";

const User = () => {
  const Navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogOut = () => {
    // localStorage.removeItem("user")
    sessionStorage.removeItem("token");
    setUser(null);
    Navigate("/");
  };

  const [searchUser, setSearchUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const { user, setUser } = useAppContext();
  const { person, setPerson } = useAppContext();

  useEffect(() => {
    if (user === null) {
      alert("User Not Logged In. Please Login to Continue");
      Navigate("/login");
    }
    const fetchUserInfo = async () => {
      try {
        const url = `http://localhost:9999/users/${person}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setSearchUser(result);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    // console.log(searchUser);
    fetchUserInfo();
    const fetchUserPosts = async () => {
      try {
        const url = `http://localhost:9999/posts/user/${person}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUserPosts(result);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserPosts();
    // console.log(userPosts);
  }, [user, Navigate, person]);

    const viewYourProfile = () => {
      setPerson(user._id)
      Navigate(`/users/${user._id}`)
    }

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
              <div className="w-[5vw] h-[5vw] bg-zinc-100 rounded-full overflow-hidden cursor-pointer" onClick={viewYourProfile}>
                <img src={user.picturePath} alt="" />
              </div>
              <h2 className="font-brunoAce text-lg font-medium  cursor-pointer" onClick={viewYourProfile}>
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
      <div className="w-[80%] min-h-[100vh] h-full flex flex-col items- pt-[6vh] relative ">
        <div
          className="flex items-center justify-center absolute top-[.10rem] left-0 w-[3.4vw] h-[3.4vw] rounded- bg--600 glass-navbar2 m-[0.8vw] z-[1000] "
          onClick={() => Navigate(-1)}
        >
          <i className="ri-arrow-left-s-line cursor-pointer text-3xl"></i>
        </div>
        <div className="w-[90%] h-[35vh] rounded-3xl bg--700 flex items-center justify-center glass-effect mx-auto ">
          <div className="w-[30%] h-full bg--50 flex items-center justify-center">
            <div className="w-[14vw] h-[14vw] bg--100 rounded-full overflow-hidden ">
              <img src={searchUser.picturePath} alt="" />
            </div>
          </div>
          <div className="w-[70%] h-full bg--900 flex flex-col  text-zinc-300 pt-7 px-7">
            <h1 className="font-brunoAce text-3xl">{searchUser.name}</h1>
            <h1 className="font-fredoka font-semibold text-xl pt-2 ">
              {searchUser.username}
            </h1>
            <div className="flex gap-4 items-center">
            <h2 className="font-fredoka font-medium text-lg pt-1">
              {searchUser?.followers?.length} followers
            </h2>
            <h2 className="font-fredoka font-medium text-lg ">
              {userPosts.length != 1? `${userPosts.length} posts` : `${userPosts.length} post`}
            </h2>
            </div>
            <h2 className="font-fredoka font-medium text-lg ">
              Joined {new Date(searchUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </h2>
            
            <div className="w-[7vw] h-[5vh] text-base font-medium button-5 mt-2 ">
              Follow
            </div>
          </div>
        </div>
        {/* <h1 className="font-fredoka text-zinc-300 font-semibold text-2xl ml-7 my-3">Posts by {searchUser.username} :</h1> */}
        {/* Posts From User */}
        <div className="w-full bg--800 h-[59vh] flex flex-wrap gap-x-[2vw] gap-y-[3vh] px-[2vw] pt-[4vh] overflow-y-scroll overflow-x-hidden pb-[2.5vh] z-50">
          {userPosts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
