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

const SellerRouter = () => {
  const dispatch = useDispatch();
  const createStoreData = useSelector((state) => state.createStoresReducer);

  useEffect(() => {
    const { step } = createStoreData.storeId;
    if (step === 5 || step === '5') {
      dispatch(postStoreToServer());
    }
  }, []);

  const storeLink = useSelector((state) => state.storeLinkReducer);
  const itemLink = useSelector((state) => state.itemLinkReducer);

  console.log('update link', `store/${storeLink.link.link}/update`);

  return (
    <Routes>
      <Route
        path={storeLink.link
          ? `store/${storeLink.link.link}`
          : 'my-stores/error_page'}
        element={(<StoreShow />)}
      />
      <Route path="create-store" element={(<CreateStore />)} />
      <Route path="my-stores" element={(<MyStores />)} />
      <Route
        path={storeLink.link
          ? `my-stores/${storeLink.link.link}/edit`
          : 'my-stores/error_page'}
        element={(<StoreEdit />)}
      />
      <Route
        path={storeLink.link
          ? `my-stores/${storeLink.link.link}/items`
          : 'my-stores/error_page'}
        element={(<StoreItems />)}
      />
      <Route
        path={storeLink.link
          ? `my-stores/${storeLink.link.link}/item/new`
          : 'my-stores/error_page'}
        element={(<CreateItem />)}
      />
      <Route
        path={itemLink.link ? itemLink.link : 'my-stores/error_page'}
        element={(<ItemShow />)}
      />
      <Route
        path={`store/${storeLink.link.link}/update`}
        element={(<UpdateStore />)}
      />
      <Route
        path={`store/${storeLink.link.link}/update/new_image`}
        element={(<NewStorePicture />)}
      />
    </Routes>
  );
};

export default SellerRouter;
