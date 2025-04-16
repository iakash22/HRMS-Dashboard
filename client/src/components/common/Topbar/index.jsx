import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
import { MailIcon, NotificationIcon, DropdownIcon } from '../../../assets';
import { useSelector } from 'react-redux';

function Topbar({ isSidebarOpen }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { pathname } = useLocation();
    const title = pathname.replace('/', '') || 'Candidates';
    const dropdownRef = useRef(null);
    const [activeItem, setActiveItem] = useState('');

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = ['Edit Profile', 'Change Password', 'Manage Notification'];

    return (
        <div className={`topbar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="left-section">
                <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
            </div>
            <div className="right-section">
                <button className="icon-button">
                    <span className="red-circle"></span>
                    <MailIcon />
                </button>
                <button className="icon-button">
                    <span className="red-circle notification-circle"></span>
                    <NotificationIcon />
                </button>
                <div className="profile-info" onClick={toggleDropdown} ref={dropdownRef}>
                    <img
                        src={user?.profileUrl}
                        alt={user?.fullName+" pic"}
                        className="profile-icon"
                    />
                    <DropdownIcon className={`dropdown-icon ${isOpen ? 'up' : 'down'}`} />
                    <div className={`dropdown-card ${isOpen ? 'show' : ''}`}>
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className={`profile-dropdown-item ${activeItem === item ? 'active' : ''}`}
                                onClick={() => setActiveItem(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Topbar;
