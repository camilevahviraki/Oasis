import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { FiLoader } from 'react-icons/fi';
import OrderMapContainer from './MapContainer';
import { addOrderDestination } from '../../../redux/orders/createOrderReducer';
import FormR from '../../../reusable/form/FormR';
import { getCountries } from '../../../redux/countries/countriesReducer';
import './OrderDestination.css';

const OrderDestination = () => {
  const dispatch = useDispatch();
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0, 0]);
  const userData = useSelector((state) => state.authenticationReducer);
  const [message, setMessage] = useState(null);
  const [country, setCountry] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { token_id } = useParams();
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const countries = useSelector((state) => state.countriesReducer);
  const inputsArray = [
    {
      type: 'email',
      placeholder: `${userData.user.email}`,
      classInput: 'user-authentication-form-input',
      label: 'Contact mail',
      name: 'email',
    },
    {
      type: 'select-country',
      placeholder: 'Country',
      classInput: 'user-authentication-form-input',
      data: countries,
      label: 'Country',
    },
    {
      type: 'text',
      placeholder: 'City',
      classInput: 'user-authentication-form-input',
      label: 'City',
      name: 'city',
    },
    {
      type: 'textarea',
      name: 'district',
      classInput: 'user-authentication-form-input',
      placeholder: 'District',
      label: 'District',
    },
    {
      type: 'phone',
      placeholder: '+2 475246382',
      classInput: 'user-authentication-form-input',
      label: 'Phone Number',
      name: 'phoneNumber',
    },
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const district = e.target.district.value;
    const email = e.target.email.value;
    const phone = e.target.phoneNumber.value;

    if (country === null) {
      setMessage('Select your current Country!');
      setInputErrorArr([0, 1, 0, 0, 0]);
    } else if (email.length === 0) {
      setMessage('Please, Enter your delivery email!');
      setInputErrorArr([1, 0, 0, 0, 0]);
    } else if (city === 0) {
      setMessage('Enter a description longer than 20 characters.');
      setInputErrorArr([0, 0, 1, 0, 0, 0]);
    } else if (phone.length === 0) {
      setInputErrorArr([0, 0, 0, 0, 1]);
    } else {
      setLoader(true);
      setInputErrorArr([0, 0, 0, 0, 0]);
      setMessage(null);
      const data = {
        destination: {
          country, city, email, phone,
        },
        token_id,
      };

      dispatch(addOrderDestination(data));
    }
  };

  return (
    <>
      <div className="order-destination-form-wrapp">
        <FormR
          classForm="create-item-form"
          inputsArray={inputsArray}
          submitFunction={createNewItem}
          submitButton={
            loader ? (
              <FiLoader className="button-loader" color="white" />
            ) : (
              'Add destination'
            )
          }
          submitClass="user-authentication-form-button"
          errorMessage={message}
          inputErrorArr={inputErrorArr}
          inputWrapperClassName="create-item-input-wrapper"
          getSelectedCountry={(data) => setCountry(data)}
        />
      </div>
      <button
        className="button-auto-fill-destination"
        type="button"
        onClick={() => setShowMap(!showMap)}
      >
        Get your exact coordinates
      </button>
      <div className="create-order-map-container">
        {showMap ? (
          <OrderMapContainer />
        ) : null}
      </div>
    </>
  );
};

export default OrderDestination;
