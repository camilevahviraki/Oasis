import React, { useEffect, useState, useRef } from 'react';
import CheckValidImage from '../check-image/checkValidImage';
import itemImage from '../../images/item-splash-image.png';
import './ImageSliderItem.css';

const ImageSliderItem = (props) => {
  const imagesContainerRef = useRef(null);
  const [imageShown, setImageShown] = useState(1);
  const [scrollable, setScrollable] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const [scrollTo, setScrollTo] = useState(1);

  const { imagesArray, showAttributeImage } = props;
  let videos = [];
  let images = [];
  if (imagesArray) {
    videos = imagesArray.filter((image) => image.includes('video/upload'));
    images = imagesArray.filter((image) => image.includes('image/upload'));
  }

  let arrangedImages = [...images, ...videos];

  const makeScrollable = () => {
    if (imagesArray.length > 4) {
      setScrollable(true);
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

  useEffect(() => {
    if (showAttributeImage) {
      // setMainImage(showAttributeImage);
      arrangedImages = [...arrangedImages, showAttributeImage];
      setImageShown(arrangedImages.length + 1);
    }
  }, [showAttributeImage]);

  return (
    <div className="image-slider-item-container">
      <div
        style={scrollable ? { overflow: 'scroll' } : { overflow: 'hidden' }}
        onMouseOver={makeScrollable}
        onMouseOut={() => setScrollable(false)}
        className="image-slider-item-small-container"
      >
        {arrangedImages.map((image, key) => (
          <div
            key={image}
            className={
              key + 1 === imageShown
                ? 'image-slider-item-small-wrapp shown'
                : 'image-slider-item-small-wrapp'
            }
            onClick={() => { setImageShown(key + 1); }}
          >
            {arrangedImages.length === 0 ? (
              <img src={itemImage} alt="" className="image-slider-main-image" />
            ) : (
              <>
                {image.includes('video/upload') ? (
                  <div className="image-slider-video-wrap">
                    <video width="100%" height="45%" controls>
                      <source
                        // src={CheckValidImage({
                        //   avartarUrl: image,
                        //   defaultImg: itemImage,
                        // })}
                        src={image}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <img
                    // src={CheckValidImage({
                    //   avartarUrl: image,
                    //   defaultImg: itemImage,
                    // })}
                    src={image}
                    alt=""
                    className="image-slider-main-image"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="image-slider-item-main-wrapper" ref={imagesContainerRef}>

        {arrangedImages.length === 0 ? (
          <img src={itemImage} alt="" className="my_store_image" />
        ) : (
          <>
            {arrangedImages.map((imageUrl) => (
              <div className="image-slider-flex" key={imageUrl}>
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
                    className="image-slider-main-image"
                  />
                )}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default ImageSliderItem;
