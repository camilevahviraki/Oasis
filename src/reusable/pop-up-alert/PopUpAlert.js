import React from 'react';
import './PopUpAlert.css';

const PopUpAlert = (props) => {
  const {
    message, cancelFunc, approveFunc, approveButton, data,
  } = props;

  return (
    <div className="pop-up-alert-container">
      <div className="pop-up-alert-wrapp">
        <div className="pop-up-alert-wrapper">
          <p>{message}</p>
          <div className="pop-up-alert-buttons">
            <button className="pop-up-alert-cancel" onClick={() => cancelFunc(false, null)}>
              Cancel
            </button>
            <button className="pop-up-alert-approve" onClick={() => approveFunc(data.id)}>
              {approveButton || 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpAlert;
