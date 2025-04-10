import { getErrorMessage } from '../../utils/errorHandler';
import toast from 'react-hot-toast';
import axios from 'axios';
import AuthOperation from './auth';
import CandidateOperation from './candidate';
import AttendanceOperation from './attendance';
import LeaveOperation from './leave';
import EmployeeOperation from './employee';

const getAndSearchOpeartion = async (API_URL, query = {}, accessToken, setLoading) => {
    try {
        setLoading(true);

        const response = await axios.get(API_URL, {
            params: query,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data?.data || [];
    } catch (error) {
        console.log("Error Get And Search Operation :", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        return [];
    } finally {
        setLoading(false);
    }
};

export default {
    AuthOperation: AuthOperation,
    CandidateOperation: CandidateOperation,
    AttendanceOperation,
    LeaveOperation,
    EmployeeOperation,
    getAndSearchOpeartion: getAndSearchOpeartion,
}