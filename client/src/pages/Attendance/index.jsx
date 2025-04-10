import React from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';

const attendanceFilterStatus = ["Status", "Present", "Absent", "Medical Leave", "Work From Home"];
const attendanceStatus = ["Present", "Absent"]

const attendanceTableColumn = [
    { key: 'profile', label: 'Profile' },
    { key: 'name', label: 'Employee Name' },
    { key: 'position', label: 'Position' },
    { key: 'task', label: 'Task' },
    { key: 'Status', label: 'Status' },
    { key: 'Action', label: 'Action' },
]

const Attendance = () => {
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
                data={[]}
                columns={attendanceTableColumn}
            />
        </>
    )
}

export default AppLayout(Attendance)