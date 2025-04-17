import React from 'react';
import './style.css';
import AppLayout from '../../AppLayout';

export const Loader = ({ parentExtraStyle, circleStyles }) => {
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

export default AppLayout(Loader);