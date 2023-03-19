import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckValidImage from '../../../../../../reusable/check-image/checkValidImage';
import image_store from '../../../../../../images/store-image-holder.png';
import { deleteStoreImage } from '../../../../../../redux/stores/updateStoreReducer';
import Loader from '../../../../../../reusable/loader/Loader';
import './ImageToUpdateOptions.css';

const ImageToUpdateOptions = (props) => {
  const disptach = useDispatch();

  const {
    showImageOptions,
    imageData,
    imageUrl,
    showLoader,
  } = props;

  const deleteImage = (id) => {
    disptach(deleteStoreImage(imageData.id));
    showImageOptions(false);
  };

  return (
    <div className="Image-To-Update-Options-wrapper">
      <a className="Image-To-Update-Options-Button" href={imageUrl} target="_blank" rel="noreferrer">
        See Image
      </a>
      <button
        className="Image-To-Update-Options-Button"
        onClick={() => deleteImage(imageData.id)}
      >
        Delete
      </button>
      <button className="Image-To-Update-Options-Button">
        Update
      </button>

      <div className="Image-To-Update-Options-Image-PopUp-container">
        <div className="Image-To-Update-Options-Image-PopUp-wrap">
          <img
            src={CheckValidImage({
              avartarUrl: imageUrl,
              defaultImg: image_store,
            })}
            alt=""
          />
        </div>

      </div>
    </div>
  );
};

export default ImageToUpdateOptions;
