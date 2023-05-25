import React from 'react';
import { useSelector } from 'react-redux';
import Attributes from './create_attributes/attributes';
import './create_attributes/createItemAttributes.css';

const CreatreItemAttributes = () => {
  const createItemData = useSelector((state) => state.createItemReducer);
  return <>{createItemData.step === 2 ? <Attributes /> : <></>}</>;
};

export default CreatreItemAttributes;
