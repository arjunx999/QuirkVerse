import React from "react";
import logo from "../assets/quirkverse.svg";
import AuthButton from "./AuthButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  const authPage = () => {
    Navigate("/login");
  };
  const headToHome = () => {
    Navigate("/");
  };
  return (
    <div className="w-[95vw] h-[8.5vh] glass-navbar mx-auto rounded-3xl flex justify-between pr-2 pl-1 select-none">
      <div className="w-[20vw] h-[8vh] relative">
        <img
          onClick={headToHome}
          src={logo}
          alt="Logo"
          className="w-[19vw] max-w-full h-auto object-contain absolute -top-[15vh] cursor-pointer "
        />
      </div>
      <div className="w-[20vw] h-[8vh] bg-zinc- flex justify-center gap-3 items-center">
        <a href="https://github.com/arjunx999" target="blank">
          {" "}
          <i className="ri-github-fill text-zinc-100 text-2xl cursor-pointer mr-1"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/arjun-verma-5b4326292/"
          target="blank"
        >
          {" "}
          <i className="ri-linkedin-fill text-zinc-100 text-2xl cursor-pointer mr-4 "></i>
        </a>
        <div onClick={authPage}>
          <AuthButton text="Login" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
