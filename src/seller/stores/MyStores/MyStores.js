import React from "react";
import { Link } from "react-router-dom";
import locationIcon from "../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png";
import createNewIcon from '../../../images/icons/more-icon.png';
import "./MyStores.css";

const MyStores = () => {
  return (
    <div className="my-stores-container flex flex-col">
      <Link to='../create-store' className="my-store-create-new flex">
        <img src={createNewIcon} alt='' className="icon" />
        <p>New store</p>
      </Link>
      <div className="my-store-wrapper">
        <div className="my-store-picture-container">
          <img src="" alt="" className="my-store-image" />
        </div>
        <div className="my-store-details">
          <div className="flex flex-col">
            <h3 className="my-store-name">Store Name</h3>
            <div className="my-store-location flex flex-row">
              <img src={locationIcon} alt="" className="icon" />
              <p>Store location</p>
            </div>
            <p>
              Oxford and later graduated from Yale Law
              School. He met Hillary Rodham at Yale; they married in 1975. After
              graduating from law school, Clinton returned to Arkansas and won
              election as state attorney general, followed by two
              non-consecutive tenures as Arkansas governor. As governor, he
              overhauled the state's education system and served as chairman of
              the National Governors Association.
            </p>
          </div>

          <div className="my-store-categories-wrapper">
            <p>category1</p>
            <p>category2</p>
            <p>category3</p>
            <p>category4</p>
            <p>category5</p>
            <p>category6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStores;
