const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "localhost:5000";
const API_VERSION = import.meta.env.VITE_API_VERSION || '/api/v1';


export const authEndPoints = {
    REGISTER_API: BASE_URL + API_VERSION + "/auth/register",
    LOGIN_API: BASE_URL + API_VERSION + "/auth/login",
    LOGOUT_API: BASE_URL + API_VERSION + '/auth/logout'
}

export const candidateEndPoints = {
    CREATE_CANDIDATE_API : BASE_URL + API_VERSION + '/candidate/create',
    UPDATE_STATUS_API : BASE_URL + API_VERSION + '/candidate/update',
    DELETE_CANDIDATE_API : BASE_URL + API_VERSION + '/candidate/delete',
    GET_AND_SEARCH_CANDIDATE_API : BASE_URL + API_VERSION + '/candidate',
}

export const employeeEndPoints = {
    EDIT_EMPLOYEE_API: BASE_URL + API_VERSION + '/employee/edit',
    DELETE_EMPLOYEE_API : BASE_URL + API_VERSION + '/employee/delete',
    GET_AND_SEARCH_EMPLOYEE_API : BASE_URL + API_VERSION + '/employee',
}

export const attendanceEndPoints = {
    GET_AND_SEARCH_ATTENDANCE_API : BASE_URL + API_VERSION + '/attendance',
    MARK_ATTENDANCE_API : BASE_URL + API_VERSION + '/attendance/mark',
}

export const leaveEndPoints = {
    APPLY_LEAVE_API : BASE_URL + API_VERSION + '/leave/apply',
    GET_AND_SEARCH_LEAVE_API : BASE_URL + API_VERSION + '/leave',
    GET_APPROVED_LEAVE_API : BASE_URL + API_VERSION + '/leave/approvedLeaves',
    UPDATE_LEAVE_STATUS_API : BASE_URL + API_VERSION + '/leave/update',
}