import axios from 'axios';
import { attendanceEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';

const markAttendanceStatus = async (data, accessToken) => {
    try {
        const response = await axios.post(attendanceEndPoints.MARK_ATTENDANCE_API,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        // console.log("response :", response);
        toast.success("Attendance Mark");
    } catch (error) {
        console.log("Error Get Candidate", error);
        const errorMessage = getErrorMessage(error);
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }
}

export default {
    markAttendanceStatus: markAttendanceStatus
}