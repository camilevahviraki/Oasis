import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';
import FormR from '../../../../reusable/form/FormR';
import Upload from '../../../../redux/upload';
import { getSizes } from '../../../../redux/attributes/sizeReducer';

const Size = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0]);
  const [showLoader, setLoader] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);

  useEffect(() => {
    dispatch(getSizes());
  }, []);

  const inputsArray = [
    {
      type: 'text',
      name: 'name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Meter',
      label: 'Size Unit',
    },
    {
      type: 'text',
      name: 'code',
      classInput: 'user-authentication-form-input',
      placeholder: 'm',
      label: 'Code',
    },
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const code = e.target.code.value;

    if (name === '' || code === '') {
      setMessage('Please! Complete all fields');
      setInputErrorArr([1, 1]);
    } else {
      const sizeData = {
        name,
        code,
      };
      setLoader(true);

      Upload({
        endPoint: 'size',
        data: { sizeData },
        sendData: (sent) => afterSubmit(sent),
      });
    }
  };

  const afterSubmit = (data) => {
    if (data.message === 'Created Successfully') {
      setMessage(data.message);
      document.getElementById('create-item-form').reset();
    } else {
      setMessage('');
    }
    setLoader(false);
    setGotResponse(!gotResponse);
  };

  useEffect(() => {
    dispatch(getSizes());
  }, [gotResponse]);

  const sizesUnit = useSelector((state) => state.sizeReducer);

  return (
    <div className="admin-countries-page">
      <h2 className="admin-country-title">Products sizes units Management</h2>
      <div className="admin-country-form-container">
        <FormR
          classForm="create-item-form"
          inputsArray={inputsArray}
          submitFunction={createNewItem}
          submitButton={showLoader ? (
            <FiLoader className="button-loader white-loader" />
          ) : (
            'Add'
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
          sizesUnit.map((capacity) => (
            <div
              key={capacity.name}
              className="country-item flex"
            >
              <p>
                {`(${capacity.code})`}
                {' '}
                {capacity.name}
              </p>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Size;
