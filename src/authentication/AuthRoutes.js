import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './signup';
import SignIn from './signin';
import ForgotPassword from './forgotPassword';
import UpdateAccount from './updateAccount';

const AuthRoutes = () => (
  <Routes>
    <Route path="signup" element={(<SignUp />)} />
    <Route path="login" element={(<SignIn />)} />
    <Route path="forgot-password" element={(<ForgotPassword />)} />
    <Route path="account-update" element={(<UpdateAccount />)} />
  </Routes>
);

export default AuthRoutes;
