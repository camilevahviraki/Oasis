import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LimitText from "../../../reusable/limit-text-length/limitText";
import { getOrderIndex } from "../../../redux/orders/ordersIndexReducer";
import CalculateTotalPrice from "../../../reusable/calculate-total-price/CalculateTotalPrice";
import OrderItems from "./order_items/OrderItems";
import "./OrdersIndex.css";

const OrdersIndex = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    dispatch(getOrderIndex(userData.user.id));
  }, []);

  const ordersList = useSelector((state) => state.ordersIndexReducer);
  console.log("orders ==>", ordersList);

  return (
    <div className="orders-list-container">
      <div className="orders-filters-wrapper">
        <button type="button">All</button>
        <button type="button">Paid</button>
        <button type="button">Unfinished</button>
      </div>
      <div className="order-in-list-wrapper order-in-list-wrapper-title">
        <div></div>
        <div className="order-in-list-title">Order Id</div>
        <div className="order-in-list-title">Products</div>
        <div className="order-in-list-title">Created</div>
        <div className="order-in-list-title">fulfilment</div>
        <div className="order-in-list-title">Total price</div>
        <div className="order-in-list-title">Updated</div>
      </div>

      <div className="orders-list-wrapper">
        {ordersList.map((order) => {
          const {
            created_at,
            id,
            order_destination,
            order_items,
            paid,
            token_id,
            updated_at,
            user_id,
          } = order;
          return (
            <div className="order-in-list-wrapper">
              <div className="order-radio-button">
                <input type="checkbox" checked />
              </div>
              <div className="order-token-id">
                <Link to={`../order/${token_id}`}>
                  <LimitText text={token_id} limit={10} />
                </Link>
              </div>
              <div className="order-items-in-list">
                <OrderItems orderItems={order_items} />
                <p className="order-index-more-products">
                  {order_items.length}{" "}products
                </p>
              </div>
              <div className="order-created-at">{created_at}</div>
              <div className="order-fulfilement">
                {!order_destination ? (
                  <h5 className="order-fulfilement-button">Unfilled</h5>
                ) : (
                  <>
                    {paid ? (
                      <h5 className="order-fulfilement-button green-1">Paid</h5>
                    ) : (
                      <h5 className="order-fulfilement-button blue-1">
                        Pending payment
                      </h5>
                    )}
                  </>
                )}
              </div>
              <div className="order-total-price-in-list">
                <CalculateTotalPrice itemsList={order_items} />
              </div>
              <div className="order-updated-date">{updated_at}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersIndex;
