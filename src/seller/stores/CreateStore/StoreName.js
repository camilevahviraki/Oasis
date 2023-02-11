import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStoreNames } from '../../../redux/stores/createStoreReducer';
import FormR from '../../../reusable/form/FormR';
import './css/CreateStoreNames.css';

const StoreName = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authenticationReducer); 
  const token = userData.token;


  const submitStoreName = (e) => {
    e.preventDefault();
    const storeNameData = {
        name: e.target.name.value,
        description: e.target.description.value,
        city: e.target.city.value,
        country: e.target.country.value,
        step: 1,
        user_id: userData.user.id,
    }
    dispatch(addStoreNames(storeNameData, token));
  }

  const formValues = [
    { type:'text', name: 'name', placeholder: 'name', classInput: 'InputCreateStore'},
    { type:'text', name: 'country', placeholder: 'country', classInput: 'InputCreateStore'},
    { type:'text', name: 'city', placeholder: 'city', classInput: 'InputCreateStore'},
    { type:'textarea', name: 'description', placeholder: 'description', classInput: 'TextAreaCreateStore'},
  ]

  const classForm = 'form-create-store-names'

  if(props.progress === 1){
    return (
      <div className='create-store-names'>
          <FormR
            classForm={classForm}
            inputsArray={formValues}
            submitFunction={submitStoreName}
            submitButton={'Next'}
            submitClass={'create-store-submit'}
          />
      </div>
    )
  }else {
    return <></>
  }
}

export default StoreName
