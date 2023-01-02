import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreName from './StoreName';
import CreateStoreCategories from './CreateStoreCategories';
import CreateStorePlaces from './CreateStorePlaces';
import CreateStorePictures from './CreateStorePictures';
import CreateStorePreview from './CreateStorePreview';
import ProgressBar from '../../../reusable/progress-bar/progressBar';
import { createStoreSetProgress } from '../../../redux/stores/createStoreReducer';
import './css/CreateStore.css';

function CreateStore() {
  const dispatch = useDispatch();
  const createStoreData = useSelector(state => state.createStoresReducer);
  const stepsProgress = [
    'Description',
    'Categories',
    'Views',
    'Places', 
    'Preview' 
  ];

  const setProgress = (progress) => {
    dispatch(createStoreSetProgress(progress))
  }
  console.log(createStoreData);
  return (
    <div className='flex flex-col w-screen items-center'>
      <h3 className='text-4xl font-bold '>Create Store</h3>
      <ProgressBar
         steps = {stepsProgress}
         currentStep = {createStoreData.progress}
         setProgress = {setProgress}
      />
      <StoreName progress = {createStoreData.progress} />
      <CreateStoreCategories progress = {createStoreData.progress}/>
      <CreateStorePlaces progress = {createStoreData.progress}/>
      <CreateStorePictures progress = {createStoreData.progress}/>
      <CreateStorePreview progress = {createStoreData.progress}/>
    </div>
  )
}

export default CreateStore