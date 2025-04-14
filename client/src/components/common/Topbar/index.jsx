import React, { useState } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { MailIcon, NotificationIcon, DropdownIcon } from '../../../assets';

function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const title = pathname.replace('/', '');
    // const [dropUp, setDropUp] = useState(false);

    console.log(isOpen)

    const toggleDropdown = () => {
        // if (!isOpen) {
        //     const rect = dropdownRef.current.getBoundingClientRect();
        //     const spaceBelow = window.innerHeight - rect.bottom;
        //     setDropUp(spaceBelow < 150);
        // }
        setIsOpen(!isOpen);
    };

    return (
        <div className="topbar">
            <div className="left-section">
                <h2>{title ? title : "Candidates"}</h2>
            </div>
            <div className="right-section">
                <button className="icon-button">
                    <p className='red-circle'></p>
                    <MailIcon />
                </button>
                <button className="icon-button">
                    <p className='red-circle' style={{ right: "8px" }}></p>
                    <NotificationIcon />
                </button>
                <div className="profile-info" onClick={toggleDropdown}>
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Profile"
                        className="profile-icon"
                    />
                    <DropdownIcon className={`dropdown-icon ${isOpen ? "up" : "down"}`} />
                </div>
            </div>
        </div>
    );
}

export default Topbar;
