import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    // console.log(jsonData.results);
    dispatch(addPopularMovies(jsonData.results));
  };
  // [] call api once
  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};
export default usePopularMovies;
