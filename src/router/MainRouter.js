import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SellerRouter from './SellerRouter';
import ClientRouter from './ClientRouter';
import AuthRoutes from '../authentication/AuthRoutes';
import UserRoutes from '../user_account/userRoutes';
import Header from '../header/Header';
import UpdateAccount from '../authentication/updateAccount';
import Authentication from '../reusable/authentication/Authentication';
import AdminRoutes from '../Admin/routes/AdminRoutes';

const MainRouter = () => {
  const user = useSelector((state) => state.authenticationReducer);

  return (
    <BrowserRouter>
      {user.user.admin ? <AdminRoutes /> : null}
      {user.token ? (
        <>
          <Header />
          <Authentication />
          <AuthRoutes />
          <ClientRouter />
          <SellerRouter />
          <UserRoutes />
          <Routes>
            <Route path="account-update" element={<UpdateAccount />} />
          </Routes>
        </>
      ) : (
        <>
          <Authentication />
          <Header />
          <AuthRoutes />
          <ClientRouter />
          <SellerRouter />
        </>
      )}
    </BrowserRouter>
  );
};

export default MainRouter;
