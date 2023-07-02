/* eslint-disable react-hooks/rules-of-hooks */

import { useSelector } from 'react-redux';
import axios from 'axios';
import linkURL from '../../redux/link';

const postPayementIntent = async (props) => {
  const orderData = useSelector((state) => state.orderShowReducer);
  const { data } = props;
  const amount = 24000;
  const currency = 'usd';
  const orderToken = orderData.token_id;
  const paymentMethodOptionsGiven = data.paymentMethodOptions;
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
    newData,
  );

  // console.log('payment res =>', response);

  return response.data;
};

export default postPayementIntent;
