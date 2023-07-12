import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { postStoreToServer } from '../../../redux/stores/createStoreReducer';
import { getStoresShow } from '../../../redux/stores/getStoreShowReducer';
import linkName from '../../../reusable/remove-blanck-space/linkName';
import MyStore from '../EditStore/__my_store_reusable/__my_store';
import { setStoreLink } from '../../../redux/storeLink/storeLinkReducer';
import './css/CreateStorePreview.css';

const CreateStorePreview = (props) => {
  const dispatch = useDispatch();
  const createStoreData = useSelector((state) => state.createStoresReducer);
  const userData = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    if (createStoreData.storeId.store_id) {
      const data = {
        user_id: userData.user.id,
        store_id: createStoreData.storeId.store_id,
      };
      dispatch(getStoresShow(data));
    }
  }, []);

  const storeData = useSelector((state) => state.getStoreShowReducer);

  const saveStoreLink = (link, id) => {
    localStorage.setItem('storeLink', JSON.stringify({ link, store_id: id }));
    dispatch(setStoreLink({ link: linkName(link), store_id: id }));
  };

  if (props.progress === 5) {
    return (
      <div
        className="create_store_preview_container"
      >
        <MyStore storeData={storeData} />
        <div className="create-store-preview-submit-container row">
          <Link
            to={`../store/${storeData.token_id}`}
            onClick={() => {
              dispatch(postStoreToServer());
            }}
            className="user-authentication-form-button"
          >
            Next
            {' '}
            {'>'}
          </Link>
        </div>
      </div>
    );
  }
  return <></>;
};

export default CreateStorePreview;
