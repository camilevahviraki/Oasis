import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../redux/cart/getCartsItemReducer";
import ImageSilder from "../../reusable/images_slider/ImageSilder";
import CartItem from "./cartItem/cartItem";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const [showOptions, setShowOptions] = useState(null);
  const cartResponse  = useSelector(state => state.createCartReducer.message);


  useEffect(() => {
    dispatch(getCartItems(userData.user.id));
  }, []);
  const cartItems = useSelector((state) => state.cartItemsReducer);

  const handleShowOptions = (item) => {
     setShowOptions(item);
     console.log('sho options =>', item);
  }

  return (
    <div className="cart-container-main">
      <div>
      {cartItems.map((cartItem) => (
        <CartItem
          cartItem={cartItem}
          showOptions={showOptions? showOptions.id === cartItem.id: false}
          handleShowOptions={handleShowOptions}
        />
      ))}
      </div>
      <div className="cart-srtipe-container">

      </div>
    </div>
  );
};

export default Cart;
