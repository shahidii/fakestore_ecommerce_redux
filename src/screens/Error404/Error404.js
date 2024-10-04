import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Error404 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="error-page">
      <div className="content-wrapper">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Sorry, the page you are looking for isn't available!</h2>
        <p className="error-description">It seems like the page has been moved or doesn't exist.</p>
        <button className="btn btn-outline-primary" onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error404;
