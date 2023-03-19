import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../../../redux/upload';
import UploadProgress from '../../../reusable/upload-progress/UploadProgress';
import {
  addStorePictures,
  getStoreId,
} from '../../../redux/stores/createStoreReducer';
import Loader from '../../../reusable/loader/Loader';
import inputFileIcon from '../../../images/input-file.png';
import storeImage from '../../../images/store-image-holder.png';
import './css/CreateStorePictures.css';

const CreateStorePictures = (props) => {
  const [currentDescription, setCurrentDescription] = useState('');
  const [gallery, setGallery] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showLoader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const getProgress = (prog) => {
    setProgress(prog);
  };

  const getUploadResponse = (res) => {
    if (!res.store_id) {
      setLoader(false);
      setMessage('Error while uploading images!Please reupload again.');
    }
  };

  const userData = useSelector((state) => state.authenticationReducer);
  const storeData = useSelector((state) => state.createStoresReducer);
  const { token } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    gallery.forEach((img) => {
      formData.append('images[]', img);
    });
    formData.append('step', 3);
    formData.append('store_id', storeData.storeId.store_id);
    formData.append('fyle_type', 'image');
    formData.append('user_id', userData.user.id);
    Upload({
      endPoint: 'api_stores',
      data: formData,
      dispatchResponse: (sent) => dispatch(getStoreId(sent)),
      sendData: (res) => dispatch(getUploadResponse(res)),
      getProgress: (prog) => getProgress(prog),
    });
    dispatch(addStorePictures(formData, token));
    setLoader(true);
  };

  const handlePreview = (e) => {
    setGallery(Array.prototype.slice.call(e.target.files));
  };

  if (props.progress === 3) {
    return (
      <div className="create-store-pictures">
        <div className="create-store-images-preview">
          { gallery.length === 0 ? (
            <img src={storeImage} alt="" />
          ) : (
            Object.keys(gallery).map((keyName, i) => (
              <div className="create-store-image-preview-container">
                {
                    gallery[keyName].type.includes('image') ? (
                      <img
                        src={URL.createObjectURL(gallery[keyName])}
                        alt=""
                        className="create-store-image-preview"
                      />
                    ) : (
                      <video width="400px" controls>
                        <source src={URL.createObjectURL(gallery[keyName])} />
                      </video>
                    )
                  }
              </div>
            ))
          )}
        </div>

        {showLoader && props.progress === 3
          ? (
            <>
              <div style={{ width: '300px', marginBottom: '20px' }}>
                <UploadProgress progress={progress} />
              </div>
              <Loader />
            </>
          )
          : (<></>)}

        <form onSubmit={handleSubmit} className="form-create-store-pictures">

          <label htmlFor="create-store-image" className="create-store-label-input-file">
            Select Images or Video
            <img src={inputFileIcon} alt="" className="input-file-icon" />
            <input
              type="file"
              id="create-store-image"
              name="gallery"
              accept="image/*, video/*"
              onChange={handlePreview}
              className="create-store-image-input"
              multiple
            />
          </label>

          <input
            type="text"
            name="pictures-description"
            placeholder="short description"
            onChange={(e) => setCurrentDescription(e.target.value)}
            value={currentDescription}
          />

          <div>
            <p>{message}</p>
            <input type="submit" value="Next" className="create-store-submit" />
          </div>
        </form>
      </div>
    );
  }
  return <></>;
};

export default CreateStorePictures;
