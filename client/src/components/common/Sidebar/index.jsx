import React, { useState } from 'react';
import './style.css';
import Logo from '../Logo';
import CustomPopup from '../../common/CustomPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/slices/auth';
import { UserAddIcon, UserIcon, AttendanceIcon, LeaveIcon, LogoutIcon, SearchIcon } from '../../../assets';

const Sidebar = () => {
    const { pathname } = useLocation();
    const [active, setActive] = useState(pathname);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        { label: "Candidates", path: '/', icon: <UserAddIcon />, section: "Recruitment" },
        { label: "Employees", path: '/employees', icon: <UserIcon />, section: "Organization" },
        { label: "Attendance", path: '/attendance', icon: <AttendanceIcon />, section: "Organization" },
        { label: "Leaves", path: '/leaves', icon: <LeaveIcon />, section: "Organization" },
        { label: "Logout", icon: <LogoutIcon />, section: "Others", logout: true },
    ];

    // console.log(active);
    const openPopUp = (label) => {
        setActive(label)
        setIsOpenPopup(true);
    }

    const logoutHandler = async () => {
        await dispatch(logout());
        navigate('/login');
    }

    return (
        <>
            <div className="sidebar">
                <div className="logo-container">
                    <Logo
                        parentStyle={{ fontSize: '20px' }}
                        boxStyle={{ width: '32px', height: '32px', borderWidth: '4px', borderRadius: '4px' }}
                    />
                </div>
                <div className="search-bar">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>

                <div className="section-title">Recruitment</div>
                {navItems.filter(item => item.section === "Recruitment").map((item, index) => (
                    <div
                        className={`nav-item ${active === item?.path ? "active" : ""}`}
                        key={index}
                        onClick={() => setActive(item?.path)}
                    >
                        <a href={item?.path}>
                            {active === item?.path && <div className="highlight-bar"></div>}
                            <span className="bar-icon">{item.icon}</span>
                            <span className="label">{item.label}</span>
                        </a>
                    </div>
                ))}

                <div className="section-title">Organization</div>
                {navItems.filter(item => item.section === "Organization").map((item, index) => (
                    <div
                        className={`nav-item ${active === item?.path ? "active" : ""}`}
                        key={index}
                        onClick={() => setActive(item?.path)}
                    >
                        <a href={item?.path}>
                            {active === item?.path && <div className="highlight-bar"></div>}
                            <span className="bar-icon">{item.icon}</span>
                            <span className="label">{item.label}</span>
                        </a>
                    </div>
                ))}

                <div className="section-title">Others</div>
                {navItems.filter(item => item.section === "Others").map((item, index) => (
                    <div
                        className={`nav-item logout ${active === item.label ? "active" : ""}`}
                        key={index}
                        onClick={() => openPopUp(item.label)}
                    >
                        <a>
                            {active === item.label && <div className="highlight-bar"></div>}
                            <span className="bar-icon">{item.icon}</span>
                            <span className="label">{item.label}</span>
                        </a>
                    </div>
                ))}
            </div>
            <CustomPopup
                isOpen={isOpenPopup}
                onCancel={() => setIsOpenPopup(false)}
                onConfirm={logoutHandler}
                message='Are you sure you want to log out?'
                title='Log Out'
            />
        </>
    );
};

export default Sidebar;
