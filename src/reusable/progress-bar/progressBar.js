import React from 'react';
import './progress-bar.css';

const ProgressBar = (props) => {
  const {
    currentStep,
    steps,
    bgColor,
    setProgress,
  } = props;

  const setpsCount = steps.length;
  return (
    <div className="progress-bar-container row">
      {
        steps.map((step, key) => (
          <>
            <h6
              className={currentStep >= key + 1 ? 'progress-bar-step' : 'progress-bar-step gray'}
              style={{
                width: `${((100 / setpsCount) * 0.3)}%`,
              }}
              onClick={() => setProgress(key + 1)}
            >
              {step}
            </h6>
            {
                    steps[key + 1] !== undefined
                      ? (
                        <div
                          className={currentStep >= key + 2 ? 'progress-bar-line' : 'progress-bar-line gray'}
                          style={{
                            width: `${(((100 / setpsCount) * 0.7) + (((100 / setpsCount) * 0.7) / (setpsCount - 1))) - 2}%`,
                            marginLeft: '1%',
                            marginRight: '1%',
                          }}
                        />
                      )
                      : (<></>)
                }

          </>
        ))
       }
    </div>
  );
};

export default ProgressBar;
