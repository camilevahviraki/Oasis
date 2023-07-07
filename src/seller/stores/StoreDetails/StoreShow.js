import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsGraphUp, BsFilterLeft } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import useIsInViewport from '../../../reusable/checkInViewwPort/checkInViewPort';
import { getStoresShow } from '../../../redux/stores/getStoreShowReducer';
import { getItems, searchStoreItem, deleteSearchedData } from '../../../redux/item/getItem';
import StoreCategoriesList from './categories_list/StoreCategoriesList';
import Loader from '../../../reusable/loader/Loader';
import SearchBar from '../../../reusable/serach-bar/SearchBar';
import ItemsList from '../../items/itemList/ItemIndex';
import ImageSilder from '../../../reusable/images_slider/ImageSilder';
import vectorShop from '../../../images/vector-shop.jpeg';
import locationIcon from '../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png';
import instagramIcon from '../../../images/icons/contacts/colored/instagram.png';
import facebookIcon from '../../../images/icons/contacts/colored/facebook.png';
import messageIcon from '../../../images/icons/contacts/colored/message.png';
import twitterIcon from '../../../images/icons/contacts/colored/twitter.png';
import whatsappIcon from '../../../images/icons/contacts/colored/whatsapp.png';

import './StoreShow.css';

const StoreShow = () => {
  const dispatch = useDispatch();
  const { token_id } = useParams();
  const searchRef = useRef(null);
  const userData = useSelector((state) => state.authenticationReducer);
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const storeItems = useSelector((state) => state.getItemsList);
  const searchInView = useIsInViewport(searchRef);
  const {
    searchedData,
    itemsList,
  } = storeItems;

  const [freeze, setFreeze] = useState(false);
  const [categoryName, setCategory] = useState('all');
  const [showLoader, setLoader] = useState(false);
  const [searchBarOnTop, setSearchBarOnTop] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    setSearchBarOnTop(!searchInView);
  }, [searchInView]);

  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: token_id,
      }),
    );

    dispatch(
      getItems({
        category: categoryName,
        store_id: token_id,
      }),
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

  const handleSearch = (value) => {
    const data = {
      query: value,
      categoryName,
      storeId: id,
    };
    dispatch(searchStoreItem(data));
    setLoader(true);
  };

  useEffect(() => {
    if (searchedData) {
      setLoader(false);
      dispatch(deleteSearchedData());
    }
  }, [searchedData]);

  const selectCategory = (category) => {
    setCategory(category.name);
    setShowCategories(false);
  };

  return (
    <div className="store-show-container">
      <div className="store-image-and-lister w-full">
        <div
          className="store-show-image-container"
          onMouseOver={() => setFreeze(false)}
          onMouseOut={() => setFreeze(true)}
        >
          <ImageSilder imagesArray={images_url} freeze={freeze} />
          <div className="store-settings">

            {
              user_id === userData.user.id ? (
                <>
                  <Link to={`../store/${token_id}/analysis`}>
                    <BsGraphUp />
                    <span>Insights</span>
                  </Link>
                  <Link
                    to={`../my-store/${token_id}/item/new?type=${categoryName}&&key=${storeData.id}`}
                  >
                    <IoMdAdd />
                    <span>New Item</span>
                  </Link>
                  <Link to={`../my-store/${token_id}/edit`}>
                    <AiOutlineSetting />
                    <span>Settings</span>
                  </Link>

                </>
              ) : (<></>)
            }
          </div>
          <div className="store-contact-icons">
            {contactsIcons.map((icon) => (
              <Link to="" key={icon}>
                <img src={icon} alt="" className="icon store-contacts-icon" />
              </Link>
            ))}
          </div>
          <div className="store-banner-container">
            <div className="store-banner-wrapper">
              <img
                src={main_image_url || vectorShop}
                alt=""
                className="store-banner"
              />
            </div>
            <div>
              <h4 className="store-name">{name}</h4>
              <Link to={`../store/${token_id}/location`} className="store-location-wrapper">

                <p>Location</p>
                <MdLocationOn />
                <p>
                  :
                  {' '}
                  {location}
                  ,
                  {' '}
                  {country ? country.name : null}
                </p>
              </Link>

            </div>
          </div>

          <div ref={searchRef} className="search-wrapper-store">
            <SearchBar onSearch={handleSearch} instantSearch />
          </div>
        </div>
        <div className="store-categories-wrapper">
          <StoreCategoriesList
            setCategory={setCategory}
            getItems={getItems}
            categories={categories}
            categoryName={categoryName}
          />
        </div>
      </div>
      {
        searchBarOnTop ? (

          <div
            className="welcome-page-search-bar-container"
            style={{
              position: 'fixed', top: '50px', zIndex: 8, flexDirection: 'column',
            }}
          >

            <div className="store-search-flex">
              <h4 className="store-name" style={{ marginRight: '60px' }}>
                {name}
                {' store'}
              </h4>
              <SearchBar onSearch={(value) => handleSearch(value)} instantSearch />
              <h4 className="search-filter" onClick={() => setShowCategories(!showCategories)}>
                <BsFilterLeft />
                <span>{categoryName}</span>
              </h4>

              {
                showCategories ? (
                  <div className="search-categories-list">
                    <p
                      className="search-categories-list-category"
                      onClick={() => { setCategory('all'); setShowCategories(!showCategories); }}
                    >
                      <span />
                      {' '}
                      All
                    </p>
                    {
                      categories.map((category) => (
                        <p
                          className="search-categories-list-category"
                          onClick={() => selectCategory(category)}
                          key={category.name}
                        >
                          <span />
                          {' '}
                          {category.name}
                        </p>
                      ))
                    }
                  </div>
                )
                  : (<></>)
              }
            </div>
          </div>
        ) : (<></>)
      }
      {
        showLoader ? (<Loader />) : (<></>)
      }
      {/* Items lister bellow */}
      <div style={{ minHeight: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center' }}>
        {
          itemsList.length === 0 && searchedData !== undefined ? (
            <div className="oops-cooldnt-find-a-match">Oops! Could'nt find a match</div>
          ) : (
            <ItemsList itemsData={itemsList} storeData={storeData} />
          )
        }
      </div>
    </div>
  );
};

export default StoreShow;
