import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const HomeForYou = () => {
  const Navigate = useNavigate();
  const { user } = useAppContext();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user === null) {
      alert("User Not Logged In. Please Login to Continue");
      Navigate("/login");
    } 
    const fetchAllPosts = async () => {
      try {
        const url = "http://localhost:9999/posts/";
        const response = await fetch(url);
        const result = await response.json();
        setPosts(result.posts);
        console.log("All posts :",posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPosts();
  }, [user, Navigate]);

  if (user === null) {
    return <h1>Please Login to Continue</h1>
    // add a basic ui in future with the same message as above 
  }

  return (
    <div>
      <h1>Welcome to home page, {user.name}</h1>
    </div>
  );
};

export default HomeForYou;