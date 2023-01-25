import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStorePlaces, createStoreProgress } from '../../../redux/stores/createStoreReducer';

const CreateStorePlaces = (props) => {
    const dispatch = useDispatch();
    const storeData = useSelector(state => state.createStoresReducer);
    const [selectedPlaces, setPlaces] = useState([]);
  
    const savePlaces = () => {

        dispatch(addStorePlaces({places: selectedPlaces, step: 4, store_id: storeData.storeId.store_id}));
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