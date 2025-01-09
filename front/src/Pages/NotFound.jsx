import React from "react";
import notfound from "../assets/warning_404.svg";

const NotFound = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#050405] flex items-center justify-center ">
      <div className="w-[80vw] h-[85vh] glass-effect flex items-center justify-center flex-col ">
        <img src={notfound} alt="" className="scale-75" />
        <h1 className="text-zinc-300 text-5xl font-fredoka font-semibold ">
          Bad request. 404
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
