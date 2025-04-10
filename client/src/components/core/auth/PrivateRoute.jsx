import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { accessToken } = useSelector(state => state.auth);

    if (accessToken) {
        return children ? children : <Outlet />; // Outlet renders nested routes if no children are specified
    } else {
        return <Navigate to={'/login'} replace />
    }
}

export default PrivateRoute