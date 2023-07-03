import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Upload from '../../../../../redux/upload';
import NewPicture from '../../../../../reusable/newPicture/NewPicture';
import storeImage from '../../../../../images/store-image-holder.png';
import Loader from '../../../../../reusable/loader/Loader';

const NewStorePicture = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [message, setMessage] = useState();

  const getGallery = (pictures) => {
    setGallery(pictures);
  };

  const uploadNewPicture = (e) => {
    e.preventDefault();

    const formData = new FormData();
    gallery.forEach((img) => {
      formData.append('images[]', img);
    });

    Upload({
      endPoint: `store/${storeData.id}/image`,
      data: formData,
      sendData: (res) => {
        if (res.status === 404) {
          setLoader(false);
          setMessage('Couldn\'t connect to server, Please try again later!');
        } else if (res.message === 'error') {
          setMessage('Error while creating image!');
          setLoader(false);
        } else {
          setMessage(res.message);
          setLoader(false);
        }
      },
      getProgress: (prog) => setProgress(prog),
    });

    setLoader(true);
  };

  if (message === 'Images uploaded successfully') {
    setLoader(false);
    setMessage(null);
  }

  return (
    <div>
      {
        loader ? <Loader /> : <></>
      }
      <NewPicture
        uploadNewPicture={uploadNewPicture}
        splashImage={storeImage}
        getGallery={getGallery}
      />
      <p>{message}</p>
    </div>
  );
};

export default NewStorePicture;
