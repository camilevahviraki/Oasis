import React from "react";
import { useSelector } from "react-redux";
import linkURL from "../../redux/link";
import axios from "axios";

const postPayementIntent = async (props) => {
  const orderData = useSelector((state) => state.orderShowReducer);
  const { data } = props;
  const amount = 24000;
  const currency = "usd";
  const orderToken = orderData.token_id;
  let paymentMethodOptionsGiven = data.paymentMethodOptions;
  const paymentMethodOptions = { orderData };

  const newData = {
    ...data,
    amount,
    paymentMethodOptions: paymentMethodOptionsGiven
      ? { ...paymentMethodOptionsGiven, orderData }
      : paymentMethodOptions,
    currency,
    orderToken,
  };

  const response = await axios.post(
    `${linkURL}/orders/${orderToken}/create-payment-intent`,
    newData
  );

  console.log("payment res =>", response);

  return response.data;
};

export default postPayementIntent;
