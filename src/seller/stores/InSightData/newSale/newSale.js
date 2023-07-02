import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../../../../reusable/serach-bar/SearchBar';
import NewSaleForm from './newSaleForm';
import InsightDataItemsList from '../items_list/ItemsList';
import ProgressBar from '../../../../reusable/progress-bar/progressBar';
import './newSale.css';

const NewSale = (props) => {
  const { redirectPage } = props;
  const containerRef = useRef(null);
  const [selectedItem, setSelctedItem] = useState({});
  const [step, setStep] = useState(1);
  const [scrollTo, setScrollTo] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
  }, []);
  const formData = [

  ];

  const steps = ['Pick a product', 'Quantity paid'];

  const handleSelectedItem = (item) => {
    setSelctedItem(item);
    setStep(2);
  };

  const handleSetProgess = (progess) => {
    if (selectedItem.main_name) {
      setStep(progess);
    }
  };

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
    <div className="new-sales-container">
      <div className="new-sales-progessbar">
        <ProgressBar currentStep={step} steps={steps} setProgress={handleSetProgess} />
      </div>
      <h2 className="new-sales-title">New Sale</h2>
      <div ref={containerRef} className="new-sales-items-list-and-form">
        <div className="new-sales-page">
          {step === 1 ? (<InsightDataItemsList newSale setSelctedItem={handleSelectedItem} />) : (<></>)}
        </div>
        <div className="new-sales-page">
          {step === 2 ? (<NewSaleForm item={selectedItem} redirectPage={redirectPage} />) : (<></>)}
        </div>

      </div>

    </div>
  );
};

export default NewSale;
