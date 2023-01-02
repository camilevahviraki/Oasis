import React from "react";
import { Link } from "react-router-dom";
import closeIcon from '../images/icons/close-icon.png';
import userIcon from '../images/icons/account_circle_FILL0_wght400_GRAD0_opsz48.png';
import settingIcon from '../images/icons/settings_FILL0_wght400_GRAD0_opsz48.png';
import storesIcon from '../images/icons/storefront_FILL0_wght400_GRAD0_opsz48.png';
import cartIcon from '../images/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.png';
import orderIcon from '../images/icons/order-icon.png';
import './menu.css'

const Menu = (props) => {
  return (
    <div className="Menu sm:w-9/12 lg:w-6/12 xl:w-4/12">
      <div className="hide-menu" onClick={props.hideMenu}>
        <img src={closeIcon} alt='' className="icon"/>
      </div>
      <div className="menu-user-details w-full h-3/12">
        <div className="menu-user-pic-wrap"></div>
        <div className="menu-user-name">
          <p>first-name last-name</p>
        </div>
      </div>
      <div className="menu-links-wrapper flex flex-col">
        <div>
          <img src={storesIcon} alt="" className="icon"/>
          <Link to="my-stores">My Stores</Link>
        </div>
        <div>
          <img src={cartIcon} alt="" className="icon"/>
          <Link to="cart">Cart</Link>
        </div>
        <div>
          <img src={orderIcon} alt="" className="icon"/>
          <Link to="order">Orders</Link>
        </div>
        <div>
          <img src={userIcon} alt="" className="icon"/>
          <Link to="my-account-">My account</Link>
        </div>
        <div>
          <img src={settingIcon} alt="" className="icon"/>
          <Link to="settings">Settings</Link>
        </div>

      </div>
    </div>
  );
};

export default Menu;
