import React from 'react';
import './style.css'; // Import the CSS file
import Loader from '../Loader';
import Logo from '../Logo';

const SplashScreenLoader = () => {
    return (
        <div className="splash-screen-loader">
            <Logo />
        </div>
    );
};

export default SplashScreenLoader;