import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/ImageGrid.css";

const ImageGrid = () => {
  const imageData = useSelector((state) => state.image);
  let history = useHistory();

  const handleSubmit = (image) => {
    debugger;
    history.push({
      pathname: "/imageedit",
      state: image,
    });
  };

  return (
    <div className="image-grid">
      {imageData?.images.map((image) => (
        <div className="image-card" key={image.id}>
          <img
            src={image.previewURL}
            alt={image.tags}
            className="image-thumbnail"
            loading="lazy"
          />
          <button className="button" onClick={() => handleSubmit(image)}>
            Add Captions
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
