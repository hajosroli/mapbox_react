import React from 'react';
import './AlertMessage.css';

function AlertMessage({ setShowAlert, errorMessage }) {

  return (
    <div className="custom-alert">
      <div className="custom-alert__content">
        <p>{errorMessage}</p>
        <button onClick={() => setShowAlert(false)}>Close</button>
      </div>
    </div>
  );
}

export default AlertMessage;