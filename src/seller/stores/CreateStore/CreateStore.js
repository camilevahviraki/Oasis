import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import StoreName from './StoreName';
import CreateStoreCategories from './CreateStoreCategories';
import CreateStorePlaces from './CreateStorePlaces';
import CreateStorePictures from './CreateStorePictures';
import CreateStorePreview from './CreateStorePreview';
import ProgressBar from '../../../reusable/progress-bar/progressBar';
import { createStoreSetProgress } from '../../../redux/stores/createStoreReducer';
import './css/CreateStore.css';

function CreateStore() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createStoreData = useSelector((state) => state.createStoresReducer);
  const stepsProgress = [
    t('pages.seller.step_description'),
    t('pages.seller.step_categories'),
    t('pages.seller.step_views'),
    t('pages.seller.step_places'),
    t('pages.seller.step_preview'),
  ];

  const setProgress = (progress) => {
    dispatch(createStoreSetProgress(progress));
  };

  const { step } = createStoreData.storeId;

  return (
    <div className="flex flex-col w-screen create_store_main_container">
      <h3 className="create-store-title-main">{step === 5 ? t('pages.seller.store_preview') : t('pages.seller.new_store')}</h3>
      <ProgressBar
        steps={stepsProgress}
        currentStep={step}
        setProgress={setProgress}
      />
      <StoreName progress={step} />
      <CreateStoreCategories progress={step} />
      <CreateStorePlaces progress={step} />
      <CreateStorePictures progress={step} />
      {
        step === 5 ? <CreateStorePreview progress={step} /> : <></>
      }
    </div>
  );
}

export default CreateStore;
