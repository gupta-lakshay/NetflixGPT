import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearchView: false,
    gptMovieResults: null,
    gptMovieNames: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearchView = !state.showGptSearchView;
    },
    addGPTMovieResult: (state, action) => {
      const { movieData, movieNames } = action.payload;
      state.gptMovieResults = movieData;
      state.gptMovieNames = movieNames;
    },
  },
});

export const { toggleGptSearchView, addGPTMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
