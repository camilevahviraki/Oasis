import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StoreName = (props) => {
  const dispatch = useDispatch();
  
  const submitStoreName = (e) => {
    const storeNameData = {
        name: e.target.name,
        description: e.target.description,
        city: e.target.city,
        country: e.target.country,
    }
    dispatch(storeNameData);
  }

  return (
    <div>
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