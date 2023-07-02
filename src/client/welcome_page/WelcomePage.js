import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineCopyright } from 'react-icons/ai';
import CardSlider from './card_slider/CardSlider';
import CatgorySlider from './categories_slider/CatgorySlider';
import { getCategories } from '../../redux/stores_categories/stores_categories_reducer';
import { getWelcomItemsItems, welcomeSearchItem } from '../../redux/home/welcomePageReducer';
import useIsInViewport from '../../reusable/checkInViewwPort/checkInViewPort';
import SearchBar from '../../reusable/serach-bar/SearchBar';
import ItemsList from '../../seller/items/itemList/ItemIndex';
import bgImg1 from '../../images/welcome_page/img1.png';
import bgImg2 from '../../images/welcome_page/img2.png';
import bgImg3 from '../../images/welcome_page/img3.png';
import bgImg4 from '../../images/welcome_page/img4.png';
import bgImg5 from '../../images/welcome_page/img5.png';
import bgImg6 from '../../images/welcome_page/img6.png';
import bgImg7 from '../../images/welcome_page/img7.png';
import bgImg8 from '../../images/welcome_page/img8.png';
import bgImg9 from '../../images/welcome_page/img9.png';
import bgImg10 from '../../images/welcome_page/img10.png';
import './WelcomePage.css';

const WelcomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getCategories());
    dispatch(getWelcomItemsItems());
  }, []);

  const searchRef = useRef(null);
  const sliderRef = useRef(null);
  const categoriesData = useSelector((state) => state.storeCategoriesReducer);
  const welcomePageItems = useSelector((state) => state.welcomePageReducer);
  const searchInView = useIsInViewport(searchRef);
  const sliderInView = useIsInViewport(sliderRef);
  const handleSearch = (value) => {
    dispatch(welcomeSearchItem({ query: value }));
  };
  const [searchBarOnTop, setSearchBarOnTop] = useState(false);

  useEffect(() => {
    if (sliderInView) {
      setSearchBarOnTop(false);
    } else {
      setSearchBarOnTop(!searchInView);
    }
  }, [searchInView, sliderInView]);

  const cardsData = [
    {
      mainTile: <>
        Welcome in the
        <span>Oasis</span>
      </>,
      text: 'Sell and buy products',
      image: bgImg1,
      bgColor: ['#27374D', 'transparent'],
    },
    {
      mainTile: <>
        Find
        <span>products</span>
        {' '}
        around you
      </>,
      text: '',
      image: bgImg2,
      bgColor: ['#27374D', 'transparent'],
    },
    {
      mainTile: <>
        <span>Create</span>
        {' '}
        your
        {' '}
        <span>store</span>
        {' '}
        in 4 easy
        {' '}
        <span>steps</span>
      </>,
      text: '',
      image: bgImg3,
      bgColor: ['#27374D', 'transparent'],
    },
    {
      mainTile: <>
        Find
        <span>markets</span>
        {' '}
        in your region
      </>,
      text: '',
      image: bgImg4,
      bgColor: ['#27374D', 'transparent'],
    },
    {
      mainTile: <>
        Use
        <span>delivery</span>
        {' '}
        services or
        <span>Locate a store</span>
        {' '}
        and/or go in person.
      </>,
      text: '',
      image: bgImg5,
      bgColor: ['#27374D', 'transparent'],
    },
  ];

  return (
    <div className="welcome-page-container">

      <div ref={sliderRef} className="welcome-page-big-cards-container">
        <CardSlider data={cardsData} />
      </div>
      <div className="welcome-page-small-cards-container">
        <CatgorySlider data={categoriesData} />
      </div>
      <div ref={searchRef} className="welcome-page-search-bar-container">
        <SearchBar onSearch={(value) => handleSearch(value)} instantSearch homePage />
      </div>
      {
        searchBarOnTop ? (

          <div
            className="welcome-page-search-bar-container"
            style={{ position: 'fixed', top: '50px', zIndex: 8 }}
          >
            <SearchBar onSearch={(value) => handleSearch(value)} instantSearch homePage />
          </div>
        ) : (<></>)
      }
      <div className="welcome-page-items-list-container">
        <ItemsList itemsData={welcomePageItems.data} />
        <div className="welcome-page-see-more-items">
          <Link to="../home">
            See more products
            {' >'}
          </Link>
        </div>
      </div>

      <div className="welcome-page-app-description-container">
        <div className="welcome-page-app-description-wrapp">
          <div className="welcome-page-app-description-div">
            <p>Get to know us.</p>
            <ul>
              <li>About us</li>
              <li>Goals</li>
            </ul>
          </div>
          <div className="welcome-page-app-description-div">
            <p>Make money with us.</p>
            <ul>
              <li>Sell products</li>
              <li>Buy products</li>
              <li>Promote products</li>
              <li>Advertise</li>
            </ul>
          </div>
          <div className="welcome-page-app-description-div">
            <p>Oasis payments Methods</p>
            <ul>
              <li>Card</li>
              <li>Banks</li>
              <li>In personne</li>
              <li>Oasis currency converter</li>
            </ul>
          </div>
          <div
            className="welcome-page-app-description-div"
            style={{ borderRight: 'none' }}
          >
            <p>Let us help you</p>
            <ul>
              <li>Your bag</li>
              <li>Your orders</li>
              <li>Manage your stores</li>
              <li>Oasis assistant</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="welcome-page-footer-container">
        <h3 className="welcome-page-footer-logo">OASIS</h3>
        <p className="welcome-page-footer-licence">
          <AiOutlineCopyright />
          {' '}
          2023 oasis.com ltd
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
