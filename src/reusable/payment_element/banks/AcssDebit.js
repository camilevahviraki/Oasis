import React, { useState } from 'react';
import {
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import postPayementIntent from '../postPayementIntent';
import StatusMessages from './StatusMessages';

const AcssDebitForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('Jenny Rosen');
  const [email, setEmail] = useState('jenny+skip_waiting@example.com');
  // helper for displaying status messages.
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

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
      paymentMethodType: 'acss_debit',
      currency: 'cad',
    }

    const response = await postPayementIntent({data});
    const {error: backendError, clientSecret} = response;
    console.log(response)
    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    addMessage('Client secret returned');

    const {
      error: stripeError,
      paymentIntent,
    } = await stripe.confirmAcssDebitPayment(clientSecret, {
      payment_method: {
        billing_details: {
          name,
          email,
        },
      },
    });

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
  };

  return (
    <>
      <h1>Pre-authorized debit in Canada (ACSS)</h1>

      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Pay</button>

        <div id="error-message" role="alert" />
      </form>

      <StatusMessages messages={messages} />
    </>
  );
};

export default AcssDebitForm;
