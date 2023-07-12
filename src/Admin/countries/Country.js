import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillPicture } from 'react-icons/ai';
import { FiLoader } from 'react-icons/fi';
import FormR from '../../reusable/form/FormR';
import Upload from '../../redux/upload';
import { getCountries } from '../../redux/countries/countriesReducer';
import storeSplahImage from '../../images/store-image-holder.png';
import './adminCountries.css';

const Country = () => {
  const dispatch = useDispatch();
  const [gallery, setItemsGallery] = useState(null);
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0]);
  const [showLoader, setLoader] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const inputsArray = [
    {
      type: 'text',
      name: 'name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Morocco',
      label: 'Country Name:',
    },
    {
      type: 'number',
      name: 'country_code',
      classInput: 'user-authentication-form-input',
      placeholder: '+255',
      label: 'Country Code',
    },
    {
      type: 'text',
      name: 'currency_name',
      classInput: 'user-authentication-form-input',
      placeholder: '14',
      label: 'Currency name',
    },
    {
      type: 'text',
      name: 'currency_symbol',
      classInput: 'user-authentication-form-input',
      placeholder: '$',
      label: 'Currency Symbol',
    },
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const currencyName = e.target.currency_name.value;
    const currencySymbol = e.target.currency_symbol.value;
    const countryCode = e.target.country_code.value;

    if (name === '' || currencyName === '' || currencySymbol === '' || countryCode === '') {
      setMessage('Please! Complete all fields');
      setInputErrorArr([1, 1, 1, 1]);
    } else {
      const countryData = {
        name,
        currency_name: currencyName,
        currency_symbol: currencySymbol,
        country_code: countryCode,
        icon: gallery,
      };
      setLoader(true);

      Upload({
        endPoint: 'countries',
        data: { countryData },
        sendData: (sent) => afterSubmit(sent),
      });
    }
  };

  const afterSubmit = (data) => {
    if (data.message === 'Created Successfully') {
      setMessage(data.message);
      document.getElementById('create-item-form').reset();
    } else {
      setMessage('Oops! Couldnt add country!');
    }
    setLoader(false);
    setGotResponse(!gotResponse);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [gotResponse]);

  const selectCountry = (country) => {};

  const countriesList = useSelector((state) => state.countriesReducer);

  return (
    <div className="admin-countries-page">
      <h2 className="admin-country-title">Countries Management</h2>
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
            countriesList.map((country) => (
              <div
                key={country.name}
                className="country-item"
                onClick={() => selectCountry(country)}
              >
                <p>
                  {`(+${country.country_code})`}
                  {' '}
                  {country.name}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Country;
