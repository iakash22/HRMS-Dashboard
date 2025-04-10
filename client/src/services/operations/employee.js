import axios from 'axios';
import { employeeEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';

const getAndSearchCandidate = async (query = {}, accessToken, setLoading) => {
    try {
        setLoading(true);

        const response = await axios.get(employeeEndPoints.GET_AND_SEARCH_EMPLOYEE_API, {
            params: query,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data?.data || [];
    } catch (error) {
        console.log("Error Get employee", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        return [];
    } finally {
        setLoading(false);
    }
};

export default {
    getAndSearchCandidate: getAndSearchCandidate,
}