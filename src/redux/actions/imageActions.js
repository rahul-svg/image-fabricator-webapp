import {fetchImages} from "../../api/imageAPI"
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

export const searchImages = (query) => {debugger;
  return async (dispatch) => {
    dispatch({ type: FETCH_IMAGES_REQUEST });

    try {
      const images = await fetchImages(query);
      dispatch({ type: FETCH_IMAGES_SUCCESS, payload: images });
    } catch (error) {
      dispatch({
        type: FETCH_IMAGES_FAILURE,
        payload: error.message || 'Failed to fetch images',
      });
    }
  };
};
