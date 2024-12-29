import React, { useState } from "react";
import photo from "../assets/chat_updown.svg";
import photo2 from "../assets/like_dislike.svg";
import logo from "../assets/quirkverse.svg";
import AuthButton from "../Components/AuthButton";
import { useNavigate } from "react-router-dom";
import { ThemeConsumer } from "styled-components";

const SignUp = () => {
  const Navigate = useNavigate();
  const LoginRedirect = () => {
    Navigate("/login");
  };

  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    picturePath: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const{username, name, email, password } = signUpInfo;
    if( !username || !name || !email || !password ) {
      return alert("Incomplete Credentials")
    }
    try {
      const url = "http://localhost:9999/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo), //passing user data
      });
      if (response.status === 400) {
        return alert("Username Already Taken");
      }
      if (response.status === 409) {
        return alert("User Already Exists. Try Logging in Instead");
      }
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        alert("Sign-up Successful! Login to continue");
        setTimeout(() => {
          Navigate("/login");
        }, 450);
      } else {
        alert(message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#050405] overflow-hidden flex items-center justify-center select-none ">
      <div className="w-[75%] h-[85%] g-red-300 rounded-[3rem] flex overflow-hidden glass-effect">
        <div className="w-[50%] h-full bg--300 relative border-r-[0.3px] border-zinc-600 overflow-hidden">
          <img
            src={photo2}
            alt=""
            className="scale-95 absolute top-[8vh] mx-[2vw]"
          />
          <h1 className="absolute bottom-[7vh] left-[2vw] mx-[2vw] font-fredoka leading-5 font-semibold text-zinc-300">
            Join a like-minded community, free from distractions, where you can
            focus on what you love and enjoy <br /> without regret. Let your
            voice shine in the universe of quirks!
          </h1>
        </div>
        <div className="w-[50%] h-full bg-zic-500 flex flex-col items-center justify-center relative">
          <img
            src={logo}
            alt="Logo"
            className="scale-75 max-w-full h-auto -top-[25vh] absolute "
          />
          <form
            className="flex flex-col items-center mt-[5vh] justify-center gap-y-[2vh]"
            onSubmit={handleSignUp}
          >
            <h3 className="font-fredoka font-semibold text-lg">
              Welcome to QuirkVerse
            </h3>
            <div className="flex gap-[1vw]">
              <div>
                <input
                  type="text"
                  placeholder="name"
                  required
                  className="w-[15.45vw] rounded-xl p-2 bg-zinc-300 glass-effect2 font-fredoka"
                  name="name"
                  value={signUpInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="username"
                  required
                  className="w-[15.45vw] rounded-xl p-2 bg-zinc-300 glass-effect2 font-fredoka"
                  name="username"
                  value={signUpInfo.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="email"
                required
                className=" w-[31.8vw] rounded-xl p-2 bg-zinc-300 glass-effect2 font-fredoka"
                name="email"
                value={signUpInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                required
                className=" w-[31.8vw] rounded-xl p-2 bg-zinc-300 glass-effect2 font-fredoka"
                name="password"
                value={signUpInfo.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="url"
                placeholder="profile picture url"
                className=" w-[31.8vw] rounded-xl p-2 bg-zinc-300 glass-effect2 font-fredoka"
                name="picturePath"
                value={signUpInfo.picturePath}
                onChange={handleInputChange}
              />
            </div>
            {/* <button type="submit"><AuthButton text="SignUp"/></button> */}
            <AuthButton text="SignUp" type="submit" />
          </form>
          <div className="w-full h-[15vh] bg--400 bottom-[3vh] absolute flex items-center justify-center gap-[1vw] ">
            <h1 className="font-fredoka text-sm leading-5 font-semibold text-zinc-300">
              Already have an account? Try Logging in instead
            </h1>
            <div onClick={LoginRedirect}>
              <AuthButton text="Login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
