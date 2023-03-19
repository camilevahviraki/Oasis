import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SellerRouter from './SellerRouter';
import ClientRouter from './ClientRouter';
import AuthRoutes from '../authentication/AuthRoutes';
import UserRoutes from '../user_account/userRoutes';
import Header from '../header/Header';

const MainRouter = () => {
  const user = useSelector((state) => state.authenticationReducer);

  return (
    <BrowserRouter>
      <AuthRoutes />
      {
        user.token
          ? (
            <>
              <Header />
              <ClientRouter />
              <SellerRouter />
              <UserRoutes />
            </>
          )
          : <></>
      }

    </BrowserRouter>
  );
};

export default MainRouter;
