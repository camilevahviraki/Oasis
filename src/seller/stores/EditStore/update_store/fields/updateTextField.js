import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';
import { resetStoreFieldToUpdate } from '../../../../../redux/stores/updateStoreReducer';
import FormR from '../../../../../reusable/form/FormR';
import UpdateMainImage from './updateMainImage';
import CreateStorePlaces from '../../../CreateStore/CreateStorePlaces';

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

  const storeData = useSelector((state) => state.getStoreShowReducer);
  const [value, setValue] = useState(fieldValue);
  const updateData = useSelector((state) => state.updateStoreReducer);
  const [showLoader, setLoader] = useState(false);

  const formValues = [
    {
      type: `${field === 'description' ? 'textarea' : 'text'}`,
      name: 'name',
      placeholder: 'new-value',
      classInput: 'InputCreateStore',
      label: `Input ${field}`,
      value,
      onChangeFunc: (e) => setValue(e.target.value),
    },
  ];

  useEffect(() => {
    if (
      updateData.response
      && updateData.response !== 'Updated coordinates'
      && updateMessage
    ) {
      updateMessage(updateData.response.message);
      setLoader(false);
      dispatch(resetStoreFieldToUpdate());
    }
  }, [updateData.response]);

  return (
    <>
      {field === 'main_image' ? (
        <UpdateMainImage />
      ) : (
        <>
          <FormR
            classForm="update-store-form"
            inputsArray={formValues}
            submitFunction={(e) => { updateStoreField(e); setLoader(true); }}
            submitButton={
              showLoader ? (
                <FiLoader className="button-loader" color="#fff" />
              ) : (
                'Update'
              )
            }
            submitClass="create-store-submit"
            errorMessage={message || null}
            inputErrorArr={inputErrorArr || [0]}
          />

          {field === 'location' ? (
            <CreateStorePlaces
              progress={4}
              updateStore
              storeIdOnUpdate={storeData.id}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default UpdateTextField;
