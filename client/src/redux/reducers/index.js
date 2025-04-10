import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth';

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
});

export default rootReducer;