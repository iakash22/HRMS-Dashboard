import axios from 'axios';
import { candidateEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';

const GetAndSearchCandidate = async (query = {}, accessToken, setLoading) => {
    try {
        setLoading(true);

        const response = await axios.get(candidateEndPoints.GET_AND_SEARCH_CANDIDATE_API, {
            params: query,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data?.data || [];
    } catch (error) {
        console.log("Error Get Candidate", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        return [];
    } finally {
        setLoading(false);
    }
};


export default {
    GetAndSearchCandidate: GetAndSearchCandidate,
}