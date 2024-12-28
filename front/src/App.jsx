import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Post from "./Pages/Post";
import User from "./Pages/User";
import HomeForYou from "./Pages/HomeForYou";
import HomeFollowing from "./Pages/HomeFollowing";
import HomeLiked from "./Pages/HomeLiked";
import "remixicon/fonts/remixicon.css";
import { useState, useEffect } from "react";

const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div>
    <div className="custom-cursor"
    style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/for-you" element={<HomeForYou />} />
        <Route path="/home/following" element={<HomeFollowing />} />
        <Route path="/home/liked" element={<HomeLiked />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
    
  );
};

export default App;
