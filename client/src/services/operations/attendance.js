import axios from 'axios';
import { attendanceEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';

const getAndSearchAttendance = async (query = {}, accessToken, setLoading) => {
    try {
        setLoading(true);
        const response = await axios.get(attendanceEndPoints.GET_AND_SEARCH_ATTENDANCE_API, {
            params: query,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data?.data || [];
    } catch (error) {
        console.log("Error Get attendance", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        return [];
    } finally {
        setLoading(false);
    }
};

export default {
    getAndSearchAttendance : getAndSearchAttendance,
}