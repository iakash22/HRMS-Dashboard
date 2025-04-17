import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Optional CSS file

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
            <button className="not-found-button" onClick={() => navigate('/')}>
                Go to Home
            </button>
        </div>
    );
};

export default NotFound;
