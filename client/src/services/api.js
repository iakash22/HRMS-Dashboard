const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL
const API_VERSION = import.meta.env.VITE_API_VERSION


export const authEndPoints = {
    REGISTER_API: BASE_URL + API_VERSION + "/auth/register",
    LOGIN_API: BASE_URL + API_VERSION + "/auth/login",
    LOGOUT_API: BASE_URL + API_VERSION + '/auth/logout'
}