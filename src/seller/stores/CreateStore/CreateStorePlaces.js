import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStorePlaces, createStoreProgress } from '../../../redux/stores/createStoreReducer';

const CreateStorePlaces = (props) => {
    const dispatch = useDispatch();
    const storeData = useSelector(state => state.createStoresReducer);
    const userData = useSelector(state => state.authenticationReducer); 
    const token = userData.token;

    const [selectedPlaces, setPlaces] = useState([]);
  
    const savePlaces = () => {
        dispatch(addStorePlaces({
          places: selectedPlaces,
          step: 4,
          store_id: storeData.storeId.store_id,
          user_id: userData.user.id,
        }, token));
    }

  return (
    <div
      style={props.progress === 4?
      {display: 'grid'}: {display: 'none'}}
    >
        <h2>CreateStorePlaces</h2>
    <div className='row'>
      <button type="button" onClick={() => dispatch(createStoreProgress())}>{'<'}Back</button>    
      <button type='button' onClick={savePlaces}>Next</button>
    </div>    
    
    </div>
    
  )
}

export default CreateStorePlaces