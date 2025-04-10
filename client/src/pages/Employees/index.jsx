import React from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';

const employeesData = [
    {
        profile: '01',
        name: 'Jacob William',
        email: 'jacob.william@example.com',
        phone: '(252) 555-0111',
        Position: 'Senior Developer',
        department: 'Developer',
        dateOfJoining : Date.now(),
        Action: '...',
    }
]

const employeeTableColumns = [
    { key: 'profile', label: 'Profile' },
    { key: 'name', label: 'Employee Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    { key: 'dateOfJoining', label: 'Date of Joining' },
    { key: 'Action', label: 'Action' },
];

const positions = ["Poisiton", "Intern", "Full Time", "Senior", "Joinor"];

const Employees = () => {
    return (
        <>
            <div className="toolbar-container">
                <div className='toolbar-left'>
                    <CustomDropdown data={positions} />
                </div>
                <div className='toolbar-right'>
                    <div className="search-bar">
                        <MdSearch className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
            </div>

            <DynamicTable
                data={employeesData}
                columns={employeeTableColumns}
            />
        </>
    )
}

export default AppLayout(Employees);