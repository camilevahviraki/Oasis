import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderShow } from '../../../redux/orders/orderShowReducer';
import { setCreateOrderStep } from '../../../redux/orders/createOrderReducer';
import OrderDestination from '../order_destination/OrderDestination';
import OrderPay from '../order_pay/OrderPay';
import OrderFollowUp from '../order_follow_up/OrderFollowUp';
import './OrderShow.css';

const OrderShow = () => {
  const dispatch = useDispatch();
  const { token_id } = useParams();

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
    dispatch(getOrderShow(token_id));
  }, []);

  const createOrderData = useSelector((state) => state.createOrderReducer);
  const { step, message } = createOrderData;
  const orderData = useSelector((state) => state.orderShowReducer);
  const [scrollTo, setScrollTo] = useState(step || 1);
  const {
    created_at,
    id,
    order_destination,
    order_items,
    paid,
    updated_at,
    user_id,
  } = orderData;

  useEffect(() => {
    if (order_destination && step < 2) {
      dispatch(setCreateOrderStep(2));
      setScrollTo(1);
    }
  }, [order_destination]);

  const steps = ['Destination', 'Purchase Order', 'Follow Up'];

  if (scrollTo !== step) {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        left: (step - 1) * containerWidth,
        behavior: 'smooth',
      });
      setScrollTo(step);
    }
  }

  return (
    <>
      {!orderData.error ? (
        <div className="order-show-main-container" ref={containerRef}>
          <div className="item-progress-bar-container">
            {steps.map((stepUp, key) => (
              <div
                key={stepUp}
                className={step > key ? 'item-step active-step' : 'item-step'}
                style={
                  key + 1 === steps.length
                    ? {
                      width: `${
                        (100 - (steps.length - 1) / 2) / steps.length
                      }%`,
                    }
                    : {
                      width: `${97 / steps.length}%`,
                      marginRight: '0.5%',
                    }
                }
                onClick={
                  step >= scrollTo
                    ? () => {
                      setScrollTo(key + 1);
                    }
                    : null
                }
              >
                {stepUp}
              </div>
            ))}
          </div>
          <div className="order-create-sub-page-container">
            {step === 1 ? <OrderDestination /> : <></>}
          </div>
          <div className="order-create-sub-page-container order-pay-container">
            {step === 2 ? <OrderPay /> : <></>}
          </div>
          <div className="order-create-sub-page-container order-pay-container">
            {step === 3 ? <OrderFollowUp /> : <></>}
          </div>
        </div>
      ) : (
        <div>
          Ooops! Couldnt find order with token
          {' '}
          "
          {token_id}
          "
        </div>
      )}
    </>
  );
};

export default OrderShow;
