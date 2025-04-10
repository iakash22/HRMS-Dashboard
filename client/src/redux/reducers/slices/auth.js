import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    accessToken: localStorage.getItem('access-token') ? JSON.parse(localStorage.getItem('access-token')) : null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('access-token');
        }
    },
});

export default authSlice;
export const { setLoading, setUser, setAccessToken, logout } = authSlice.actions;