import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../client/home/Home';

const ClientRouter = () => (
  <Routes>
    <Route path="/" element={(<Home />)} />
  </Routes>
);

export default ClientRouter;
