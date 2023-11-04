import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
const MainComponent = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  //early return if movies is null
  if (movies === null) return;
  const mainMovie = movies?.[10];
  //   console.log("mainMovie", mainMovie);
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="pt-[40%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainComponent;
