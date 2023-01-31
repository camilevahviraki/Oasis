import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CreateStore from '../seller/stores/CreateStore/CreateStore';
import MyStores from '../seller/stores/MyStores/MyStores';
import StoreShow from '../seller/stores/StoreDetails/StoreShow';

const SellerRouter = () => {

  // const [storeLink, setStoreLink] = useState(null);
  const storeLink = useSelector((state) => state.storeLinkReducer);
  // console.log(storeLinkSaved.link)

  return (
      <Routes>
         <Route path='create-store' element={(<CreateStore/>)}/>
         <Route path='my-stores' element={(<MyStores/>)}/>
         <Route path={storeLink.link?
          `my-stores/${storeLink.link.link}`:
          `my-stores/error_page`
        } element={(<StoreShow/>)}/>
      </Routes>
  )
}

export default SellerRouter