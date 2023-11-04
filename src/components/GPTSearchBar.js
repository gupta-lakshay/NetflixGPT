import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS, OPENAI_API_KEY } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const selectedLang = useSelector((store) => store.config.lang);
  const handleSearchClick = async () => {
    const searchQuery = searchText.current.value;
    console.log("searchQuery", searchQuery);
    const gptQuery =
      "act as a Movie Recommendation System and suggest some movies for the query" +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated. like the example result given ahead. Example Result: Gadar, Sholey, Don, DDLJ, Kuch Kuch Hota Hai";
    // make api call to openAI to get movie results
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const movieNames = gptResults.choices?.[0].message.content.split(",");
    //for each movie search TMDB and get the movie details
    const data = movieNames.map((movie) => searchMovieTMDB(movie));
    // array of promises returned by map so we need to wait
    // for all promises to resolve

    const movieData = await Promise.all(data);
    console.log("movieData", movieData);
    dispatch(addGPTMovieResult([movieData, movieNames]));
  };
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.result;
  };
  return (
    <div className="pt-[45%] md:pt-[20%] flex justify-center ">
      <form
        className=" bg-black bg-opacity-80 rounded-lg w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-lg col-span-9"
          placeholder={lang[selectedLang].searchPlaceholder}
        ></input>
        <button
          className="py-2  m-4 bg-red-700  font-bold col-span-3 text-white rounded-lg"
          onClick={handleSearchClick}
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
