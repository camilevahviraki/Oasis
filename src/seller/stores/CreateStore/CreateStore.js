import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import StoreName from './StoreName';
import CreateStoreCategories from './CreateStoreCategories';
import CreateStorePlaces from './CreateStorePlaces';
import CreateStorePictures from './CreateStorePictures';
import CreateStorePreview from './CreateStorePreview';
import ProgressBar from '../../../reusable/progress-bar/progressBar';
import { createStoreSetProgress } from '../../../redux/stores/createStoreReducer';
// import UsePrevious from '../../../reusable/usePrevious/UsePrevious';
import './css/CreateStore.css';

function CreateStore() {
  
  const dispatch = useDispatch();
  const createStoreData = useSelector(state => state.createStoresReducer);
  const [progressN, setProgressN] = useState(1);
  const stepsProgress = [
    'Description',
    'Categories',
    'Views',
    'Places', 
    'Preview' 
  ];

  const setProgress = (progress) => {
    dispatch(createStoreSetProgress(progress));
  }

  const step = createStoreData.storeId.step;

  console.log(createStoreData);
  return (
    <div className='flex flex-col w-screen items-center'>
      <h3 className='text-4xl font-bold '>Create Store</h3>
      <ProgressBar
         steps = {stepsProgress}
         currentStep = {step}
         setProgress = {setProgress}
      />
      <StoreName progress = {step} />
      <CreateStoreCategories progress = {step}/>
      <CreateStorePlaces progress = {step}/>
      <CreateStorePictures progress = {step}/>
      <CreateStorePreview progress = {step}/>
    </div>
  )
}

export default CreateStore