import React, { useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';
import LeaveSection from '../../components/core/Leave/LeaveSection';

const leaveTableColumns = [
    { key: 'profile', label: 'Profile' },
    { key: 'name', label: 'Name' },
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
        docs : "pdf"
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
                        data={dummyLeaves}
                        columns={leaveTableColumns}
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
