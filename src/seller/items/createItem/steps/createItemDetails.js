import React from 'react';
import { useSelector } from 'react-redux';
import Details from './create_details/details';
import '../createItem.css';

const CreateItemDetails = () => {
  const createItemData = useSelector((state) => state.createItemReducer);
  return <div className="create-item-container">{createItemData.step === 1 ? <Details /> : <></>}</div>;
};

export default CreateItemDetails;
