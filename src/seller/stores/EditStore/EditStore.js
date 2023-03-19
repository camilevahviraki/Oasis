import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoresShow } from '../../../redux/stores/getStoreShowReducer';
import { setStoreLink } from '../../../redux/storeLink/storeLinkReducer';
import linkName from '../../../reusable/remove-blanck-space/linkName';
import MyStore from './__my_store_reusable/__my_store';
import './EditStore.css';

const StoreEdit = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const storeId = useSelector((state) => state.storeLinkReducer.link);
  const storeData = useSelector((state) => state.getStoreShowReducer);

  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: storeId.store_id,
      })
    );

    // dispatch(setStoreLink({
    //   link: linkName(storeData.name),
    //   store_id: storeId.store_id,
    //   })
    // );
  }, []);

  return (
    <div className="store-show-container w-full flex flex-col center">
      <MyStore storeData={storeData} />
    </div>
  );
};

export default StoreEdit;
