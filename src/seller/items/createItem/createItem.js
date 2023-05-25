import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCreateStoreData } from '../../../redux/item/createItem';
import CreateItemDetails from './steps/createItemDetails';
import CreatreItemAttributes from './steps/creatreItemAttributes';
import CreateItemPreview from './steps/createItemPreview';
import './createItem.css';

const CreateItem = () => {
  const dispatch = useDispatch();
  const steps = ['Descriptions', 'Attributes', 'Preview'];
  const createItemData = useSelector((state) => state.createItemReducer);
  const containerRef = useRef(null);
  const [scrollTo, setScrollTo] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const {
    step,
  } = createItemData;

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
    dispatch(resetCreateStoreData());
  }, []);

  if (scrollTo !== step) {
    if (containerRef.current) {
      containerRef.current.scrollTo(
        {
          top: 0,
          left: ((step - 1) * containerWidth),
          behavior: 'smooth',
        },
      );
      setScrollTo(step);
    }
  }

  return (
    <div className="create-item-main-page" ref={containerRef}>
      <div className="item-progress-bar-container">
        {
          steps.map((stepUp, key) => (
            <div
              className={step > key ? 'item-step active-step' : 'item-step'}
              style={key + 1 === steps.length
                ? {
                  width: `${(100 - ((steps.length - 1) / 2)) / steps.length}%`,
                }
                : {
                  width: `${97 / steps.length}%`,
                  marginRight: '0.5%',
                }}
            >
              {stepUp}
            </div>
          ))
        }
      </div>
      <CreateItemDetails />
      <CreatreItemAttributes />
      <CreateItemPreview />
    </div>
  );
};

export default CreateItem;
