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

const updateCandidateStatus = async (data, accessToken) => {
    try {
        const response = await axios.put(candidateEndPoints.UPDATE_STATUS_API,
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
        console.log("Error Get Candidate", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
    }
}

const deleteCandidate = async (candidateId, accessToken) => {
    try {
        const response = await axios.delete(candidateEndPoints.DELETE_CANDIDATE_API + `/${candidateId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        console.log("response :", response);
    } catch (error) {
        console.log("Error Get Candidate", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
    }
}

const addCandidate = async (data, accessToken) => {
    try {
        const response = await axios.post(
            candidateEndPoints.CREATE_CANDIDATE_API,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        toast.success(response?.data?.message || "Candidate added successfully");

        return response?.data;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        throw error;
    }
};


export default {
    GetAndSearchCandidate: GetAndSearchCandidate,
    updateCandidateStatus: updateCandidateStatus,
    deleteCandidate: deleteCandidate, 
    addCandidate :addCandidate,
}