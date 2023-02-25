import React, { useState } from "react";
import nextIcon from "../../images/next-more-icon.png";
import CheckValidImage from "../check-image/checkValidImage";
import storeImage from "../../images/store-image-holder.png";
import "./ImageSlider.css";

const ImageSilder = (props) => {
  const { imagesArray, freeze } = props;

  const [imageShown, setImageShown] = useState(0);

  const videos = imagesArray.filter((image) => image.includes("video/upload"));
  const images = imagesArray.filter((image) => image.includes("image/upload"));

  const arrangedImages = [...images, ...videos];

  const nextImage = () => {
    if (imageShown + 1 < arrangedImages.length) {
      setImageShown(imageShown + 1);
    }
  };

  const previousImage = () => {
    if (imageShown - 1 >= 0) {
      setImageShown(imageShown - 1);
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="images-slider-container"
    >
      {imagesArray.length === 0 ? (
        <img src={storeImage} alt="" className="my_store_image" />
      ) : (
        <>
          {arrangedImages[imageShown].includes("video/upload") ? (
            <div className="image-slider-video-wrap">
              <video width="100%" height="45%" controls>
                <source src={
                  CheckValidImage({
                    avartarUrl: arrangedImages[imageShown],
                    defaultImg: storeImage
                  })} type="video/mp4" />
              </video>
            </div>
          ) : (
            <img
              src={
                CheckValidImage({
                avartarUrl: arrangedImages[imageShown],
                defaultImg: storeImage
              })}
              alt=""
              className="my_store_image"
            />
          )}
        </>
      )}

      {!freeze && imagesArray.length !== 1 ? (
        <div className="image-slider-buttons-wrapper">
          <div>
            <button className="button-next-image-left" onClick={previousImage}>
              <img src={nextIcon} alt="" />
            </button>
            <button className="button-next-image-right" onClick={nextImage}>
              <img src={nextIcon} alt="" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {!freeze && imagesArray.length !== 1 ? (
        <div className="image-sliders-dots-wrap">
          {arrangedImages.map((image, id) => (
            <div
              className={
                id === imageShown
                  ? "image-slider-dots current-dot"
                  : "image-slider-dots"
              }
            ></div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageSilder;
