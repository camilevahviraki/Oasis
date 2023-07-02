import React from 'react';
import './progress-bar.css';

const ProgressBar = (props) => {
  const {
    currentStep, steps, setProgress,
  } = props;

  return (
    <div className="item-progress-bar-container">
      {steps.map((stepUp, key) => (
        <div
          key={stepUp}
          className={currentStep > key ? 'item-step active-step' : 'item-step'}
          style={
            key + 1 === steps.length
              ? {
                width: `${(100 - (steps.length - 1) / 2) / steps.length}%`,
              }
              : {
                width: `${97 / steps.length}%`,
                marginRight: '0.5%',
              }
          }
          onClick={setProgress ? () => setProgress(key + 1) : () => {}}
        >
          {stepUp}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
