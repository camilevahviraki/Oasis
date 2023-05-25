import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSetting } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getStoresShow } from "../../../redux/stores/getStoreShowReducer";
import { getItems, searchStoreItem, deleteSearchedData } from "../../../redux/item/getItem";
import Loader from "../../../reusable/loader/Loader";
import SearchBar from "../../../reusable/serach-bar/SearchBar";
import ItemsList from "../../items/itemList/ItemIndex";
import linkName from "../../../reusable/remove-blanck-space/linkName";
import ImageSilder from "../../../reusable/images_slider/ImageSilder";
import { setItemLink } from "../../../redux/itemLink/itemLinkreducer";
import vectorShop from "../../../images/vector-shop.jpeg";
import locationIcon from "../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png";
import instagramIcon from "../../../images/icons/contacts/colored/instagram.png";
import facebookIcon from "../../../images/icons/contacts/colored/facebook.png";
import messageIcon from "../../../images/icons/contacts/colored/message.png";
import twitterIcon from "../../../images/icons/contacts/colored/twitter.png";
import whatsappIcon from "../../../images/icons/contacts/colored/whatsapp.png";

import "./StoreShow.css";

const StoreShow = () => {
  const dispatch = useDispatch();
  const { token_id } = useParams();
  const userData = useSelector((state) => state.authenticationReducer);
  const storeId = useSelector((state) => state.storeLinkReducer.link);
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const storeLink = useSelector((state) => state.storeLinkReducer);
  const storeItems = useSelector((state) => state.getItemsList);
  const {
    searchedData,
    itemsList
  } = storeItems;

  const [freeze, setFreeze] = useState(false);
  const [categoryName, setCategory] = useState("all");
  const [showLoader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: token_id,
      })
    );

    dispatch(
      getItems({
        category: categoryName,
        store_id: token_id,
      })
    );
  }, []);

  const contactsIcons = [
    whatsappIcon,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    messageIcon,
  ];

  const {
    categories,
    country,
    id,
    images_url,
    location,
    name,
    user_id,
    main_image_url,
  } = storeData;

  const handleSearch= (value) => {
    // if(itemsList.length > 0){
      const data = {
        query: value,
        categoryName,
        storeId: storeId.store_id,
      }
      dispatch(searchStoreItem(data));
      setLoader(true);
    
  };

  useEffect(() => {
    if(searchedData){
      setLoader(false);
      dispatch(deleteSearchedData());
    }
  }, [searchedData])

  return (
    <div className="store-show-container">
      <div className="store-image-and-lister w-full">
        <div
          className="store-show-image-container"
          onMouseOver={() => setFreeze(false)}
          onMouseOut={() => setFreeze(true)}
        >
          <ImageSilder imagesArray={images_url} freeze={freeze} />
          {user_id === userData.user.id ? (
            <div className="store-settings">
              <Link to={`../store/${token_id}/analysis`}>
                <BsGraphUp />
                <span>Insights</span>
              </Link>
              <Link
                to={`../my-store/${token_id}/item/new?type=${categoryName}`}
              >
                <IoMdAdd />
                <span>New Item</span>
              </Link>
              <Link to={`../my-store/${token_id}/edit`}>
                <AiOutlineSetting />
                <span>Settings</span>
              </Link>
            </div>
          ) : (
            <></>
          )}
          <div className="store-contact-icons">
            {contactsIcons.map((icon) => (
              <Link to="">
                <img src={icon} alt="" className="icon store-contacts-icon" />
              </Link>
            ))}
          </div>
          <div className="store-banner-container">
            <div className="store-banner-wrapper">
              <img
                src={main_image_url ? main_image_url : vectorShop}
                alt=""
                className="store-banner"
              />
            </div>
            <div>
              <h4 className="store-name">{name}</h4>
              <div className="store-location-wrapper">
                <p>Location</p>
                <img src={locationIcon} alt="" className="icon" />
                <p>
                  : {location}, {country ? country.name : null}
                </p>
              </div>
            </div>
          </div>

          <div className="search-wrapper-store">
           <SearchBar onSearch={handleSearch} instantSearch={true}/>
          </div>
        </div>
        <div className="store-categories-wrapper">
          <button
            className={
              categoryName === "all"
                ? "store-category-name current-category"
                : "store-category-name"
            }
            onClick={() => setCategory("all")}
          >
            home
          </button>
          {categories.map((category) => (
            <button
              className={
                category.name === categoryName
                  ? "store-category-name current-category"
                  : "store-category-name"
              }
              onClick={() => {
                setCategory(category.name);
                dispatch(
                  getItems({
                    category: category.name,
                    store_id: storeId.store_id,
                  })
                );
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      {
        showLoader? (<Loader/>): (<></>)
      }
      {/* Items lister bellow */}
      {itemsList.length === 0 && searchedData !== undefined ? (
        <div className="oops-cooldnt-find-a-match">Oops! Could'nt find a match</div>
      ) : (
        <ItemsList itemsData={itemsList} storeData={storeData}/>
      )}
      
    </div>
  );
};

export default StoreShow;
