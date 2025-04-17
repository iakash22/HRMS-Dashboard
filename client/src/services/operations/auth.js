import axios from 'axios';
import { setUser, setLoading, setAccessToken } from '../../redux/reducers/slices/auth';
import { authEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';

const register = (data, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post(
                authEndPoints.REGISTER_API,
                data,
                {
                    headers: { 'Content-Type': 'application/json', }
                }
            );
            // console.log("register response :", response);
            navigate('/login');
        } catch (error) {
            console.log("Register error :", error);
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

const login = (data, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post(
                authEndPoints.LOGIN_API,
                data,
                {
                    headers: { 'Content-Type': 'application/json', }
                }
            );
            // console.log("Login response:", response);
            navigate('/');
            const accessToken = response.data?.data?.token;
            dispatch(setAccessToken(accessToken));
            dispatch(setUser(response.data?.data?.user));
            localStorage.setItem('access-token', JSON.stringify(accessToken));
            localStorage.setItem('user', JSON.stringify(response.data?.data?.user));
        } catch (error) {
            console.log("login error :", error);
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export default {
    register: register,
    login: login,
}