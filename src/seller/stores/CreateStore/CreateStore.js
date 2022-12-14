import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreName from './StoreName';
import CreateStoreCategories from './CreateStoreCategories';
import CreateStorePlaces from './CreateStorePlaces';
import CreateStorePictures from './CreateStorePictures';
import CreateStorePreview from './CreateStorePreview';
import './css/CreateStore.css';

function CreateStore() {
  const createStoreData = useSelector(state => state.createStoresReducer);
  console.log(createStoreData);
  return (
    <div className='form'>

      <StoreName progress = {createStoreData.progress} />
      <CreateStoreCategories progress = {createStoreData.progress}/>
      <CreateStorePlaces progress = {createStoreData.progress}/>
      <CreateStorePictures progress = {createStoreData.progress}/>
      <CreateStorePreview progress = {createStoreData.progress}/>
    </div>
  )
}

export default CreateStore