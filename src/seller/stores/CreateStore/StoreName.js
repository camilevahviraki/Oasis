import React from 'react';
import { useDispatch } from 'react-redux';
import { addStoreNames } from '../../../redux/stores/createStoreReducer';

const StoreName = (props) => {
  const dispatch = useDispatch();
  
  const submitStoreName = (e) => {
    e.preventDefault();
    const storeNameData = {
        name: e.target.name.value,
        description: e.target.description.value,
        city: e.target.city.value,
        country: e.target.country.value,
    }
    dispatch(addStoreNames(storeNameData));
  }

  return (
    <div
      style={props.progress === 1? {display: 'grid'}: {display: 'none'}}
    >
        <form className='form-create-store-name' onSubmit={submitStoreName}>
            <input type='text' name='name' placeholder='name'/>
            <input type='text' name='country' placeholder='country'/>
            <input type='text' name='city' placeholder='city'/>
            <textarea name='description' placeholder='description'>
            </textarea>
            <button type='submit'>Next</button>
        </form>
    </div>
  )
}

export default StoreName
