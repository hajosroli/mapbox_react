import React from 'react';
import './AlertMessage.css';

function AlertMessage({ setShowAlert }) {

  return (
    <div className="custom-alert">
      <div className="custom-alert__content">
        <p>Maximum Limit of placed Markers is reached!</p>
        <button onClick={() => setShowAlert(false)}>Close</button>
      </div>
    </div>
  );
}

export default AlertMessage;