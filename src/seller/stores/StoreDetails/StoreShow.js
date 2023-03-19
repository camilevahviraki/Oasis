import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStoresShow } from '../../../redux/stores/getStoreShowReducer';
import { getItems } from '../../../redux/item/getItem';
import ItemsList from '../../items/itemList/ItemIndex';
import linkName from '../../../reusable/remove-blanck-space/linkName';
import ImageSilder from '../../../reusable/images_slider/ImageSilder';
import { setItemLink } from '../../../redux/itemLink/itemLinkreducer';
import vectorShop from '../../../images/vector-shop.jpeg';
import locationIcon from '../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png';
import moreIcon from '../../../images/icons/more-icon.png';
import searchIcon from '../../../images/search-icon1.png';
import instagramIcon from '../../../images/icons/contacts/colored/instagram.png';
import facebookIcon from '../../../images/icons/contacts/colored/facebook.png';
import messageIcon from '../../../images/icons/contacts/colored/message.png';
import twitterIcon from '../../../images/icons/contacts/colored/twitter.png';
import whatsappIcon from '../../../images/icons/contacts/colored/whatsapp.png';

import './StoreShow.css';

const StoreShow = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const storeId = useSelector((state) => state.storeLinkReducer.link);
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const storeLink = useSelector((state) => state.storeLinkReducer);
  const itemsList = useSelector((state) => state.getItemsList);

  console.log(userData);

  const [freeze, setFreeze] = useState(false);
  const [categoryName, setCategory] = useState('all');

  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: storeId.store_id,
      }),
    );

    dispatch(
      getItems({
        category: categoryName,
        store_id: storeId.store_id,
      }),
    );
  }, []);

  const setStoreItemLink = (link, id) => {
    dispatch(setItemLink(link, id));
  };

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
    country_id,
    description,
    id,
    images_url,
    location,
    name,
    user_id,
  } = storeData;

  console.log('store data', storeData);

  const changeSearchValue = (e) => {};

  return (
    <div className="store-show-container">
      <div className="store-image-and-lister w-full">
        <div
          className="store-show-image-container"
          onMouseOver={() => setFreeze(false)}
          onMouseOut={() => setFreeze(true)}
        >
          <ImageSilder imagesArray={images_url} freeze={freeze} />
          <div className="store-contact-icons">
            {contactsIcons.map((icon) => (
              <Link to="">
                <img src={icon} alt="" className="icon store-contacts-icon" />
              </Link>
            ))}
          </div>
          <div className="store-banner-container">
            <div className="store-banner-wrapper">
              <img src={vectorShop} alt="" className="store-banner" />
            </div>
            <div>
              <h4 className="store-name">{name}</h4>
              <div className="store-location-wrapper">
                <p>Location</p>
                <img src={locationIcon} alt="" className="icon" />
                <p>
                  :
                  {' '}
                  {location}
                  ,
                  {' '}
                  {country ? country.name : null}
                </p>
              </div>
            </div>
          </div>

          <div className="search-wrapper-store">
            <input
              type="search"
              placeholder="Search..."
              name="search-bar"
              onChange={changeSearchValue}
            />
            <img src={searchIcon} alt="" className="searchIcon" />
          </div>
          <div className="store-show-edit-link-wrapp">
            {
               user_id === userData.user.id ? (
                 <Link to={`../my-stores/${storeLink.link.link}/edit`}>
                   Edit Store
                 </Link>
               )
                 : (<></>)
            }
          </div>
        </div>
        <div className="store-categories-wrapper">
          <button
            className={
              categoryName === 'all'
                ? 'store-category-name current-category'
                : 'store-category-name'
            }
            onClick={() => setCategory('all')}
          >
            home
          </button>
          {categories.map((category) => (
            <button
              className={
                category.name === categoryName
                  ? 'store-category-name current-category'
                  : 'store-category-name'
              }
              onClick={() => setCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="store-add-new-item">
        <Link
          to={`../my-stores/${storeLink.link.link}/item/new?type=${categoryName}`}
        >
          <img src={moreIcon} alt="" className="icon store-more-icon" />
          <h4 className="store-add-item-title">New Item</h4>
        </Link>
      </div>
      {/* Items lister bellow */}
      <ItemsList itemsData={itemsList} storeData={storeData} />
    </div>
  );
};

export default StoreShow;
