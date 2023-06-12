import React, { useState, useRef, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import CheckValidImage from '../check-image/checkValidImage';
import storeImage from '../../images/store-image-holder.png';
import './ImageSlider.css';

const ImageSilder = (props) => {
  const imagesContainerRef = useRef(null);
  const { imagesArray, freeze } = props;
  const [imageShown, setImageShown] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const [scrollTo, setScrollTo] = useState(1);
  const videos = imagesArray.filter((image) => image.includes('video/upload'));
  const images = imagesArray.filter((image) => image.includes('image/upload'));

  const arrangedImages = [...images, ...videos];

  const nextImage = () => {
    if (imageShown < arrangedImages.length) {
      setImageShown(imageShown + 1);
    }
  };

  const previousImage = () => {
    if (imageShown - 1 >= 1) {
      setImageShown(imageShown - 1);
    }
  };

  useEffect(() => {
    setContainerWidth(imagesContainerRef.current.offsetWidth);
  }, []);

  if (scrollTo !== imageShown) {
    if (imagesContainerRef.current) {
      imagesContainerRef.current.scrollTo({
        top: 0,
        left: (imageShown - 1) * containerWidth,
        behavior: 'smooth',
      });
      setScrollTo(imageShown);
    }
  }

  return (
    <div className="images-slider-container-main">
      <div
        style={{ width: '100%', height: '100%' }}
        className="images-slider-container"
        ref={imagesContainerRef}
      >
        {imagesArray.length === 0 ? (
          <img src={storeImage} alt="" className="my_store_image" />
        ) : (
          <>
            {arrangedImages.map((imageUrl) => (
              <div className="image-slider-flex">
                {imageUrl.includes('video/upload') ? (
                  <div className="image-slider-video-wrap">
                    <video width="100%" height="45%" controls>
                      <source
                        // src={CheckValidImage({
                        //   avartarUrl: imageUrl,
                        //   defaultImg: storeImage,
                        // })}
                        src={imageUrl}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <img
                    // src={CheckValidImage({
                    //   avartarUrl: imageUrl,
                    //   defaultImg: storeImage,
                    // })}
                    src={imageUrl}
                    alt=""
                    className="my_store_image"
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>
      {!freeze && imagesArray.length !== 1 ? (
        <div className="image-slider-buttons-wrapper">
          <div>
            <button
              className="button-slide-image button-next-image-left"
              onClick={previousImage}
            >
              <FaAngleLeft />
            </button>
            <button className="button-slide-image button-next-image-right" onClick={nextImage}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {!freeze && imagesArray.length > 1 ? (
        <div className="image-sliders-dots-wrap">
          {arrangedImages.map((image, id) => (
            <div
              className={
                  id + 1 === imageShown
                    ? 'image-slider-dots current-dot'
                    : 'image-slider-dots'
                }
              onClick={() => setImageShown(id + 1)}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageSilder;
