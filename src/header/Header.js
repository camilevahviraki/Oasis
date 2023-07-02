import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiMessengerLine } from 'react-icons/ri';
import {GoHome} from 'react-icons/go';
import {MdOutlineStorefront} from 'react-icons/md';
import {ImEarth} from 'react-icons/im';
import { getCartItems } from '../redux/cart/getCartsItemReducer';
import Menu from './menu';
import linkName from '../reusable/remove-blanck-space/linkName';
import Currency from './currencies/Currency';
import CheckValidImage from '../reusable/check-image/checkValidImage';
import userIcon from '../images/user-icon.png';
import hamburger from '../images/icons/menu-hamburger.png';
// import { ReactComponent as OasisLogo } from '../images/logos/oasis-logo4.svg';
import './Header.css';

const Header = () => {
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.authenticationReducer);
  const userNames = `${userData.user.first_name}-${userData.user.last_name}`;
  const userImage = userData.user.avatar_url;
  const hideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  }

  useEffect(() => {
    dispatch(getCartItems(userData.user.id));
  }, []);

  const cartData = useSelector((state) => state.cartItemsReducer);

  const iconsStyle = {
    width: '30px',
    height: 'auto',
    marginRight: '30px',
  }

  const links = [
    { id: 1, icon: <GoHome style={iconsStyle} className='header-icons-r'/>, link: '../home' },
    { id: 2, icon: <ImEarth style={iconsStyle} className='header-icons-r'/>, link: '../places' },
    { id: 3, icon: <MdOutlineStorefront style={iconsStyle} className='header-icons-r'/>, link: '../my-stores' },
  ];

  const currenPath = window.location.pathname;

  return (
    <header className="flex align-center w-full">
      <div className="logo-wrap">
        <Link to={"../"}>OASIS</Link>
      </div>
      <div className="flex align-center header-icons">
        {links.map((linkObj) => (
          <Link
            to={linkObj.link}
            className={
              currenPath.substring(1) === linkObj.link.replace(/(\.\.\/)/g, '')?
              'header-current-link':'header-home-link'
            }
          >
            {linkObj.icon}
          </Link>
        ))}
      </div>
      <div className="right-icons-wrap flex align-center">
        <Currency />

        <Link to="../cart" className="cart-icon">
          <span className="header-cart-length">{cartData.length}</span>
          <HiOutlineShoppingCart className="user-Icon" />
        </Link>
        <Link to="../chat">
          <RiMessengerLine className="user-Icon" />
        </Link>
        <Link to={`../account/${linkName(userNames)}`}>
          <div className="user-Icon-wrap">
            <img src={CheckValidImage({ avartarUrl: userImage, defaultImg: userIcon })} alt="" className="user-Icon-r" />
          </div>
        </Link>
        <button type="button" onClick={handleShowMenu}>
          <img src={hamburger} alt="" className="user-Icon" />
        </button>
      </div>
      {showMenu ? <Menu hideMenu={hideMenu} /> : <></>}

    </header>
  );
};

export default Header;
