import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useLocation, useNavigate } from 'react-router-dom'
import './style.css';
import { useDispatch } from 'react-redux';
import Services from '../../../services/operations';

const AuthForm = ({ }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { pathname } = useLocation();
    const disptach = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        if (pathname === "/register") {
            console.log("Registering user:", data);
            data.confirmPassword = undefined;
            await disptach(Services.AuthOperation.register(data, navigate));
        } else {
            console.log("Logging in user:", data);
            await disptach(Services.AuthOperation.login(data, navigate));
        }
    };
    return (
        <div className={`authForm ${pathname === "/register" ? "register" : "login"}`}>
            <h2>Welcome to Dashboard</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                {pathname === "/register" && <>
                    <label>Full name<span>*</span></label>
                    <input
                        type="text"
                        {...register('fullName', { required: 'Full name is required' })}
                        placeholder="Full name"
                    />
                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                </>
                }

                <label>Email Address<span>*</span></label>
                <input
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address',
                        },
                    })}
                    placeholder="Email Address"
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <label>Password<span>*</span></label>
                <PasswordWithEyeVisible setShow={setShowPassword} show={showPassword}>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}
                        placeholder="Password"
                    />
                </PasswordWithEyeVisible>
                {errors.password && <p className="error">{errors.password.message}</p>}

                {pathname === "/register" &&
                    <>
                        <label>Confirm Password<span>*</span></label>
                        <PasswordWithEyeVisible setShow={setShowConfirmPassword} show={showConfirmPassword}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value) => value === watch('password') || 'Passwords do not match',
                                })}
                                placeholder="Confirm Password"
                            />
                        </PasswordWithEyeVisible>
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                    </>
                }

                {
                    pathname === "/login" &&
                    <a href="#forget-password" className='authForm-link forget-link' style={{ marginTop: "-2px" }}>Forgot password?</a>
                }

                <button type="submit" className="authForm-btn">{pathname === "/register" ? "Register" : "Login"}</button>

                <div className="authForm-link">
                    {pathname === "/register" ? <>Already have an account? <a href="/login">Login</a></>
                        :
                        <>Don’t have an account? <a href="/register">Register</a></>
                    }
                </div>
            </form>
        </div>
    )
}

export default AuthForm

const PasswordWithEyeVisible = ({ children, show, setShow }) => {
    const passwordToggle = () => {
        setShow(!show);
    }
    return (
        <div className='password-visible'>
            {children}
            {show ? <LuEye className='eye' onClick={passwordToggle} /> : <LuEyeOff className='eye' onClick={passwordToggle} />}
        </div>
    )
}