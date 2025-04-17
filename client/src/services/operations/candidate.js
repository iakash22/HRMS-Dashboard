import axios from 'axios';
import { candidateEndPoints } from '../api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/errorHandler';

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
        // console.log("response :", response);
        toast.success("Status Updated");
    } catch (error) {
        console.log("Error Get Candidate", error);
        const errorMessage = getErrorMessage(error);
        if (errorMessage) {
            toast.error(errorMessage);
        }
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
        // console.log("response :", response);
    } catch (error) {
        console.log("Error Get Candidate", error);
        const errorMessage = getErrorMessage(error);
        if (errorMessage) {
            toast.error(errorMessage);
        }
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
        if (errorMessage) {
            toast.error(errorMessage);
        }
        throw error;
    }
};


export default {
    updateCandidateStatus: updateCandidateStatus,
    deleteCandidate: deleteCandidate, 
    addCandidate :addCandidate,
}