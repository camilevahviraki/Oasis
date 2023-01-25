import React from 'react';
import { useDispatch } from 'react-redux';
import { addStoreNames } from '../../../redux/stores/createStoreReducer';
import FormR from '../../../reusable/form/FormR';

const StoreName = (props) => {
  const dispatch = useDispatch();
  
  const submitStoreName = (e) => {
    e.preventDefault();
    const storeNameData = {
        name: e.target.name.value,
        description: e.target.description.value,
        city: e.target.city.value,
        country: e.target.country.value,
        step: 1,
    }
    dispatch(addStoreNames(storeNameData));
  }

  const formValues = [
    { type:'text', name: 'name', placeholder: 'name', classInput: 'InputCreateStore'},
    { type:'text', name: 'country', placeholder: 'country', classInput: 'InputCreateStore'},
    { type:'text', name: 'city', placeholder: 'city', classInput: 'InputCreateStore'},
    { type:'textarea', name: 'description', placeholder: 'description', classInput: 'TextAreaCreateStore'},
  ]

  const classForm = 'flex flex-col align-center w-full mt-10'

  return (
    <div
      style={props.progress === 1? {display: 'grid'}: {display: 'none'}}
      className='flex flex-col align-center w-10/12 md:w-6/12 lg:w-5/12 sm:w-5/6 h-8/12'
    >
        <FormR
          classForm={classForm}
          inputsArray={formValues}
          submitFunction={submitStoreName}
          submitButton={'Next'}
          submitClass={'create-store-submit'}
        />
    </div>
  )
}

export default StoreName
