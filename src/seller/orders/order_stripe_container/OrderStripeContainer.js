import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import PaymentElement from '../../../reusable/payment_element/PaymentElement';

const OrderStripeContainer = () => (<PaymentElement />);

export default OrderStripeContainer;
