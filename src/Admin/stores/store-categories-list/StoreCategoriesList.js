import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillPicture } from 'react-icons/ai';
import { FiLoader } from 'react-icons/fi';
import FormR from '../../../reusable/form/FormR';
import Upload from '../../../redux/upload';
import storeSplahImage from '../../../images/store-image-holder.png';
import { getCategories } from '../../../redux/stores_categories/stores_categories_reducer';

const StoreCategoriesList = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0]);
  const [showLoader, setLoader] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);
  const [gallery, setItemsGallery] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const inputsArray = [
    {
      type: 'text',
      name: 'name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Food and Beverages',
      label: 'Store Type:',
    },
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    if (name === '') {
      setMessage('Please! Input the name');
      setInputErrorArr([1]);
    } else {
      const storeTypeData = {
        name,
        image: gallery,
      };
      setLoader(true);

      Upload({
        endPoint: 'stores_categories_list',
        data: storeTypeData,
        sendData: (sent) => afterSubmit(sent),
      });
    }
  };

  const afterSubmit = (data) => {
    if (data.message === 'Error creating store category list.') {
      setMessage('Oops! Couldnt add country!');
    } else if (message === 'Error') {
      setMessage('Oops! Couldnt add country!');
    } else {
      setMessage(data.message);
      document.getElementById('create-item-form').reset();
    }
    setLoader(false);
    setGotResponse(!gotResponse);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [gotResponse]);

  const selectCountry = (country) => {};

  const categoriesList = useSelector((state) => state.storeCategoriesReducer);
  return (
    <div className="admin-countries-page">
      <h2 className="admin-country-title">Stores Categories Management</h2>
      <div className="admin-country-form-container">
        <div className="create-store-main-image-preview-container admin-country-image-preview">
          <div className="create-store-image-preview-wrapp">
            <img
              src={gallery ? URL.createObjectURL(gallery) : storeSplahImage}
              alt=""
              className="create-store-image-preview"
            />
          </div>
          <label
            htmlFor="store-image"
            className="create-store-label-input-file"
          >
            <AiFillPicture />
            <input
              id="store-image"
              type="file"
              accept="image/*"
              className="create-item-input-file"
              onChange={(e) => {
                setItemsGallery(e.target.files[0]);
              }}
            />
          </label>
        </div>
        <FormR
          classForm="create-item-form"
          inputsArray={inputsArray}
          submitFunction={createNewItem}
          submitButton={showLoader ? (
            <FiLoader className="button-loader white-loader" />
          ) : (
            'Add Country'
          )}
          submitClass="user-authentication-form-button"
          errorMessage={message}
          inputErrorArr={inputErrorArr}
          inputWrapperClassName="create-item-input-wrapper"
        />
      </div>
      <div className="admin-countries-list-container">
        <div className="admin-countries-list">
          {
          categoriesList.map((category) => (
            <div
              key={category.name}
              className="country-item"
              // onClick={() => selectCountry(category)}
            >
              <p>
                {category.name}
              </p>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default StoreCategoriesList;
