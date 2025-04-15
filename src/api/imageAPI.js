// src/api/imageApi.js
import axiosInstance from "./axiosInstance";

const API_KEY = "49705609-9ba15f0412184d88159900074";

export const fetchImages = async (query = "nature", page = 1, perPage = 12) => {
  debugger;
  try {
    const response = await axiosInstance.get("/", {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        page,
        per_page: perPage,
        safesearch: true,
      },
    });
    debugger;
    const data = response.data;

    if (!data.hits || data.hits.length === 0) {
      throw new Error("No images found for the search query.");
    }

    return data.hits;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        throw new Error("API rate limit exceeded. Try again later.");
      }
      throw new Error(`Pixabay Error: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from Pixabay API.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};
