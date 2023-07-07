import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdStorefront, MdOutlineShoppingCart, MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { setCurrentLink } from '../redux/authentication/reusableAuthReducer';
import RedirectToLogin from '../reusable/redirect-to-login/redirectToLogin';
import linkName from '../reusable/remove-blanck-space/linkName';
import orderIcon from '../images/icons/order-icon.png';
import CheckLogin from '../reusable/currentPageUrl/CurrentPageUrl';
import CheckValidImage from '../reusable/check-image/checkValidImage';
import './menu.css';

const Menu = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const userNames = `${userData.user.first_name}-${userData.user.last_name}`;
  const {
    avatar_url, email, first_name, last_name,
  } = userData.user;

  return (
    <div className="Menu sm:w-9/12 lg:w-6/12 xl:w-4/12">
      <div className="hide-menu" onClick={props.hideMenu}>
        <MdClose className="icon icon-close-big" color="#fff" />
      </div>
      <div className="menu-user-details w-full h-3/12">
        <div className="menu-user-pic-wrap">
          <img
            src={CheckValidImage({ avartarUrl: avatar_url, defaultImg: orderIcon })}
            alt=""
          />
        </div>
        <div className="menu-user-name">
          <p>
            {first_name}
            {' '}
            {last_name}
          </p>
        </div>
      </div>
      <div className="menu-links-wrapper flex flex-col">
        <Link
          to={CheckLogin({ path: '../my-stores' })}
          onClick={
            RedirectToLogin() ? () => {
              dispatch(setCurrentLink('../my-stores')); props.hideMenu();
            } : props.hideMenu
}
        >
          <span><MdStorefront className="icon" /></span>
          My Stores
        </Link>

        <Link
          to={CheckLogin({ path: '../cart' })}
          onClick={
            RedirectToLogin() ? () => {
              dispatch(setCurrentLink('../cart')); props.hideMenu();
            }
              : props.hideMenu
}
        >
          <span><MdOutlineShoppingCart className="icon" /></span>
          Cart
        </Link>

        <Link
          to={CheckLogin({ path: '../order' })}
          onClick={
          RedirectToLogin() ? () => {
            dispatch(setCurrentLink('../order')); props.hideMenu();
          }
            : props.hideMenu
}
        >
          <span><img src={orderIcon} alt="" className="icon" /></span>
          Orders
        </Link>
        {
          userData.token ? (
            <Link to={`../account/${linkName(userNames)}`} onClick={props.hideMenu}>
              <span><HiOutlineUserCircle className="icon" /></span>
              My account
            </Link>
          ) : (
            <Link to="../login" onClick={props.hideMenu}>
              <span><HiOutlineUserCircle className="icon" /></span>
              Login
            </Link>
          )
        }
        <Link to="settings" onClick={props.hideMenu}>
          <span><FiSettings className="icon" /></span>
          Settings
        </Link>

      </div>
    </div>
  );
};

export default Menu;
