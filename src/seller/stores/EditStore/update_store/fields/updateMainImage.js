import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillPicture } from 'react-icons/ai';
import { getStoresShow } from '../../../../../redux/stores/getStoreShowReducer';
import {
  updateStore,
  resetStoreFieldToUpdate,
} from '../../../../../redux/stores/updateStoreReducer';
import storeSplahImage from '../../../../../images/store-image-holder.png';

const UpdateMainImage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const updateStoreData = useSelector((state) => state.updateStoreReducer);
  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: storeData.id,
      }),
    );
    if (updateStoreData.response) {
      dispatch(resetStoreFieldToUpdate());
    }
  }, [updateStoreData.response]);
  const updateStoreImage = (image) => {
    const data = {
      field: 'main_image',
      store_id: storeData.id,
      new_value: image,
    };
    dispatch(updateStore(data, data.store_id));
  };

  const { id, main_image_url } = storeData;

  return (
    <div>
      <div className="create-store-main-image-preview-container">
        <div className="create-store-image-preview-wrapp">
          <img
            src={main_image_url || storeSplahImage}
            alt=""
            className="create-store-image-preview"
          />
        </div>
        <label htmlFor="store-image" className="create-store-label-input-file">
          <AiFillPicture />
          <input
            id="store-image"
            type="file"
            accept="image/*"
            className="create-item-input-file"
            onChange={(e) => updateStoreImage(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
};

export default UpdateMainImage;
