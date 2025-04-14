import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    candidate: {
        data: [],
        page: 1,
        pageSize: 10,
        status: "",
        position: "",
        search: "",
        hasMore: true,
        loading: false,
    },
    employee: {
        data: [],
        page: 1,
        pageSize: 10,
        position: "",
        search: "",
        hasMore: true,
        loading: false,
    },
    attendance: {
        data: [],
        page: 1,
        pageSize: 10,
        status: "",
        search: "",
        hasMore: true,
        loading: false,
    },
    leave: {
        data: [],
        page: 1,
        pageSize: 10,
        status: "",
        search: "",
        hasMore: true,
        loading: false,
    },
};

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            const { pageKey, key, value } = action.payload;
            state[pageKey][key] = value;
        },
        resetFilters: (state, action) => {
            const { pageKey } = action.payload;
            const defaultState = initialState[pageKey];
            state[pageKey] = { ...defaultState };
        },
        setData: (state, action) => {
            const { pageKey, data, append = false } = action.payload;
            state[pageKey].data = append
                ? [...state[pageKey].data, ...data]
                : data;
        },
        setLoading: (state, action) => {
            const { pageKey, loading } = action.payload;
            state[pageKey].loading = loading;
        },
        setPagination: (state, action) => {
            const { pageKey, page, hasMore } = action.payload;
            state[pageKey].page = page;
            state[pageKey].hasMore = hasMore;
        },
        removeItem: (state, action) => {
            const { pageKey, id } = action.payload;
            state[pageKey].data = state[pageKey].data.filter(item => item._id !== id);
        },
    },
});


export const {
    updateFilter,
    resetFilters,
    setData,
    setLoading,
    setPagination,
    removeItem,
} = tableSlice.actions;

export default tableSlice;
