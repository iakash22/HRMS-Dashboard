import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import tableSlice from './slices/table';

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [tableSlice.name] : tableSlice.reducer,
});

export default rootReducer;