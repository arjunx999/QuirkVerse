import React from "react";
import Navbar from "../Components/Navbar";
import image from "../assets/landingImage.png";
import AuthButton from "../Components/AuthButton";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const Navigate = useNavigate();

  const authPage = () => {
    Navigate("/signup");
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-[#050405] pt-[2.3vh] overflow-hidden select-none ">
      <div
      ></div>
      <Navbar />
      <div className="w-[100%] h-[80vh] bg-zinc-00 mx-auto mt-[3vh] flex">
        <div className="w-[50%] h-full bg--500 text-white">
          <div className="w-[85%] h-full bg--200 mx-auto flex flex-col items- pt-[21vh] ">
            <h1 className="text-2xl font-brunoAce font-semibold">
              A place to share your thoughts, ideas, and stories with the world.
            </h1>
            <h4 className="text-base font-fredoka mt-[1vh] mb-[1.5vh] text-zinc-200 ">
              QuirkVerse is more than just a blogging platform – it's a vibrant{" "}
              <br /> community where you can write, discover, and connect with{" "}
              <br /> like-minded individuals. Whether you're just starting your
              writing <br /> journey or you're a seasoned creator, we make it
              effortless to express yourself and stay on top of the latest
              trends in topics you love.
            </h4>
            {/* <h1 className="text-lg font-fredoka font-medium">Join QuirkVerse today and start writing with just one click.</h1> */}
            <div onClick={authPage}>
              <AuthButton text="Get Started" />
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full bg-pink-00 pt-[5vh]">
          <img src={image} alt="" className="scale-125 " />
        </div>
      </div>
    </div>
  );
};

export default Landing;
