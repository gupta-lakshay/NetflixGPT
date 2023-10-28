import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainComponent from "./MainComponent";
import SecondaryComponent from "./SecondaryComponent";

const Browse = () => {
  //Fetch data from TMDB API and update store
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainComponent />
      <SecondaryComponent />

      {/**
       * MainContainer
       * - Video Background
       * - Video Title
       * SecondaryContainer
       * - Movie List*n
       *  - cards *n
       */}
    </div>
  );
};

export default Browse;
