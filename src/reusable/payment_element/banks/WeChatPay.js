import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import StatusMessages, { useMessages } from './StatusMessages';
import postPayementIntent from '../postPayementIntent';

const WeChatPay = () => {
  const [messages, addMessage] = useMessages();
  const stripe = useStripe();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe) {
      return;
    }

    const data = {
      paymentMethodType: 'wechat_pay',
      currency: 'cny',
    }
    const response = await postPayementIntent({data});
    const {error: backendError, clientSecret} = response;

    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    // Confirm the payment on the client
    const {
      error,
      paymentIntent,
    } = await stripe.confirmWechatPayPayment(
      clientSecret, {
        payment_method_options: {
          wechat_pay: {
            client: 'web',
          },
        },
      },
    );

    if (error) {
      addMessage(error.message);
      return;
    }
    addMessage(`Payment: ${paymentIntent.id} ${paymentIntent.status}`);
  };

  return (
    <>
      <h1>WeChat Pay</h1>

      <form id="payment-form" onSubmit={handleSubmit}>
        <button>Pay</button>
      </form>

      <StatusMessages messages={messages} />
    </>
  );
};

export default WeChatPay;
