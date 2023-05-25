import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../client/home/Home';
import Cart from '../seller/carts/Cart';
import Places from '../seller/places/Places';

const ClientRouter = () => (
  <Routes>
    <Route path="/" element={(<Home />)} />
    <Route path='cart' element={<Cart/>}/>
    <Route path='places' element={<Places/>}/>
  </Routes>
);

export default ClientRouter;
