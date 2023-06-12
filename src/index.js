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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
