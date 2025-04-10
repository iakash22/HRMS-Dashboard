// /pages/Register/index.jsx
import React from 'react';
import './style.css';
import AuthLayout from '../../components/layouts/AuthLayout';
import { AuthForm } from '../../components/core/auth';

const Register = () => {
    return (
        <AuthLayout>
            <AuthForm />
        </AuthLayout>
    );
}

export default Register;
