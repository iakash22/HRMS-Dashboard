import React, { useState, useRef, useEffect } from 'react';
import './style.css'

const CustomDropdownInputField = ({ label, name, required, error, options = [], register, setValue, watch, Icon}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const value = watch(name);

    const handleSelect = (option) => {
        setValue(name, option, { shouldValidate: true, shouldDirty: true });
        setOpen(false);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const validation = register(name, required ? { required: `${label} is required` } : {});

    return (
        <div className="custom-dropdown-container" ref={dropdownRef}>
            <div
                className={`dropdown-display ${value ? 'filled' : ''} ${error ? 'error' : ''}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className="selected-value">{value || ''}</span>
                <Icon className="dropdown-arrow" />
                <label className={value || open ? 'float' : ''}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            </div>
            {open && (
                <div className="dropdown-list">
                    {options.map((option, idx) => (
                        <div
                            key={idx}
                            className={`dropdown-item ${value === option ? 'active' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
            <input type="hidden" {...validation} value={value || ''} />
            {error && <span className="error-msg">{error.message}</span>}
        </div>
    );
};

export default CustomDropdownInputField;
