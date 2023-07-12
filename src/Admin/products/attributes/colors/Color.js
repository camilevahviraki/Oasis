import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';
import FormR from '../../../../reusable/form/FormR';
import Upload from '../../../../redux/upload';
import { getColors } from '../../../../redux/attributes/colorReducer';

const Color = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0]);
  const [showLoader, setLoader] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const inputsArray = [
    {
      type: 'text',
      name: 'name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Green',
      label: 'Color',
    },
    {
      type: 'text',
      name: 'hex_code',
      classInput: 'user-authentication-form-input',
      placeholder: '#f3dc45',
      label: 'Hex Code',
    },
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const hexCode = e.target.hex_code.value;

    if (name === '' || hexCode === '') {
      setMessage('Please! Complete all fields');
      setInputErrorArr([1, 1]);
    } else {
      const colorData = {
        name,
        hex_code: hexCode,
      };
      setLoader(true);

      Upload({
        endPoint: 'color',
        data: { colorData },
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
    dispatch(getColors());
  }, [gotResponse]);

  const colors = useSelector((state) => state.colorReducer);

  return (
    <div className="admin-countries-page">
      <h2 className="admin-country-title">Products Colors Management</h2>
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
          colors.map((color) => (
            <div
              key={color.name}
              className="country-item flex"
            >
              <div
                className="create-item-color bordered-color"
                style={{ backgroundColor: color.hex_code }}
              />

              <p>{color.name}</p>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Color;
