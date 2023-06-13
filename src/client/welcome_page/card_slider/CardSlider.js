import React, { useState, useRef, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import "./CardSlider.css";

const CardSlider = (props) => {

  const { data } = props;
  const containerRef = useRef(null);
  const [scrollTo, setScrollTo] = useState(1);
  const [imageShown, setImageShown] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const [allowScroll, setAllowScroll] = useState(false);

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
    setTimeout(() => {
      setAllowScroll(!allowScroll);
    }, 6000);
  }, []);

  const autoScroll = () => {
    if (imageShown < data.length) {
      setImageShown(imageShown + 1);
    } else if (imageShown === data.length) {
      setImageShown(1);
    }
  };

  const nextImage = () => {
    if (imageShown < data.length) {
      setImageShown(imageShown + 1);
    } else if (imageShown === data.length) {
      setImageShown(1);
    }
  };

  const previousImage = () => {
    if (imageShown - 1 >= 1) {
      setImageShown(imageShown - 1);
    } else if (imageShown === 1) {
      setImageShown(data.length);
    }
  };

  if (scrollTo !== imageShown) {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        left: (imageShown - 1) * containerWidth,
        behavior: "smooth",
      });
      setScrollTo(imageShown);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setAllowScroll(!allowScroll);
    }, 5000);
    if (allowScroll) {
      autoScroll();
    }
  }, [allowScroll]);

  return (
    <div className="big-card-slider-container">
      <div className="big-cards-lister-wrapper" ref={containerRef}>
        {data.map((card) => {
          const { mainTile, text, image, bgColor } = card;
          return (
            <div
             className="big-card-slider-wrapper" 
             style={{backgroundImage: `url(${image})`}}
            >
              <div className="big-card-slier-description">
                <h2 className="big-card-slier-title">{mainTile}</h2>
                <p>{text}</p>
              </div>
              <div className="big-card-slier-bg"
                style={{background: `linear-gradient(30deg, ${bgColor[0]}, ${bgColor[1]})`}}
              >
                {/* <img src={image} alt='' className="big-card-slier-image"/> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="image-slider-buttons-wrapper">
        <div>
          <button
            className="button-slide-image button-next-image-left"
            onClick={previousImage}
          >
            <FaAngleLeft />
          </button>
          <button
            className="button-slide-image button-next-image-right"
            onClick={nextImage}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div className="image-sliders-dots-wrap">
        {data.map((image, id) => (
          <div
            className={
              id + 1 === imageShown
                ? "image-slider-dots-m current-dot-m"
                : "image-slider-dots-m"
            }
            onClick={() => setImageShown(id + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
