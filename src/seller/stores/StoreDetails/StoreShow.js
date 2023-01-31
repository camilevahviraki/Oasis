import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStoresShow } from "../../../redux/stores/getStoreShowReducer";
import CheckValidImage from "../../../reusable/check-image/checkValidImage";
import vectorShop from "../../../images/vector-shop.jpeg";
import locationIcon from "../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png";
import searchIcon from "../../../images/search-icon1.png";
import "./StoreShow.css";
import { Link } from "react-router-dom";

const StoreShow = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const storeId = useSelector((state) => state.storeLinkReducer.link);
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const [imageShown, setImageShown] = useState(0);

  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: storeId.store_id,
      })
    );
  }, []);

  const {
    categories,
    country,
    description,
    id,
    images_url,
    location,
    name,
    user_id,
  } = storeData;

  const changeSearchValue = (e) => {};

  return (
    <div className="store-show-container w-full flex flex-col center">
      <div className="store-show-container-search-wrap">
        <div className="search-wrapper">
          <input
            type="search"
            placeholder="...search item"
            name="search-bar"
            onChange={changeSearchValue}
          />
          <img src={searchIcon} alt="" className="searchIcon" />
        </div>
      </div>
      <div
        className="my-store-categories-wrapper"
        style={{ position: "relative" }}
      >
        <Link to={`../my-stores/${name}/items/all`}>
          <p>All Items</p>
        </Link>
        {categories.map((category) => (
          <Link to={`../my-stores/${name}/items/${category.name}`}>
            <p>{category.name}</p>
          </Link>
        ))}
      </div>

      <div className="store-show-details">
        <div className="store-show-image-wrap">
          <img
            src={CheckValidImage({
              avartarUrl: images_url[imageShown],
              defaultImg: vectorShop,
            })}
            alt=""
            className="store-show-image"
          />
        </div>
        <div className="store-show-details-description">
          <div className="store-show-name">
            <h4>{name}</h4>
            <div className="my-store-location flex flex-row">
              <img src={locationIcon} alt="" className="icon" />
              <p>
                {location}, {country}
              </p>
            </div>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreShow;
