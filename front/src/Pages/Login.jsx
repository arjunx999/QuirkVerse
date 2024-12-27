import React from "react";
import photo from "../assets/chat_updown.svg";
import photo2 from "../assets/welcome_back.svg";
import logo from "../assets/quirkverse.svg";
import AuthButton from "../Components/AuthButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate()
  const SignupRedirect = () => {
    Navigate('/signup')
  }
  return (
    <div className="w-[100vw] h-[100vh] bg-[#050405] overflow-hidden flex items-center justify-center select-none ">
      <div className="w-[75%] h-[85%] g-red-300 rounded-[3rem] flex overflow-hidden glass-effect">
        <div className="w-[50%] h-full bg--300 relative border-r-[0.3px] border-zinc-600 overflow-hidden">
          <img
            src={photo2}
            alt=""
            className="scale-75 absolute -top-[8vh] mx-auto"
          />
          <h1 className="absolute bottom-[7vh] left-[2vw] mx-[2vw] font-fredoka leading-5 font-semibold text-zinc-300">
          Join the conversations that matter to you. Reconnect with a community that listens, shares, and grows together. Your space, your voice—right where you left off.
          </h1>
        </div>
        <div className="w-[50%] h-full bg-zic-500 flex flex-col items-center justify-center relative">
          <img
            src={logo}
            alt="Logo"
            className="scale-75 max-w-full h-auto -top-[25vh] absolute "
          />
          <h1 className="font-fredoka font-semibold text-xl">Welcome back to QuirkVerse</h1>
          <h2 className="font-fredoka font-semibold text-base text-zinc-300">Login to rediscover your world !</h2>
          <form className="flex flex-col items-center mt-[5vh] justify-center gap-y-[2vh]">
            <div>
              <label htmlFor="email"></label>
              <input
                type="email"
                placeholder="email"
                required
                className=" w-[31.8vw] rounded-xl p-2 bg-zinc-300 glass-effect2 font-fredoka"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder="password"
                required
                className=" w-[31.8vw] rounded-xl p-2 bg-zinc-300 glass-effect2 font-fredoka"
              />
            </div>
            <h3 className="font-fredoka font-semibold text-sm text-zinc-300">*Note: email and password are case sensitive</h3>
            <AuthButton text="Login" />
          </form>
          <div className="w-full h-[15vh] bg--400 bottom-[3vh] absolute flex items-center justify-center gap-[1vw] ">
            <h1 className="font-fredoka text-sm leading-5 font-semibold text-zinc-300">Don't have an account? Create one in just a minute</h1>
            <div onClick={SignupRedirect}><AuthButton text="Signup" /></div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
