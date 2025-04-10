import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { DropdownIcon } from '../../../assets'

const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

const CustomDropdown = ({ data = statusOptions, extraStyles}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(data[0] || statusOptions[0]);
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
            setDropUp(spaceBelow < 150); // 150px is approx dropdown height
        }
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-wrapper" ref={dropdownRef}>
            <button className={`dropdown-toggle status-${selected}`} onClick={toggleDropdown} style={extraStyles}>
                {selected}
                <span className={`arrow ${isOpen ? "up" : "down"}`}><DropdownIcon /></span>
            </button>
            {isOpen && (
                <div className={`dropdown-menu ${dropUp ? "drop-up" : ""}`}>
                    {data.map((option) => (
                        <div
                            key={option}
                            className={`dropdown-item ${selected === option ? "selected" : ""}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



export default CustomDropdown;