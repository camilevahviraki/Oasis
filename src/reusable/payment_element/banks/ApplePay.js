import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StatusMessages, { useMessages } from './StatusMessages';
import postPayementIntent from '../postPayementIntent';

const ApplePay = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [messages, addMessage] = useMessages();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1999,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (e) => {
      const data = {
        paymentMethodType: 'card',
        currency: 'usd',
      };

      const response = await postPayementIntent({ data });
      const { error: backendError, clientSecret } = response;

      if (backendError) {
        addMessage(backendError.message);
        return;
      }

      addMessage('Client secret returned');

      const {
        error: stripeError,
        paymentIntent,
      } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: e.paymentMethod.id,
      }, { handleActions: false });

      if (stripeError) {
        // Show error to your customer (e.g., insufficient funds)
        addMessage(stripeError.message);
        return;
      }

      // Show a success message to your customer
      // There's a risk of the customer closing the window before callback
      // execution. Set up a webhook or plugin to listen for the
      // payment_intent.succeeded event that handles any business critical
      // post-payment actions.
      addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    });
  }, [stripe, elements, addMessage]);

  return (
    <>
      <h1>Apple Pay</h1>

      <a href="https://stripe.com/docs/stripe-js/elements/payment-request-button" target="_blank" rel="noreferrer">Stripe Documentation</a>

      {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}

      <StatusMessages messages={messages} />
    </>
  );
};

export default ApplePay;
