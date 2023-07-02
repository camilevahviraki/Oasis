import React, { useEffect, useState } from 'react';
import { FiMail, FiPhone, FiLoader } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import CalculatePrice from '../../../reusable/calculatePrice/calculatePrice';
import OrderItem from './OrderItem';
import OrderStripeContainer from '../order_stripe_container/OrderStripeContainer';

const OrderPay = () => {
  const dispatch = useDispatch();

  const orderData = useSelector((state) => state.orderShowReducer);
  const [taxes, setTaxes] = useState(5.2);
  const [specialOffer, setSpecialOffer] = useState(2);
  const [deliverPrice, setDeliverPrice] = useState(0);
  const [loader, setLoader] = useState(false);
  const [showStripe, setShowStripe] = useState(false);

  const {
    created_at,
    id,
    order_destination,
    order_items,
    paid,
    token_id,
    updated_at,
    user_id,
  } = orderData;

  let totalPrice = 0;

  if (order_items) {
    order_items.forEach((item) => {
      totalPrice += item.item.price * item.exchange;
    });
  }

  // const { country, city, email, phone } = order_destination;
  const payOrder = () => {
    setShowStripe(!showStripe);
  };

  return (
    <>
      {orderData.id && order_destination ? (
        <>
          <h3 className="order-create-main-title">
            Order
            {' '}
            <span>
              #
              {token_id}
            </span>
          </h3>
          <div className="order-create-purchase-items">
            {order_items.map((orderItem) => (
              <OrderItem data={orderItem} key={orderItem.id} />
            ))}
          </div>
          <div className="cart-srtipe-container order-create-striper-container">
            <div className="cart-srtipe-div">
              <h5 className="order-stripe-title">Contact</h5>
              <p className="order-stripe-contact">
                <FiMail className="order-stripe-icon" />
                {' '}
                <span>{order_destination.email}</span>
              </p>
              <p className="order-stripe-contact">
                <FiPhone className="order-stripe-icon" />
                {' '}
                <span>{order_destination.phone}</span>
              </p>
            </div>
            <div className="cart-srtipe-div">
              <h5 className="order-stripe-title">Shipping Adress</h5>
              <p className="order-stripe-contact">
                <SlLocationPin className="order-stripe-icon" />
                {' '}
                <span>
                  {order_destination.city}
                  ,
                  {order_destination.country.name}
                </span>
              </p>
            </div>
            <div className="cart-srtipe-div">
              <h5 className="order-stripe-title">Charge Details</h5>
              <h6 className="cart-offer-title order-offer-title">
                Products total price:
                {' '}
                <p>
                  <CalculatePrice price={totalPrice} />
                </p>
              </h6>
              <h6 className="cart-offer-title order-offer-title">
                Special Offer:
                {' '}
                <p>
                  <CalculatePrice price={specialOffer} />
                </p>
              </h6>
              <h6 className="cart-offer-title order-offer-title">
                Taxes(5.2%):
                {' '}
                <p>
                  <CalculatePrice price={(totalPrice * taxes) / 100} />
                </p>
              </h6>
              <h6 className="cart-offer-title order-offer-title">
                Deliver Time:2-3 days
                {' '}
                <p>
                  <CalculatePrice price={0} />
                </p>
              </h6>
              <h6 className="cart-charge-details order-offer-title">
                Calculated Price:
                {' '}
                <p>
                  {' '}
                  {totalPrice <= 10 ? (
                    <CalculatePrice
                      price={
                        totalPrice + deliverPrice + (totalPrice * taxes) / 100
                      }
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
              </h6>
            </div>
            <button
              type="button"
              className="cart-checkout-button"
              onClick={() => payOrder()}
            >
              {loader ? (
                <FiLoader className="button-loader" color="white" />
              ) : (
                ' Pay'
              )}
            </button>
          </div>
          {showStripe ? (
            <div
              className="create-order-payment-container"
            >
              <div className="close-paymement-window">
                <MdOutlineClose
                  className="close-paymement-window-button"
                  onClick={() => setShowStripe(false)}
                />
              </div>
              <OrderStripeContainer />
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderPay;
