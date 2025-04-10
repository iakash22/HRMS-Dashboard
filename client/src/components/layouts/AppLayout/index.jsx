import React from 'react'
import './style.css';
import Sidebar from '../../common/Sidebar';
import Topbar from '../../common/Topbar';

const AppLayout = (WrappedComponent) => {
    return function WithLayout(props) {
        return (
            <div className="main-layout">
                <Sidebar />
                <div className="content-area">
                    <Topbar />
                    <div className="main-content">
                        <WrappedComponent {...props} />
                    </div>
                </div>
            </div>
        );
    };
};

export default AppLayout