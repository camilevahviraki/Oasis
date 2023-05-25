import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// document.addEventListener('DOMContentLoaded', async () => {
//   // const {publishableKey} = await fetch('/config').then((r) => { return r.json()});
//   // const {publishableKey} = await axios.get('/config').then(res => {console.log(res.data); return res.data});
//   // const stripePromise = loadStripe(publishableKey);
//   const stripePromise = loadStripe('yyyyyyyyyyyyyyyyyyyyyyyyy');


//   ReactDOM.render(
//     <React.StrictMode>
//       <Elements stripe={stripePromise}>
//         <App />
//       </Elements>
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// });
  const publishableKey = 'pk_test_51MvQIxCAdTB9DdU7MpaozucW4ZqBuY2ysOWuXuItSrnszKdpCsiN0PYDS73HmDqxHeMqpOxxi7CA1WeArNAywPiW000d7AAB0Y';
  const stripePromise = loadStripe(publishableKey);
  // const stripePromise = loadStripe('yyyyyyyyyyyyyyyyyyyyyyyyy');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
);