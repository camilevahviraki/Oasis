import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import postPayementIntent from '../postPayementIntent';
import StatusMessages, { useMessages } from './StatusMessages';

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [messages, addMessage] = useMessages();

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      addMessage('Stripe.js has not yet loaded.');
      return;
    }

    const data = {
      paymentMethodType: 'card',
      currency: 'usd',
    }
    const response = await postPayementIntent({data});
    const {error: backendError, clientSecret} = response;

    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    addMessage('Client secret returned');

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      },
    );

    if (stripeError) {
      addMessage(stripeError.message);
      return;
    }

    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  };

  return (
    <>
      <h1>Card</h1>

      <p>
        <h4>
          Try a
          <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer">test card</a>
          :
        </h4>
        <div>
          <code>4242424242424242</code>
          {' '}
          (Visa)
        </div>
        <div>
          <code>5555555555554444</code>
          {' '}
          (Mastercard)
        </div>
        <div>
          <code>4000002500003155</code>
          {' '}
          (Requires
          3DSecure
          )
        </div>
      </p>

      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">Card</label>
        <CardElement id="card" />

        <button type="submit">Pay</button>
      </form>
      <StatusMessages messages={messages} />
    </>
  );
};

export default CardForm;
