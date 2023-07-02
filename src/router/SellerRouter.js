import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { postStoreToServer } from '../redux/stores/createStoreReducer';
import CreateStore from '../seller/stores/CreateStore/CreateStore';
import MyStores from '../seller/stores/MyStores/MyStores';
import StoreEdit from '../seller/stores/EditStore/EditStore';
import StoreItems from '../seller/stores/StoreDetails/StoreItems';
import CreateItem from '../seller/items/createItem/createItem';
import StoreShow from '../seller/stores/StoreDetails/StoreShow';
import ItemShow from '../seller/items/showItem/ItemShow';
import UpdateStore from '../seller/stores/EditStore/update_store/UpdateStore';
import NewStorePicture from '../seller/stores/EditStore/update_store/fields/NewPicture';
import InSightData from '../seller/stores/InSightData/InSightData';
import OrderShow from '../seller/orders/order_show/OrderShow';
import OrdersIndex from '../seller/orders/orders_index/OrdersIndex';

const SellerRouter = () => {
  const dispatch = useDispatch();
  const createStoreData = useSelector((state) => state.createStoresReducer);

  useEffect(() => {
    const { step } = createStoreData.storeId;
    if (step === 5 || step === '5') {
      dispatch(postStoreToServer());
    }
  }, []);

  return (
    <Routes>
      <Route
        path="order"
        element={(<OrdersIndex />)}
      />
      <Route
        path="order/:token_id"
        element={(<OrderShow />)}
      />
      <Route
        path="store/:token_id"
        element={(<StoreShow />)}
      />
      <Route
        path="store/:token_id/analysis"
        element={(<InSightData />)}
      />
      <Route path="create-store" element={(<CreateStore />)} />
      <Route path="my-stores" element={(<MyStores />)} />
      <Route
        path="my-store/:token_id/edit"
        element={(<StoreEdit />)}
      />
      <Route
        path="my-store/:token_id/items"
        element={(<StoreItems />)}
      />
      <Route
        path="my-store/:token_id/item/new"
        element={(<CreateItem />)}
      />
      <Route
        path="item/:name/id/:id"
        element={(<ItemShow />)}
      />
      <Route
        path="store/:store_name/item/:name/id/:id"
        element={(<ItemShow />)}
      />
      <Route
        path="store/:token_id/update"
        element={(<UpdateStore />)}
      />
      <Route
        path="store/:token_id/update/new_image"
        element={(<NewStorePicture />)}
      />
    </Routes>
  );
};

export default SellerRouter;
