import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStore } from '../../../../redux/stores/updateStoreReducer';
import { getStoresShow } from '../../../../redux/stores/getStoreShowReducer';
import UpdateTextField from './fields/updateTextField';
import UpdateCategories from './fields/updateCategories';
import UpdatePictures from './fields/updatePictures';
import './UpdateStore.css';

const UpdateStore = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0]);
  const updateStoreData = useSelector((state) => state.updateStoreReducer);
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const userData = useSelector((state) => state.authenticationReducer);

  const { field, fieldValue } = updateStoreData;

  const updateStoreField = (e) => {
    e.preventDefault();

    const inputValue = e.target.name.value;

    if (inputValue === '') {
      setMessage('Please complete the marked field to update');
      setInputErrorArr([1]);
    } else {
      setMessage(null);
      setInputErrorArr([0]);

      const data = {
        store_id: storeData.id,
        field,
        new_value: inputValue,
      };

      const getStoreData = {
        user_id: userData.user.id,
        store_id: storeData.id,
      };
      dispatch(updateStore(data));
      dispatch(getStoresShow(getStoreData));
    }
  };

  const updateMessage = (message) => {
    setMessage(message);
  };

  return (
    <div className="update-store-container">
      <h4>
        Update
        {' '}
        {field}
      </h4>
      {field === 'categories' ? (
        <UpdateCategories selctedCategories={fieldValue} />
      )
        : (
          <>
            {
          field === 'Pictures'
            ? (
              <UpdatePictures />
            )
            : (
              <UpdateTextField
                field={field}
                updateStoreField={updateStoreField}
                message={message}
                inputErrorArr={inputErrorArr}
                fieldValue={fieldValue}
                updateMessage={updateMessage}
              />
            )
        }
          </>
        )}
    </div>
  );
};

export default UpdateStore;
