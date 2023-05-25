import React from "react";
import { Link } from "react-router-dom";
import LimitText from "../../../reusable/limit-text-length/limitText";
import storeImage from '../../../images/store-image-holder.png';
import "./MarkerPopUp.css";

const MarkerPopUp = (props) => {
  const { data } = props;

  const {
    categories,
    coordinate,
    country,
    country_id,
    description,
    id,
    location,
    main_image_url,
    name,
    token_id,
  } = data;
  return (
    <div className="marker-pop-up-container">
      <div className="marker-pop-up-image-wrapper">
        <img
          src={main_image_url ? main_image_url : storeImage}
          alt=""
          className="marker-pop-up-image"
        />
      </div>
      <h4 className="marker-pop-up-store-name">{name}</h4>
      <LimitText
        limit={80}
        text={description}
        className={"marker-pop-up-description"}
      />
      <Link to={`../store/${token_id}`} className="marker-pop-up-link">
        More in this store {">"}
      </Link>
    </div>
  );
};

export default MarkerPopUp;
