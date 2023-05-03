import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../client/home/Home';
import Cart from '../seller/carts/Cart';

const ClientRouter = () => (
  <Routes>
    <Route path="/" element={(<Home />)} />
    <Route path='cart' element={<Cart/>}/>
  </Routes>
);

export default ClientRouter;
