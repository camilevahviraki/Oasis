import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FiLoader } from 'react-icons/fi';
import { getCartItems } from '../../redux/cart/getCartsItemReducer';
import { deleteCartItem } from '../../redux/cart/createCartReducer';
import { deleteItemIdToCartList } from '../../redux/cart/addedToCartIdList';
import CalculatePrice from '../../reusable/calculatePrice/calculatePrice';
import CartItem from './cartItem/cartItem';
import { createNewOrderItem } from '../../redux/orders/createOrderReducer';
import './cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authenticationReducer);
  const createOrderData = useSelector((state) => state.createOrderReducer);
  const [showOptions, setShowOptions] = useState(null);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState(null);
  const [taxes, setTaxes] = useState(5.2);
  const [specialOffer, setSpecialOffer] = useState(2);
  const [deliverPrice, setDeliverPrice] = useState(0);

  useEffect(() => {
    dispatch(getCartItems(userData.user.id));
  }, []);
  const cartItems = useSelector((state) => state.cartItemsReducer);

  const handleShowOptions = (item) => {
    setShowOptions(item);
  };

  const checkoutCart = () => {
    setLoader(true);
    dispatch(
      createNewOrderItem({
        user_id: userData.user.id,
        order_items: cartItems,
      }),
    );
  };

  useEffect(() => {
    if (createOrderData.message === 'Order purachased successfully!') {
      cartItems.forEach((item) => {
        dispatch(deleteCartItem(item.id));
        dispatch(deleteItemIdToCartList(item.cart_item.id));
      });
      dispatch(getCartItems(userData.user.id));
      setLoader(false);
      navigate(`../order/${createOrderData.order_id}`);
    } else if (createOrderData.message === 'Error while creating order!') {
      setMessage('Error while purchasing Items');
      setLoader(false);
    }
  }, [createOrderData]);

  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="cart-container-main">
      <div>
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            showOptions={showOptions ? showOptions.id === cartItem.id : false}
            handleShowOptions={handleShowOptions}
          />
        ))}
      </div>
      <div className="cart-srtipe-container">
        <h4 className="cart-charge-details">Charge Details</h4>
        <h5 className="cart-offer-title">
          Products total price:
          {' '}
          <p>
            <CalculatePrice price={totalPrice} />
          </p>
        </h5>
        <h5 className="cart-offer-title">
          Special Offer:
          {' '}
          <p>
            <CalculatePrice price={specialOffer} />
          </p>
        </h5>
        <h5 className="cart-offer-title">
          Deliver Time : 2-3 days
          {' '}
          <p>
            <CalculatePrice price={deliverPrice} />
          </p>
        </h5>
        <h5 className="cart-offer-title">
          Taxes (
          {taxes}
          %):
          {' '}
          <p>
            <CalculatePrice price={(totalPrice * taxes) / 100} />
          </p>
        </h5>
        <h5 className="cart-charge-details">
          Calculated Price
          {' '}
          <p>
            {cartItems.length === 0 ? (
              <CalculatePrice
                price={totalPrice + deliverPrice + (totalPrice * taxes) / 100}
              />
            ) : (
              <CalculatePrice
                price={
                  totalPrice
                  - specialOffer
                  + deliverPrice
                  + (totalPrice * taxes) / 100
                }
              />
            )}
          </p>
        </h5>
        <p className="cart-charge-additional-charges">
          Additional charges may apply for special cases
        </p>
        <button
          type="button"
          className={
            cartItems.length === 0
              ? 'cart-checkout-button disabled-button'
              : 'cart-checkout-button'
          }
          onClick={() => checkoutCart()}
          disabled={cartItems.length === 0}
        >
          {loader ? <FiLoader className="button-loader" color="white" /> : ' Checkout'}
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Cart;
