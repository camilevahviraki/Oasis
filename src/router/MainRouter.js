import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellerRouter from './SellerRouter';
import ClientRouter from './ClientRouter';
import Header from '../header/Header';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header/>
      <SellerRouter/>
    </BrowserRouter>
  )
}

export default MainRouter