import React, { useState } from 'react';
import './style.css';
import Sidebar from '../../common/Sidebar';
import Topbar from '../../common/Topbar';

const AppLayout = (WrappedComponent) => {
    return function WithLayout(props) {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);

        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        };

        return (
            <div className="main-layout">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="content-area">
                    <Topbar isSidebarOpen={isSidebarOpen} />
                    <div className="main-content">
                        <WrappedComponent {...props} />
                    </div>
                </div>
            </div>
        );
    };
};

export default AppLayout;