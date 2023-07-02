import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImagesForAStore } from '../../../../../redux/stores/getStoreImagesReducer';
import { resetStoreFieldToUpdate } from '../../../../../redux/stores/updateStoreReducer';
import Loader from '../../../../../reusable/loader/Loader';
import linkName from '../../../../../reusable/remove-blanck-space/linkName';
import ImageToUpdateOptions from './updatePictures/ImageToUpdateOptions';
import createNewIcon from '../../../../../images/icons/more-icon.png';
import itemOptions from '../../../../../images/icons/item_options_3dots.png';
import './css/updatePictures.css';

const UpdatePictures = (props) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.getStoreShowReducer);

  useEffect(() => {
    dispatch(getImagesForAStore(storeData.id));
    dispatch(resetStoreFieldToUpdate());
  }, []);

  const storeImages = useSelector((state) => state.getStoreImagesReducer);
  const updateImageData = useSelector((state) => state.updateStoreReducer);
  const [imageOptionsShown, setImageOptionsShown] = useState(false);
  const [imageOptions, setImageOptions] = useState({ id: null });
  const [deleting, setDeleting] = useState(false);

  const showImageOptions = (data) => {
    setImageOptionsShown(!imageOptionsShown);
    setImageOptions(data);
  };

  const showOptions = (state) => {
    setImageOptionsShown(state);
  };

  const showLoader = (state) => {
    setDeleting(state);
  };

  if (updateImageData.response) {
    if (updateImageData.response.message === 'Image deleted successfully'
       || updateImageData.response.message === 'Error while deleting image'
    ) {
      setImageOptionsShown(false);
      setDeleting(false);
      dispatch(getImagesForAStore(storeData.id));
      dispatch(resetStoreFieldToUpdate());
    }
  }

  return (
    <div className="update-store-images">
      {
        deleting && !updateImageData.response ? <Loader /> : <></>
      }

      <Link to={`../store/${linkName(storeData.name)}/update/new_image`} className="my-store-create-new flex new-image-link">
        <img src={createNewIcon} alt="" className="icon" />
        <p>New picture</p>
      </Link>

      {storeImages.map((imageData) => {
        const {
          description, id, pictures_data, store_id,
        } = imageData;
        return (
          < >
            {pictures_data.map((imageUrlandData) => {
              const { image_data, url } = imageUrlandData;

              return (
                <div
                  key={url}
                  className="store_image_to_update_wrapper"
                  onClick={() => { imageOptionsShown ? setImageOptionsShown(false) : null; }}
                >
                  <img
                    src={url}
                    alt=""
                    className="store_image_to_update"
                  />
                  <div className="store_image_to_update_options_button">
                    <img src={itemOptions} alt="" className="icon" onClick={() => showImageOptions(image_data)} />
                    {
                      image_data.id === imageOptions.id && imageOptionsShown
                        ? (
                          <ImageToUpdateOptions
                            showImageOptions={showOptions}
                            imageData={image_data}
                            imageUrl={url}
                            showLoader={showLoader}
                          />
                        )
                        : <></>
                    }
                  </div>
                </div>
              );
            })}
          </>
        );
      })}

      <p>{updateImageData.response ? updateImageData.response.message : null}</p>
    </div>
  );
};

export default UpdatePictures;
