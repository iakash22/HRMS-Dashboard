import React from 'react';
import './style.css';

const Loader = ({ parentExtraStyle, circleStyles}) => {
    return (
        <div className="loader-container" style={parentExtraStyle}>
            <div className="pulse-loader">
                <div style={circleStyles}></div>
                <div style={circleStyles}></div>
                <div style={circleStyles}></div>
            </div>
        </div>
    );
};

export default Loader;