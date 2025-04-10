import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';
import Services from '../../services/operations';
import { employeeEndPoints } from '../../services/api';
import { useSelector } from 'react-redux';

const employeesData = [
    {
        profile: '01',
        name: 'Jacob William',
        email: 'jacob.william@example.com',
        phone: '(252) 555-0111',
        Position: 'Senior Developer',
        department: 'Developer',
        dateOfJoining: Date.now(),
        Action: '...',
    }
]

const employeeTableColumns = [
    { key: 'profile', label: 'Profile' },
    { key: 'fullName', label: 'Employee Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    { key: 'joiningDate', label: 'Date of Joining' },
    { key: 'Action', label: 'Action' },
];

const positions = ["Poisiton", "Intern", "Full Time", "Senior", "Joinor"];

const Employees = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { accessToken } = useSelector(state => state.auth);

    const fetchEmployee = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const query = { page, pageSize: 10 };

        try {
            const response = await Services.getAndSearchOpeartion(employeeEndPoints.GET_AND_SEARCH_EMPLOYEE_API, query, accessToken, setLoading);

            const newEmployees = response?.users || [];
            const totalPages = response?.totalPages || 1;

            console.log(newEmployees)

            setData(prev => [...prev, ...newEmployees]);
            setPage(prev => prev + 1);

            // If you've reached the last page, stop further requests
            if (page >= totalPages || newEmployees.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [])

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
                data={data}
                columns={employeeTableColumns}
                onScrollEnd={fetchEmployee}
                loading={loading}
                hasMore={hasMore}
            />
        </>
    )
}

export default AppLayout(Employees);