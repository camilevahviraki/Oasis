import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStore } from '../../../../redux/stores/updateStoreReducer';
import { getStoresShow } from '../../../../redux/stores/getStoreShowReducer';
import FormR from '../../../../reusable/form/FormR';
import './UpdateStore.css';

const UpdateStore = (props) => {

   const dispatch = useDispatch();
   const [message, setMessage] = useState(null);
   const [inputErrorArr, setInputErrorArr] = useState([0]);
   const updateStoreData = useSelector(state => state.updateStoreReducer);
   const storeData = useSelector((state) => state.getStoreShowReducer);
   const userData = useSelector((state) => state.authenticationReducer);

   const {
    field,
    response
   } = updateStoreData;

   const formValues = [
    {
      type: "text",
      name: "name",
      placeholder: "new-value",
      classInput: "InputCreateStore",
      label: field,
    }
   ];

   const updateStoreField = (e) => {
    e.preventDefault();

    const inputValue = e.target.name.value;

    if(inputValue === ''){
        setMessage('Please complete the marked field to update');
        setInputErrorArr([1]);
    }else {
        setMessage(null);
        setInputErrorArr([0]);

        const data = {
            store_id: storeData.id,
            field: field,
            new_value: inputValue,
        };

        const getStoreData = {
            user_id: userData.user.id,
            store_id: storeData.id,
        }
        dispatch(updateStore(data));
        dispatch(getStoresShow(getStoreData)); 
    }
   }
   console.log('qwazerty 243')

  return (
    <div className='update-store-container'>
      <h4>Update {field}</h4>
      <FormR
          classForm={'update-store-form'}
          inputsArray={formValues}
          submitFunction={updateStoreField}
          submitButton={"Update"}
          submitClass={"create-store-submit"}
          errorMessage={message}
          inputErrorArr={inputErrorArr}
        />
    </div>
  )
}

export default UpdateStore;