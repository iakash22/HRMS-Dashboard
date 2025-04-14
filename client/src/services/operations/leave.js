import axios from 'axios';
import { leaveEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';

const applyForLeave = async (data, accessToken) => {
    try {
        const response = await axios.post(
            leaveEndPoints.APPLY_LEAVE_API,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        toast.success(response?.data?.message || "leave added successfully");

        return response?.data;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        throw error;
    }
}

const updateLeaveStatus = async (data, accessToken) => {
    try {
        const response = await axios.put(leaveEndPoints.UPDATE_LEAVE_STATUS_API,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log("response :", response);
        toast.success("Status Updated");
    } catch (error) {
        console.log("Error update leave status", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
    }
}


export default {
    applyForLeave: applyForLeave,
    updateLeaveStatus : updateLeaveStatus,
}