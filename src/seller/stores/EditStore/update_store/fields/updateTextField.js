import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetStoreFieldToUpdate } from '../../../../../redux/stores/updateStoreReducer';
import FormR from '../../../../../reusable/form/FormR';

const UpdateTextField = (props) => {
  const dispatch = useDispatch();
  const {
    field,
    response,
    updateStoreField,
    message,
    inputErrorArr,
    fieldValue,
    updateMessage,
  } = props;

  const [value, setValue] = useState(fieldValue);
  const updateData = useSelector((state) => state.updateStoreReducer);
  const formValues = [
    {
      type: `${field == 'description' ? 'textarea' : 'text'}`,
      name: 'name',
      placeholder: 'new-value',
      classInput: 'InputCreateStore',
      label: `Input ${field}`,
      value,
      onChangeFunc: (e) => setValue(e.target.value),
    },
  ];

  if (updateData.response && updateMessage) {
    updateMessage(updateData.response.message);
    dispatch(resetStoreFieldToUpdate());
  }

  console.log('update data ==>', updateData);

  return (
    <FormR
      classForm="update-store-form"
      inputsArray={formValues}
      submitFunction={updateStoreField}
      submitButton="Update"
      submitClass="create-store-submit"
      errorMessage={message || null}
      inputErrorArr={inputErrorArr || [0]}
    />
  );
};

export default UpdateTextField;
