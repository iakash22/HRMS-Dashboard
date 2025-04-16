import React from 'react';
import './style.css';

const ActionButton = ({
    text = 'Action',
    onClick,
    className = '',
    disabled = false,
    style = {},
}) => {
    return (
        <button
            className={`action-btn ${className}`}
            onClick={onClick}
            disabled={disabled}
            style={style}
        >
            {text}
        </button>
    );
};

export default ActionButton;