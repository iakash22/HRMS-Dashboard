import axios from 'axios';
import { employeeEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';


const deleteEmployee = async (employeeId, accessToken) => {
    try {
        const response = await axios.delete(employeeEndPoints.DELETE_EMPLOYEE_API + `/${employeeId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        // console.log("response :", response);
    } catch (error) {
        console.log("Error Get employee", error);
        const errorMessage = getErrorMessage(error);
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }
}

const editEmployee = async (data, accessToken) => {
    try {
        const response = await axios.put(
            employeeEndPoints.EDIT_EMPLOYEE_API,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        toast.success(response?.data?.message || "Employee updated");

        return response?.data;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        if (errorMessage) {
            toast.error(errorMessage);
        }
        throw error;
    }
}

export default {
    deleteEmployee: deleteEmployee,
    editEmployee : editEmployee,
}