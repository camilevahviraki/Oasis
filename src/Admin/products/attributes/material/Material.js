import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';
import FormR from '../../../../reusable/form/FormR';
import Upload from '../../../../redux/upload';
import { getMaterials } from '../../../../redux/attributes/materialReducer';

const Material = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0]);
  const [showLoader, setLoader] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);

  useEffect(() => {
    dispatch(getMaterials());
  }, []);

  const inputsArray = [
    {
      type: 'text',
      name: 'name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Wood',
      label: 'Material Name',
    },
    {
      type: 'text',
      name: 'code',
      classInput: 'user-authentication-form-input',
      placeholder: 'wd',
      label: 'Code',
    },
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const code = e.target.code.value;

    if (name === '') {
      setMessage('Please! Complete all fields');
      setInputErrorArr([1, 0]);
    } else {
      const materialData = {
        name,
        code,
      };
      setLoader(true);

      Upload({
        endPoint: 'material',
        data: { materialData },
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
    dispatch(getMaterials());
  }, [gotResponse]);

  const materials = useSelector((state) => state.materialReducer);

  return (
    <div className="admin-countries-page">
      <h2 className="admin-country-title">Products materials Management</h2>
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
            materials.map((capacity) => (
              <div
                key={capacity.name}
                className="country-item flex"
              >
                <p>{capacity.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Material;
