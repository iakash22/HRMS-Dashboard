import React from 'react'
import './style.css'
import AuthLayout from '../../components/layouts/AuthLayout';
import { AuthForm } from '../../components/core/auth';

const Login = () => {
    return (
        <AuthLayout>
            <AuthForm />
            <div style={{height : "150px"}}></div>
        </AuthLayout>
    )
}

export default Login