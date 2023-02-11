import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CreateStore from '../seller/stores/CreateStore/CreateStore';
import MyStores from '../seller/stores/MyStores/MyStores';
import StoreEdit from '../seller/stores/EditStore/EditStore';
import StoreItems from '../seller/stores/StoreDetails/StoreItems';
import CreateItem from '../seller/items/createItem/createItem';

const SellerRouter = () => {

  // const [storeLink, setStoreLink] = useState(null);
  const storeLink = useSelector((state) => state.storeLinkReducer);
  // console.log(storeLinkSaved.link)

  return (
      <Routes>
          <Route path='create-store' element={(<CreateStore/>)}/>
          <Route path='my-stores' element={(<MyStores/>)}/>
          <Route path={storeLink.link?
            `my-stores/${storeLink.link.link}/edit`:
            `my-stores/error_page`
            } element={(<StoreEdit/>)}
          />
          <Route path={storeLink.link?
              `my-stores/${storeLink.link.link}/items`:
              `my-stores/error_page`
            } element={(<StoreItems/>)}
          />
          <Route path={storeLink.link?
              `my-stores/${storeLink.link.link}/item/new`:
              `my-stores/error_page`
            } element={(<CreateItem/>)}
          />
      </Routes>
  )
}

export default SellerRouter