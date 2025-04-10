import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';
import { useSelector } from 'react-redux';
import Services from '../../services/operations';
import { attendanceEndPoints } from '../../services/api';


const attendanceFilterStatus = ["Status", "Present", "Absent", "Medical Leave", "Work From Home"];
const attendanceStatus = ["Present", "Absent"]

const attendanceTableColumn = [
    { key: 'profile', label: 'Profile' },
    { key: 'fullName', label: 'Employee Name' }, 
    { key: 'position', label: 'Position' },
    { key: 'task', label: 'Task' },
    { key: 'Status', label: 'Status' },
    { key: 'Action', label: 'Action' },
]

const Attendance = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { accessToken } = useSelector(state => state.auth);

    const fetchAttendance = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const query = { page, pageSize: 10 };

        try {
            const response = await Services.getAndSearchOpeartion(attendanceEndPoints.GET_AND_SEARCH_ATTENDANCE_API, query, accessToken, setLoading);

            console.log("response: ", response);
            const newAttendace = response?.users || [];
            const totalPages = response?.totalPages || 1;

            setData(prev => [...prev, ...newAttendace]);
            setPage(prev => prev + 1);

            // If you've reached the last page, stop further requests
            if (page >= totalPages || newAttendace.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching Attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [])

    return (
        <>
            <div className="toolbar-container">
                <div className='toolbar-left'>
                    <CustomDropdown data={attendanceFilterStatus} />
                </div>
                <div className='toolbar-right'>
                    <div className="search-bar">
                        <MdSearch className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
            </div>

            <DynamicTable
                data={data}
                columns={attendanceTableColumn}
                loading={loading}
                hasMore={hasMore}
                onScrollEnd={fetchAttendance}
            />
        </>
    )
}

export default AppLayout(Attendance)