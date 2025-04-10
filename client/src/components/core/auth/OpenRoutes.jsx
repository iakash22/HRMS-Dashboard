import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const OpenRoutes = ({ children }) => {
    const { accessToken } = useSelector(state => state.auth);

    if (!accessToken) {
        return children ? children : <Outlet />;
    } else {
        return <Navigate to={'/'} />;
    }
}

export default OpenRoutes