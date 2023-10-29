import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const selectedLang = useSelector((store) => store.config.lang);
  const handleSearchClick = async () => {
    const searchQuery = searchText.current.value;
    console.log("searchQuery", searchQuery);
    // make api call to openAI to get movie results
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    });

    console.log(gptResults.choices);
  };
  return (
    <div className="pt-[10%] flex justify-center ">
      <form
        className=" bg-black bg-opacity-80 rounded-lg w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-lg col-span-9"
          placeholder={lang[selectedLang].searchPlaceholder}
        ></input>
        <button
          className="py-2 px-4 m-4 bg-red-700  font-bold col-span-3 text-white rounded-lg"
          onClick={handleSearchClick}
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
