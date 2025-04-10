import React from 'react';
import './style.css';
import { MdEmail, MdNotificationsNone, MdKeyboardArrowDown } from 'react-icons/md';
import { LuMail } from "react-icons/lu";

function Topbar() {
    return (
        <div className="topbar">
            <div className="left-section">
                <h2>Candidates</h2>
            </div>
            <div className="right-section">
                <button className="icon-button">
                    <p className='red-circle'></p>
                    <LuMail size={20} />
                </button>
                <button className="icon-button">
                    <p className='red-circle' style={{right : "8px"}}></p>
                    <MdNotificationsNone size={20} />
                </button>
                <div className="profile-info">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Profile"
                        className="profile-icon"
                    />
                    <MdKeyboardArrowDown size={18} className="dropdown-icon" />
                </div>
            </div>
        </div>
    );
}

export default Topbar;
