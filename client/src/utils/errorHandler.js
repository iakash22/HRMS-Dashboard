import toast from 'react-hot-toast';
import store from '../redux/store';
import { logout as logoutUser } from '../redux/reducers/slices/auth';

export const getErrorMessage = (error) => {
    if (!error) return 'Something went wrong. Please try again.';

    // Axios error with response
    if (error.response) {
        const { data, status } = error.response;

        // Token expired or invalid
        if (status === 401 || status === 403) {
            const message = data?.message || 'Session expired. Please login again.';
            handleTokenExpiry(message);
            return '';
        }

        if (typeof data === 'string') return data;
        if (data?.message) return data.message;

        // Validation errors
        if (data?.errors && typeof data.errors === 'object') {
            const allErrors = Object.values(data.errors).flat();
            return allErrors[0] || 'Please check your input.';
        }

        return 'Request failed. Please try again.';
    }

    // No response from server
    if (error.request) {
        return 'Unable to connect. Check your internet connection.';
    }

    // If error is string
    if (typeof error === 'string') return error;

    return 'Something went wrong. Try again later.';
};

export const handleTokenExpiry = (message = "Session expired. Please login again.") => {
    const toastId = toast.loading("Auto Logout..", {position : "top-center", duration : 1000});
    setTimeout(() => {
        toast.error(message, { id: toastId, position: "top-center", duration : 1500});
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }, 1000);
};
