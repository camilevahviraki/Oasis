import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderIndex } from "../../../redux/orders/ordersIndexReducer";
import './OrdersIndex.css';

const OrdersIndex = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    dispatch(getOrderIndex(userData.user.id))
  }, [])

  const ordersList = useSelector((state) => state.ordersIndexReducer);

  return (
    <div>
      {JSON.stringify(ordersList)}
    </div>
  )
}

export default OrdersIndex