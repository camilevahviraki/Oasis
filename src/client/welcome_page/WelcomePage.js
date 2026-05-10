import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineCopyright } from 'react-icons/ai';
import { MdLock, MdShield, MdCheckCircle, MdStar, MdChat, MdAccessTime, MdHelp, MdPhone, MdLocalShipping, MdReplay } from 'react-icons/md';
import CardSlider from './card_slider/CardSlider';
import CatgorySlider from './categories_slider/CatgorySlider';
import CatgorySliderFullView from './categories_slider/CatgorySliderFullView';
import { getCategories } from '../../redux/stores_categories/stores_categories_reducer';
import { getWelcomItemsItems, welcomeSearchItem } from '../../redux/home/welcomePageReducer';
import useIsInViewport from '../../reusable/checkInViewwPort/checkInViewPort';
import RedirectToLogin from '../../reusable/redirect-to-login/redirectToLogin';
import CheckLogin from '../../reusable/currentPageUrl/CurrentPageUrl';
import { setCurrentLink } from '../../redux/authentication/reusableAuthReducer';
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
import eCommerceImg from '../../images/welcome_page/ECommerce-Fevad-2023-.jpg';
import './WelcomePage.css';
import './WelcomePage-new-sections.css';

const WelcomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
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
      text: t('pages.home.featured_products'),
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
      <div className="welcome-page-background" />
      <div className="welcome-page-background-gradient" />
      <div ref={sliderRef} className="welcome-page-big-cards-container">
        <CardSlider data={cardsData} />
      </div>
      <div className="big-e-cormerce-img-wrapp">
        <Link
          to={CheckLogin({ path: '../create-store' })}
          onClick={RedirectToLogin() ? () => dispatch(setCurrentLink('../my-stores')) : null}
          className="welcome-page-create-your-store"
        >
          {t('buttons.create_store')}
          <span>{' >'}</span>
        </Link>
        <div className="welcome-page-cbackground-button" />
        <img src={eCommerceImg} alt="" className="big-e-cormerce-img" />
      </div>
      <div className="welcome-page-small-cards-container">
        <CatgorySlider data={categoriesData} />
      </div>
      <div ref={searchRef} className="welcome-page-search-bar-container">
        <div className="welcome-page-search-bar-invisible-wrapp">
          <SearchBar onSearch={(value) => handleSearch(value)} instantSearch homePage />
        </div>
      </div>
      {
        searchBarOnTop ? (

          <div
            className="welcome-page-search-bar-container fixed top-[50px] z-[8]"
          >
            <SearchBar onSearch={(value) => handleSearch(value)} instantSearch homePage />
          </div>
        ) : (<></>)
      }
      <div className="welcome-page-items-list-container">
        <ItemsList itemsData={welcomePageItems.data} />
        <div className="welcome-page-see-more-items">
          <Link to="../home">
            {t('pages.home.view_all')}
            {' >'}
          </Link>
        </div>
      </div>

      {/* Buyer's Journey Section */}
      <div className="welcome-page-buyers-journey-container">
        <h2>{t('pages.welcome.buyers_journey')}</h2>
        <div className="welcome-page-journey-steps">
          <div className="journey-step">
            <div className="journey-step-icon text-3xl" style={{ color: 'var(--oasis-orange)' }}>1</div>
            <h3>{t('pages.welcome.browse_products')}</h3>
            <p>{t('pages.welcome.browse_description')}</p>
          </div>
          <div className="journey-step">
            <div className="journey-step-icon text-3xl" style={{ color: 'var(--oasis-orange)' }}>2</div>
            <h3>{t('pages.welcome.add_to_cart')}</h3>
            <p>{t('pages.welcome.add_to_cart_description')}</p>
          </div>
          <div className="journey-step">
            <div className="journey-step-icon text-3xl" style={{ color: 'var(--oasis-orange)' }}>3</div>
            <h3>{t('pages.welcome.secure_checkout')}</h3>
            <p>{t('pages.welcome.checkout_description')}</p>
          </div>
          <div className="journey-step">
            <div className="journey-step-icon text-3xl" style={{ color: 'var(--oasis-orange)' }}>4</div>
            <h3>{t('pages.welcome.track_order')}</h3>
            <p>{t('pages.welcome.track_description')}</p>
          </div>
        </div>
      </div>

      {/* Safety & Trust Section */}
      <div className="welcome-page-safety-trust-container">
        <h2>{t('pages.welcome.safety_and_trust')}</h2>
        <div className="welcome-page-trust-cards">
          <div className="trust-card">
            <div className="trust-card-icon" style={{ color: 'var(--oasis-orange)' }}><MdLock size={40} /></div>
            <h3>{t('pages.welcome.secure_payments')}</h3>
            <p>{t('pages.welcome.secure_payments_desc')}</p>
          </div>
          <div className="trust-card">
            <div className="trust-card-icon" style={{ color: 'var(--oasis-orange)' }}><MdShield size={40} /></div>
            <h3>{t('pages.welcome.buyer_protection')}</h3>
            <p>{t('pages.welcome.buyer_protection_desc')}</p>
          </div>
          <div className="trust-card">
            <div className="trust-card-icon" style={{ color: 'var(--oasis-orange)' }}><MdCheckCircle size={40} /></div>
            <h3>{t('pages.welcome.verified_sellers')}</h3>
            <p>{t('pages.welcome.verified_sellers_desc')}</p>
          </div>
        </div>
      </div>

      {/* Messaging Feature Section */}
      <div className="welcome-page-messaging-container">
        <div className="messaging-content">
          <div className="messaging-text">
            <h2>{t('pages.welcome.messaging_feature')}</h2>
            <p>{t('pages.welcome.messaging_description')}</p>
            <div className="messaging-benefits">
              <div className="benefit-item">
                <span style={{ color: 'var(--oasis-orange)' }}><MdChat size={28} /></span>
                <p>{t('pages.welcome.direct_communication')}</p>
              </div>
              <div className="benefit-item">
                <span style={{ color: 'var(--oasis-orange)' }}><MdAccessTime size={28} /></span>
                <p>{t('pages.welcome.message_anytime')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support Section */}
      <div className="welcome-page-help-support-container">
        <h2>{t('pages.welcome.help_and_support')}</h2>
        <div className="welcome-page-support-links">
          <Link to="#" className="support-link-item">
            <span style={{ color: 'var(--oasis-orange)' }}><MdHelp size={32} /></span>
            <p>{t('pages.welcome.faq')}</p>
          </Link>
          <Link to="#" className="support-link-item">
            <span style={{ color: 'var(--oasis-orange)' }}><MdPhone size={32} /></span>
            <p>{t('pages.welcome.contact_support')}</p>
          </Link>
          <Link to="../orders" className="support-link-item">
            <span style={{ color: 'var(--oasis-orange)' }}><MdLocalShipping size={32} /></span>
            <p>{t('pages.welcome.track_my_order')}</p>
          </Link>
          <Link to="#" className="support-link-item">
            <span style={{ color: 'var(--oasis-orange)' }}><MdReplay size={32} /></span>
            <p>{t('pages.welcome.return_policy')}</p>
          </Link>
        </div>
      </div>

      {/* Top Sellers Section */}
      <div className="welcome-page-top-sellers-container">
        <h2>{t('pages.welcome.top_sellers')}</h2>
        <p className="top-sellers-subtitle">{t('pages.welcome.featured_stores')}</p>
        <div className="welcome-page-top-sellers-grid">
          {categoriesData && categoriesData.slice(0, 4).map((category, index) => (
            <div key={index} className="seller-card">
              <div className="seller-card-header">
                <span className="seller-badge flex items-center"><MdStar size={18} style={{ color: 'var(--oasis-gold)', marginRight: '4px' }} /> {(4.5 + Math.random() * 0.4).toFixed(1)}</span>
              </div>
              <div className="seller-card-content">
                <h3>{category.name}</h3>
                <p className="seller-rating">{t('pages.welcome.seller_rating')}: {(4.5 + Math.random() * 0.4).toFixed(1)}/5.0</p>
                <p className="seller-feedback">{t('pages.welcome.positive_feedback')}: 95%</p>
                <Link to={`../store/${category.id}`} className="view-store-btn">
                  {t('pages.welcome.view_store')} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing App Description Section */}
      <div className="welcome-page-app-description-container">
        <div className="welcome-page-app-description-wrapp">
          <div className="welcome-page-app-description-div">
            <p>{t('pages.welcome.get_to_know_us')}</p>
            <ul>
              <li>{t('pages.welcome.about_us')}</li>
              <li>{t('pages.welcome.goals')}</li>
            </ul>
          </div>
          <div className="welcome-page-app-description-div">
            <p>{t('pages.welcome.make_money')}</p>
            <ul>
              <li>{t('pages.welcome.sell_products')}</li>
              <li>{t('pages.welcome.buy_products')}</li>
              <li>{t('pages.welcome.promote_products')}</li>
              <li>{t('pages.welcome.advertise')}</li>
            </ul>
          </div>
          <div className="welcome-page-app-description-div">
            <p>{t('pages.welcome.payment_methods')}</p>
            <ul>
              <li>{t('pages.welcome.card')}</li>
              <li>{t('pages.welcome.banks')}</li>
              <li>{t('pages.welcome.in_person')}</li>
              <li>{t('pages.welcome.currency_converter')}</li>
            </ul>
          </div>
          <div
            className="welcome-page-app-description-div border-r-0"
          >
            <p>{t('pages.welcome.let_us_help')}</p>
            <ul>
              <li>{t('common.cart')}</li>
              <li>{t('pages.account.your_orders')}</li>
              <li>{t('pages.welcome.manage_stores')}</li>
              <li>{t('pages.welcome.oasis_assistant')}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="welcome-page-footer-container">
        <h3 className="welcome-page-footer-logo">{t('common.welcome_to_oasis').split(' ')[1]}</h3>
        <p className="welcome-page-footer-licence">
          <AiOutlineCopyright />
          {' '}
          {t('pages.welcome.copyright')}
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
