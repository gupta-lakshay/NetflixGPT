import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const selectedLang = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center ">
      <form className=" bg-black bg-opacity-80 rounded-lg w-1/2 grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 rounded-lg col-span-9"
          placeholder={lang[selectedLang].searchPlaceholder}
        ></input>
        <button className="py-2 px-4 m-4 bg-red-700  font-bold col-span-3 text-white rounded-lg">
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
