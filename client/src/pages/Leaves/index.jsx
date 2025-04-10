import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';
import LeaveSection from '../../components/core/Leave/LeaveSection';
import Services from '../../services/operations';
import { leaveEndPoints } from '../../services/api';
import { useSelector } from 'react-redux';

const leaveTableColumns = [
    { key: 'profile', label: 'Profile' },
    { key: 'fullName', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'reason', label: 'Reason' },
    { key: 'Status', label: 'Status' },
    { key: 'docs', label: 'Docs' },
];

const dummyLeaves = [
    {
        profile: '/images',
        name: 'Jane Cooper',
        role: 'Full Time Designer',
        reason: "hbkdm",
        date: '2024-09-10',
        status: 'Approved',
        docs: "pdf"
    },
    {
        profile: '/images',
        name: 'Cody Fisher',
        role: 'Senior Backend Developer',
        date: '2024-09-08',
        reason: "hbkdm",
        status: 'Approved',
    },
];

const leaveStatus = ["Pending", "Approve", "Reject"];

const Leaves = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { accessToken } = useSelector(state => state.auth);

    const fetchLeaves = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const query = { page, pageSize: 10 };

        try {
            const response = await Services.getAndSearchOpeartion(leaveEndPoints.GET_AND_SEARCH_LEAVE_API, query, accessToken, setLoading);

            console.log("response", response);
            const newCandidates = response?.users || [];
            const totalPages = response?.totalPages || 1;

            setData(prev => [...prev, ...newCandidates]);
            setPage(prev => prev + 1);

            // If you've reached the last page, stop further requests
            if (page >= totalPages || newCandidates.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [])
    const openDialog = () => setOpen(true);
    return (
        <>
            <div className="toolbar-container">
                <div className='toolbar-left'>
                    <CustomDropdown data={leaveStatus} />
                </div>
                <div className='toolbar-right'>
                    <div className="search-bar">
                        <MdSearch className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>

                    <button className="add-btn" onClick={openDialog}>Add Leave</button>
                </div>
            </div>

            <div className="leave-page-container">
                <div style={{ width: "70%" }}>
                    <DynamicTable
                        data={data}
                        columns={leaveTableColumns}
                        loading={loading}
                        hasMore={hasMore}
                        onScrollEnd={fetchLeaves}
                    />
                </div>

                <div style={{ width: "30%" }}>
                    {/* <LeaveCalendar leaves={dummyLeaves} /> */}
                    <LeaveSection />
                </div>
            </div>
        </>
    )
}

export default AppLayout(Leaves);
