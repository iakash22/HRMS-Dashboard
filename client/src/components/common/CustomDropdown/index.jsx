import React, { useState, useRef, useEffect, memo } from "react";
import "./style.css";
import { DropdownIcon } from '../../../assets'

const CustomDropdown = ({ data, extraStyles, handleStatusChange, label = "", value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const initialValue = data.find((val) => val.title === value);
    const [selected, setSelected] = useState(initialValue || data[0]);
    const dropdownRef = useRef(null);
    const [dropUp, setDropUp] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        if (!isOpen) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setDropUp(spaceBelow < 150);
        }
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelected(option);
        const value = label == option?.title ? "" : option?.title;
        const lowelCaseLabel = label.toLowerCase();
        handleStatusChange(value, lowelCaseLabel);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-wrapper" ref={dropdownRef}>
            <button className={`dropdown-toggle ${selected?.color}`} onClick={toggleDropdown} style={extraStyles}>
                {selected?.title}
                <span className={`arrow ${isOpen ? "up" : "down"}`}><DropdownIcon /></span>
            </button>
            {isOpen && (
                <div className={`dropdown-menu ${dropUp ? "drop-up" : ""}`}>
                    {data.map((option,index) => (
                        <div
                            key={index}
                            className={`dropdown-item ${selected?.title === option.title ? "selected" : ""}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



export default memo(CustomDropdown);