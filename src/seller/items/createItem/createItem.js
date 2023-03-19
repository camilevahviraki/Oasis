import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormR from '../../../reusable/form/FormR';
import Upload from '../../../redux/upload';
import Loader from '../../../reusable/loader/Loader';
import UploadProgress from '../../../reusable/upload-progress/UploadProgress';
import inputFileIcon from '../../../images/input-file.png';
import './createItem.css';

const CreateItem = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.storeLinkReducer);

  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0, 0]);
  const [message, setMessage] = useState(null);
  const [fyleType, setFileType] = useState('image');
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [gallery, setItemsGallery] = useState([]);
  const [showProgess, setShowProgress] = useState(false);
  const [inputKey, setInputKey] = useState('keyBefore');
  const [showLoader, setLoader] = useState(false);

  const queryParameters = new URLSearchParams(window.location.search);
  const category = queryParameters.get('type');

  const inputsArray = [
    {
      type: 'text',
      name: 'mainName',
      classInput: 'user-authentication-form-input',
      placeholder: 'Main Name',
      label: 'Name',
    },
    {
      type: 'text',
      name: 'names',
      classInput: 'user-authentication-form-input',
      placeholder: '#name1, #name2, #name3',
      label: 'Others Name',
    },
    {
      type: 'number',
      name: 'price',
      classInput: 'user-authentication-form-input',
      placeholder: '24',
      label: 'Price($)',
    },
    {
      type: 'number',
      name: 'quantity',
      classInput: 'user-authentication-form-input',
      placeholder: '14',
      label: 'Quantity',
    },
    {
      type: 'textarea',
      name: 'description',
      classInput: 'user-authentication-form-input',
      placeholder: '...description',
      label: 'Description',
    },
  ];

  const getProgress = (prog) => {
    setProgress(prog);
  };

  const onSignup = (e) => {
    e.preventDefault();
    const mainName = e.target.mainName.value;
    const names = e.target.names.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const quantity = e.target.quantity.value;

    if (mainName.length === 0) {
      setMessage('Please! The Item name required');
      setInputErrorArr([1, 0, 0, 0, 0]);
    } else if (mainName.length <= 2) {
      setMessage('The minimum length of the name is 3');
      setInputErrorArr([1, 0, 0, 0, 0]);
    } else if (price.length === 0) {
      setMessage('Please enter the price!');
      setInputErrorArr([0, 0, 1, 0, 0]);
    } else if (description.length <= 20) {
      setMessage('Enter a description longer than 20 characters.');
      setInputErrorArr([0, 0, 0, 0, 1]);
    } else {
      setShowProgress(true);
      setInputErrorArr([0, 0, 0, 0, 0]);
      setMessage(null);
      const formData = new FormData();
      setLoader(true);
      Object.keys(gallery).forEach((key) => {
        formData.append('pictures[]', gallery[key]);
        console.log('qwerty file =>', gallery[key].type);
      });
      formData.append('store_id', storeData.link.store_id);
      formData.append('mainName', mainName);
      formData.append('names', names);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('quantity', quantity);
      formData.append('category', category);
      Upload({
        endPoint: 'api_stores/show/items',
        data: formData,
        sendData: (sent) => afterSubmit(sent),
        getProgress: (prog) => getProgress(prog),
      });
    }
  };

  const afterSubmit = (data) => {
    if (data.item_id) {
      document.getElementById('create-item-form').reset();
      setInputKey('keyAfter');
      setMessage(data.message);
    } else if (data === 'error') {
      setMessage('Error while creating Item!');
    }
    setLoader(false);
  };

  return (
    <div className="create-item-container">
      {
        showLoader ? (<Loader />) : (<></>)
      }
      <h2>
        Create New Item in category:
        {category}
      </h2>
      <div className="create-item-images-list">
        <div className="create-item-image-previews-container">
          { Object.keys(gallery).map((keyName, i) => (
            <div className="create-item-image-preview">
              {
                    gallery[keyName].type.includes('image') ? (
                      <img
                        src={URL.createObjectURL(gallery[keyName])}
                        alt=""
                        className="create-item-image"
                      />
                    )
                      : (
                        <video width="400px" controls>
                          <source src={URL.createObjectURL(gallery[keyName])} />
                        </video>
                      )
                  }
            </div>
          ))}
        </div>
        {
          showProgess && gallery.length > 0
            ? (
              <div style={{ width: '300px', marginTop: '20px' }} className="upload-progress">
                <p>
                  {progress}
                  %
                </p>
                <UploadProgress progress={progress} />
              </div>
            ) : <></>
        }
      </div>

      <label htmlFor="item-image" className="create-item-label-input-file">
        Select Images or Video
        <img src={inputFileIcon} alt="" className="input-file-icon" />
        <input
          id="item-image"
          type="file"
          accept="image/*,video/*"
          className="create-item-input-file"
          onChange={(e) => {
            setItemsGallery(Array.prototype.slice.call(e.target.files));
          }}
          key={inputKey}
          multiple
        />
      </label>

      <FormR
        classForm="create-item-form"
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton="Create Item"
        submitClass="user-authentication-form-button"
        errorMessage={message}
        inputErrorArr={inputErrorArr}
        inputWrapperClassName="create-item-input-wrapper"
      />
    </div>
  );
};

export default CreateItem;
