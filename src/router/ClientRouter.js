import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../client/home/Home';
import Cart from '../seller/carts/Cart';
import Places from '../seller/places/Places';
import WelcomePage from '../client/welcome_page/WelcomePage';
import StorePlace from '../seller/store_place/StorePlace';

const ClientRouter = () => (
  <Routes>
    <Route path="/" element={(<WelcomePage />)} />
    <Route path="home" element={(<Home />)} />
    <Route path="cart" element={<Cart />} />
    <Route path="places" element={<Places />} />
    <Route path="store/:token_id/location" element={<StorePlace />} />
  </Routes>
);

export default ClientRouter;
