import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from '../../components/common/CustomDropDown';
import DynamicTable from '../../components/common/DynamicTable';
import SearchBar from '../../components/common/SearchBar';
import AppLayout from '../../components/layouts/AppLayout';
import { attendanceFilterStatus, attendanceStatus } from '../../constant/filterAndDropDownData';
import { attendanceTableColumn } from '../../constant/tableColumnData';
import { setData, setLoading, setPagination, updateFilter } from '../../redux/reducers/slices/table';
import { attendanceEndPoints } from '../../services/api';
import Services from '../../services/operations';
import { debounce } from '../../utils/optimizers';
import './style.css';

const Attendance = ({ isSidebarOpen }) => {
    const { page, pageSize, status, search, hasMore, loading, data } = useSelector((state) => state.table.attendance);
    const { accessToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const fetchAttendance = async (searchValue = "") => {
        if (loading || !hasMore) return;
        dispatch(setLoading({ pageKey: "attendance", loading: true }));
        const query = { page, pageSize, status, search: searchValue };
        try {
            const response = await Services.getAndSearchOpeartion(attendanceEndPoints.GET_AND_SEARCH_ATTENDANCE_API, query, accessToken);
            const attendance = response?.users || [];
            const totalPages = response?.totalPages || 1;

            // console.log(response);
            dispatch(setData({ pageKey: "attendance", data: attendance, append: page > 1 }));
            dispatch(setPagination({ pageKey: "attendance", page: page + 1, hasMore: page < totalPages }));
        } catch (err) {
            console.error("Error:", err);
        } finally {
            dispatch(setLoading({ pageKey: "attendance", loading: false }));
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [status])

    const handleStatusChange = (value, label) => {
        dispatch(updateFilter({ pageKey: "attendance", key: label, value }));
        dispatch(setPagination({ pageKey: "attendance", page: 1, hasMore: true }));
        dispatch(setData({ pageKey: "attendance", data: [] }));
    };

    const debouncedSearch = useCallback(
        debounce((val) => {
            dispatch(setPagination({ pageKey: "attendance", page: 1, hasMore: true }));
            dispatch(setData({ pageKey: "attendance", data: [] }));
            fetchAttendance(val);
        }, 500), []
    );

    const onSearchHandler = (e) => {
        const val = e.target.value;
        dispatch(updateFilter({ pageKey: "attendance", key: 'search', value: val }));
        if (val.trim() === "") return;
        debouncedSearch(val);
    };

    const updateStatusHandler = async (employeeId, status) => {
        // console.log("CandidateId, status", candidateId, status);
        if (status == "Not Marked") {
            return;
        } else {
            await Services.AttendanceOperation.markAttendanceStatus({ employeeId, status }, accessToken);
        }
    }

    return (
        <div className={`container attendance ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className='toolbar-container'>
                <div className='toolbar-left'>
                    <CustomDropdown data={attendanceFilterStatus} handleStatusChange={handleStatusChange} label="Status" extraStyles={{ width: "190px" }} />
                </div>
                <div className='toolbar-right'>
                    <SearchBar
                        value={search}
                        onChange={onSearchHandler}
                        placeholder="Search"
                    />
                </div>
            </div>

            <DynamicTable
                data={data}
                columns={attendanceTableColumn}
                loading={loading}
                hasMore={hasMore}
                onScrollEnd={fetchAttendance}
                dropDownData={attendanceStatus}
                dropDownHandler={updateStatusHandler}
            />
        </div>
    )
}

export default AppLayout(Attendance)