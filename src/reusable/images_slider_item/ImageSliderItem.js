import React, { useEffect, useState } from 'react';
import CheckValidImage from '../check-image/checkValidImage';
import itemImage from '../../images/item-splash-image.png';
import './ImageSliderItem.css';

const ImageSliderItem = (props) => {
  const [imageShown, setImageShown] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  const { imagesArray, freeze, showAttributeImage } = props;
  const videos = imagesArray.filter((image) => image.includes('video/upload'));
  const images = imagesArray.filter((image) => image.includes('image/upload'));
  const arrangedImages = [...images, ...videos];

  const makeScrollable = () => {
    if (imagesArray.length > 4) {
      setScrollable(true);
    }
  };

  const [mainImage, setMainImage] = useState(arrangedImages[imageShown]);

  useEffect(() => {
    setMainImage(arrangedImages[imageShown]);
  }, [imageShown]);

  useEffect(() => {
    if (showAttributeImage) {
      setMainImage(showAttributeImage);
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
        {imagesArray.map((image, key) => (
          <div
            key={image}
            className={
              key === imageShown
                ? 'image-slider-item-small-wrapp shown'
                : 'image-slider-item-small-wrapp'
            }
            onClick={() => { setImageShown(null); setImageShown(key); }}
          >
            {imagesArray.length === 0 ? (
              <img src={itemImage} alt="" className="image-slider-main-image" />
            ) : (
              <>
                {image.includes('video/upload') ? (
                  <div className="image-slider-video-wrap">
                    <video width="100%" height="45%" controls>
                      <source
                        src={CheckValidImage({
                          avartarUrl: image,
                          defaultImg: itemImage,
                        })}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <img
                    src={CheckValidImage({
                      avartarUrl: image,
                      defaultImg: itemImage,
                    })}
                    alt=""
                    className="image-slider-main-image"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="image-slider-item-main-wrapper">
        {imagesArray.length === 0 ? (
          <img src={itemImage} alt="" className="image-slider-main-image" />
        ) : (
          <>
            {mainImage.includes('video/upload') ? (
              <div className="image-slider-video-wrap">
                <video width="100%" height="45%" controls>
                  <source
                    src={CheckValidImage({
                      avartarUrl: mainImage,
                      defaultImg: itemImage,
                    })}
                    type="video/mp4"
                  />
                </video>
              </div>
            ) : (
              <img
                src={CheckValidImage({
                  avartarUrl: mainImage,
                  defaultImg: itemImage,
                })}
                alt=""
                className="image-slider-main-image"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSliderItem;
