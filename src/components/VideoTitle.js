import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-10 md:px-24 absolute text-white bg-gradient-to-tr from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
      <div className="">
        <button className="bg-white text-black text-xl rounded-lg py-2 md:py-4 px-12 hover:bg-opacity-80">
          Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 bg-opacity-50  text-white text-xl rounded-lg p-4 px-12">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
