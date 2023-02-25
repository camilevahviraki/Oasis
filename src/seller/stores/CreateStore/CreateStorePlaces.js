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
  
  if(props.progress === 4){
    return (
      <div className='create-store-places'>
          <h2>Others Locations</h2>
      <div className='row'>    
        <button type='button' onClick={savePlaces} className="create-store-submit">Next</button>
      </div>    
      
      </div>
      
    )
  }else {
     return <></>
  } 

}

export default CreateStorePlaces