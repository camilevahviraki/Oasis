import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateStore from '../seller/stores/CreateStore/CreateStore';
import MyStores from '../seller/stores/MyStores/MyStores';

const SellerRouter = () => {
  return (
      <Routes>
         <Route path='create-store' element={(<CreateStore/>)}/>
         <Route path='my-stores' element={(<MyStores/>)}/>
      </Routes>
  )
}

export default SellerRouter