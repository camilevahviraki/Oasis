import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiMessengerLine } from 'react-icons/ri';
import { getCartItems } from '../redux/cart/getCartsItemReducer';
import Menu from './menu';
import linkName from '../reusable/remove-blanck-space/linkName';
import Currency from './currencies/Currency';
import CheckValidImage from '../reusable/check-image/checkValidImage';
import chatIcon from '../images/icons/chat-icon-f.png';
import placesIcon from '../images/icons/travel_explore_FILL0_wght400_GRAD0_opsz48.png';
import homeIcon from '../images/home-icon.png';
import userIcon from '../images/user-icon.png';
import hamburger from '../images/icons/menu-hamburger.png';
import storeIcon from '../images/icons/storefront_FILL0_wght400_GRAD0_opsz48.png';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const userData = useSelector((state) => state.authenticationReducer);
  const userNames = `${userData.user.first_name}-${userData.user.last_name}`;
  const userImage = userData.user.avatar_url;
  const hideMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    dispatch(getCartItems(userData.user.id));
  }, []);

  const cartData = useSelector((state) => state.cartItemsReducer);

  const links = [
    { id: 1, icon: homeIcon, link: '../' },
    { id: 2, icon: placesIcon, link: '../places' },
    { id: 3, icon: storeIcon, link: '../my-stores' },
  ];

  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="flex align-center w-full">
      <div className="logo-wrap">
        <h7>OASIS</h7>
      </div>
      <div className="flex align-center header-icons">
        {links.map((link) => (
          <Link to={link.link}>
            {link.icon ? <img src={link.icon} alt="" /> : 'link'}
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
        <button type="button" onClick={() => setShowMenu(true)}>
          <img src={hamburger} alt="" className="user-Icon" />
        </button>
      </div>
      {showMenu ? <Menu hideMenu={hideMenu} /> : <></>}

    </header>
  );
};

export default Header;
