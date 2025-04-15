import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./image/imagereducer";

export const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});
