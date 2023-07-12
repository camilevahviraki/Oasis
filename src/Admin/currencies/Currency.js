import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillPicture } from 'react-icons/ai';
import { FiLoader } from 'react-icons/fi';
import FormR from '../../reusable/form/FormR';
import Upload from '../../redux/upload';
import { getCurrencies } from '../../redux/currencies/currenciesReducer';

const Currency = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0]);
  const [showLoader, setLoader] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const inputsArray = [
    {
      type: 'text',
      name: 'name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Us Dollars',
      label: 'Currency Name:',
    },
    {
      type: 'text',
      name: 'symbole',
      classInput: 'user-authentication-form-input',
      placeholder: '$',
      label: 'Symbole',
    },
    {
      type: 'text',
      name: 'country',
      classInput: 'user-authentication-form-input',
      placeholder: '14',
      label: 'Country name',
    },
    {
      type: 'number',
      name: 'exchange',
      classInput: 'user-authentication-form-input',
      placeholder: '1000 for United states Dollars',
      label: 'Exchange',
    },
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const exchange = e.target.exchange.value;
    const symbole = e.target.symbole.value;
    const country = e.target.country.value;

    if (name === '' || exchange === '' || symbole === '' || country === '') {
      setMessage('Please! Complete all fields');
      setInputErrorArr([1, 1, 1, 1]);
    } else {
      const currencyData = {
        name,
        exchange,
        symbole,
        country,
      };
      setLoader(true);

      Upload({
        endPoint: 'currencies',
        data: { currencyData },
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
    dispatch(getCurrencies());
  }, [gotResponse]);

  const selectCountry = (country) => {};

  const currenciesList = useSelector((state) => state.currenciesReducer);
  return (
    <div className="admin-countries-page">
      <h2 className="admin-country-title">Currencies Management</h2>
      <div className="admin-country-form-container">
        <FormR
          classForm="create-item-form"
          inputsArray={inputsArray}
          submitFunction={createNewItem}
          submitButton={showLoader ? (
            <FiLoader className="button-loader white-loader" />
          ) : (
            'Add Currency'
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
          currenciesList.map((currency) => (
            <div
              key={currency.name}
              className="country-item"
              // onClick={() => selectCountry(country)}
            >
              <p>
                {`(${currency.symbole})`}
                {' '}
                {currency.name}
                {' =>'}
                {currency.country}
              </p>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Currency;
