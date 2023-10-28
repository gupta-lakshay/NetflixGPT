import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  //fetch movie trailer video
  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    // console.log("json", json);
    const filterData = json.results.filter((video) => video.type === "Trailer");
    // console.log("trailer", filterData);
    // if trailer is not present then take 1st video from list of videos
    const trailer = filterData.length ? filterData[0] : json.results[0];
    // console.log("trailer", trailer);
    // take the key from trailer object as it is youtube key for video
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    getMovieTrailer();
  }, []);
};
export default useMovieTrailer;
