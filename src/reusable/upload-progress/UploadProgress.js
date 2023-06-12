import React from 'react';
import './UploadProgress.css';

const UploadProgress = (props) => {
  const {
    progress,
    uploaded,
  } = props;

  console.log('prog =>', progress);
  return (
    <div className="upload-progress-container">
      <div className={uploaded ? 'upload-progress-wrap green' : 'upload-progress-wrap'}>
        <div
          className="uploaded-progress"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;
