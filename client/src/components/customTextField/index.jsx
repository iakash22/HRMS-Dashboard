import React from 'react';
import './style.css';

const CustomTextField = ({
    label,
    name,
    type = 'text',
    icon,
    register,
    required,
    error,
}) => {
    return (
        <div className="custom-textfield">
            <div className={`textfield-wrapper ${error ? 'error' : ''}`}>
                <input
                    id={name}
                    type={type}
                    {...register(name, { required })}
                    placeholder=" " // this creates space for floating label
                />
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
                {icon && <span className="textfield-icon">{icon}</span>}
            </div>
            {error && <span className="error-msg">{label} is required</span>}
        </div>
    );
};

export default CustomTextField;
