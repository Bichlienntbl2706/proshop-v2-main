import React from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/verified_style.css';

const VerifiedScreen = () => {
  const location = useLocation();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const error = urlParams.get("error");
  const message = urlParams.get("message");

  const bodyContent = !error ? (
    <div className="verified-container" style={{ backgroundColor: '#065f46' }}>
      <h2 className="verified-h2">Email has been verified</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="85"
        height="85"
        fill="currentColor"
        className="bi bi-check-circle-fill verified-animated verified-swing"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>
      <h3 className="verified-h3">You can now log in</h3>
      <button className="verified-btn_login"><a href="http://localhost:3000/login">LOGIN HERE</a></button>
    </div>
  ) : (
    <div className="verified-container" style={{ backgroundColor: '#991B1B' }}>
      <h2 className="verified-h2">{message}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="85"
        height="85"
        fill="currentColor"
        className="bi bi-x-circle-fill verified-animated verified-swing"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
      <h3 className="verified-h3">Please try again!</h3>
      <p>@ToThePointCode</p>
    </div>
  );

  return (
    <div className="verified-body">
      {bodyContent}
    </div>
  );
};

export default VerifiedScreen;
