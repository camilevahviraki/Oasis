import React, { useState, useRef, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import {GiRunningShoe} from "react-icons/fa";
import "./CatgorySlider.css";

const CatgorySlider = (props) => {
  const { data } = props;
  const containerRef = useRef(null);
  const [scrollTo, setScrollTo] = useState(1);
  const [imageShown, setImageShown] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  
  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  const images = [
    {
      name: "Electronic",
      icon: "https://img.freepik.com/premium-photo/computer-with-blue-screen-that-says-computer-it_812649-321.jpg?w=740",
    },
    {
      name: "Chemical",
      icon: "https://img.freepik.com/premium-photo/investigations-defunct-chemistry-facility-laboratory-chemistry-instruction_410516-4221.jpg?w=740",
    },
    {
      name: "Pharmacie",
      icon: "https://img.freepik.com/free-photo/medicine-capsules-global-health-with-geometric-pattern-digital-remix_53876-126742.jpg?w=740&t=st=1686276236~exp=1686276836~hmac=9acf65b3d99e5d68693e86a01bca16df07e3b8fb33c6b351b80f06c0367a5623",
    },
    {
      name: "Clothes",
      icon: "https://img.freepik.com/free-photo/white-shirt-with-word-t-it_1340-25481.jpg?w=740&t=st=1686278411~exp=1686279011~hmac=8f71241d0cdd025322c53442b2b88108907d5e1a2f3583fb3c13ea5b8292a681",
    },
    {
      name: "Mechanic",
      icon: "https://img.freepik.com/free-vector/isometric-lock-padlock-keyhole-cyber-security-information-network-protection-future-cyber-technology-web-services-business-internet-project_587448-1060.jpg?w=360&t=st=1686278480~exp=1686279080~hmac=0fff9f37d4b0fc013816321ea01efd00c5939051172c53d159a2480160f07c46",
    },
    {
      name: "Construction",
      icon: "https://img.freepik.com/premium-vector/silhouettes-cranes-working-building_43605-1589.jpg?w=740",
    },
    {
      name: "Food",
      icon: "https://img.freepik.com/premium-photo/italian-food-with-ingredients_1220-4847.jpg?w=740",
    },
    {
      name: "Restaurent",
      icon: "https://img.freepik.com/free-photo/restaurant-table-with-cutlery_23-2148172700.jpg?w=740&t=st=1686277412~exp=1686278012~hmac=82bcb3af1efd419a456dd3977144f2b3385ae584524aeeff5e977aca66914032",
    },
    {
      name: "Bank",
      icon: "https://img.freepik.com/free-photo/coins-bottles-with-trading-graph_1150-17751.jpg?w=740&t=st=1686277835~exp=1686278435~hmac=e6c47fff075b82ae3c3e74b592da7c8e5e8199ff971036e77f0689fa57edd659",
    },
    {
      name: "Telecom",
      icon: "https://img.freepik.com/free-photo/futuristic-smart-city-with-5g-global-network-technology_53876-98438.jpg?w=740&t=st=1686278039~exp=1686278639~hmac=76bd0e63841d0de4321d3bc13699f8015de55f71a77f89f8b6f8241228c19764",
    },
    {
      name: "Hotel",
      icon: "https://img.freepik.com/free-photo/sunset-pool_1203-3192.jpg?w=740&t=st=1686280189~exp=1686280789~hmac=08af73405e4361ee83b85533394b815b9af5e519a1e1c768e95d7a560ded462f",
    },
    {
      name: "Hotel",
      icon: "https://img.freepik.com/free-photo/sunset-pool_1203-3192.jpg?w=740&t=st=1686280189~exp=1686280789~hmac=08af73405e4361ee83b85533394b815b9af5e519a1e1c768e95d7a560ded462f",
    },
    {
      name: "Banks",
      icon: "https://img.freepik.com/premium-photo/coins-are-stacked-together-with-morning-sun-shining_38663-580.jpg?w=740",
    },
  ];

  const assignImage = (category) => {
    const foundCategory = images.filter((el) => el.name === category.name);
    if (foundCategory.length > 0) {
      return foundCategory[0].icon;
    } else {
      return "";
    }
  };

  const nextImage = () => {
    if (imageShown * 4 < data.length) {
      setImageShown(imageShown + 1);
    } else if (imageShown * 4 === data.length) {
      setImageShown(1);
    }
  };

  const previousImage = () => {
    if (imageShown - 1 >= 1) {
      setImageShown(imageShown - 1);
    } else if (imageShown === 1) {
      setImageShown(data.length / 4);
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

  return (
    <div className="big-card-slider-container">
      <div className="big-cards-lister-wrapper" ref={containerRef}>
        {data.map((card, key) => {
          const { id, name } = card;
          if (name !== "Others") {
            return (
              <div
                className="welcome-page-small-card"
                key={id}
                // style={{ backgroundImage: `url(${assignImage(card)})` }}
              >
                {name}
              </div>
            );
          } else {
            return <></>;
          }
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
        {data.map((_i, id) => {
          id % 4 === 0 ? (
            <div
              className={
                id + 1 === imageShown
                  ? "image-slider-dots current-dot"
                  : "image-slider-dots"
              }
              onClick={() => setImageShown((id + 1) / 4)}
            />
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
};

export default CatgorySlider;
