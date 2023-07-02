import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import reportWebVitals from './reportWebVitals';

const publishableKey = 'pk_test_51MvQIxCAdTB9DdU7MpaozucW4ZqBuY2ysOWuXuItSrnszKdpCsiN0PYDS73HmDqxHeMqpOxxi7CA1WeArNAywPiW000d7AAB0Y';
const stripePromise = loadStripe(publishableKey);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
);

reportWebVitals();
