import React, { useCallback, useEffect, useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';
import Services from '../../services/operations';
import { employeeEndPoints } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setData, setLoading, setPagination, updateFilter } from '../../redux/reducers/slices/table';
import { debounce } from '../../utils/optimizers';
import toast from 'react-hot-toast';
import CustomDialogBox from '../../components/common/CustomDialogBox';
import { editEmploeeFormFields } from '../../constant/formFieldsData'
import { employeeTableColumn } from '../../constant/tableColumnData'
import { employeeFilterPosition } from '../../constant/filterAndDropDownData'

const positions = ["Position", "Intern", "Full Time", "Senior", "Junior"];

const Employees = () => {
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const { page, pageSize, position, search, hasMore, loading, data } = useSelector((state) => state.table.employee);
    const { accessToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const fetchEmployee = async (searchValue = "") => {
        if (loading || !hasMore) return;
        dispatch(setLoading({ pageKey: "employee", loading: true }));
        const query = { page, pageSize, position, search: searchValue };
        try {
            const response = await Services.getAndSearchOpeartion(employeeEndPoints.GET_AND_SEARCH_EMPLOYEE_API, query, accessToken);
            const users = response?.users || [];
            const totalPages = response?.totalPages || 1;

            // console.log(response);
            dispatch(setData({ pageKey: "employee", data: users, append: page > 1 }));
            dispatch(setPagination({ pageKey: "employee", page: page + 1, hasMore: page < totalPages }));
        } catch (err) {
            console.error("Error:", err);
        } finally {
            dispatch(setLoading({ pageKey: "employee", loading: false }));
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [position])

    const handleStatusChange = (value, label) => {
        dispatch(updateFilter({ pageKey: "employee", key: label, value }));
        dispatch(setPagination({ pageKey: "employee", page: 1, hasMore: true }));
        dispatch(setData({ pageKey: "employee", data: [] }));
    };

    const debouncedSearch = useCallback(
        debounce((val) => {
            dispatch(setPagination({ pageKey: "employee", page: 1, hasMore: true }));
            dispatch(setData({ pageKey: "employee", data: [] }));
            fetchEmployee(val);
        }, 500), []
    );

    const onSearchHandler = (e) => {
        const val = e.target.value;
        dispatch(updateFilter({ pageKey: "employee", key: 'search', value: val }));
        if (val.trim() === "") return;
        debouncedSearch(val);
    };

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const EditEmployeeHandler = (employee) => {
        // console.log("employee :", employee);
        setEditData(employee);
        openDialog(true);
    }

    const deleteEmployeeHandler = async (employee) => {
        console.log("employee ", employee);
        if (!employee?._id) return;
        try {
            await Services.EmployeeOperation.deleteEmployee(employee._id, accessToken);
            dispatch(removeItem({ pageKey: 'employee', id: employee._id }));
        } catch (error) {
            console.error("Error deleting Employee:", error);
        }
    }

    const employeeSubmitHandler = async (employeedata, setFormLoading) => {
        setFormLoading(true);

        const formData = {};
        if (employeedata.fullName !== editData?.fullName) formData.fullName = employeedata?.fullName;
        if (employeedata.phone !== editData?.phone) formData.phone = employeedata?.phone;
        if (employeedata.department !== editData?.department) formData.department = employeedata?.department;
        if (employeedata.position !== editData?.position) formData.position = employeedata?.position;
        if (employeedata.joiningDate !== editData?.joiningDate) formData.joiningDate = employeedata?.joiningDate;
        if (employeedata.email !== editData?.email) formData.email = employeedata?.email;

        // console.log("formData:", formData);

        if (Object.keys(formData).length === 0) {
            toast.error("No Changes Done");
            closeDialog();
            setFormLoading(false);
            return;
        }

        try {
            formData.employeeId = employeedata?._id;
            const res = await Services.EmployeeOperation.editEmployee(formData, accessToken);

            if (res?.data) {
                const updatedEmployee = res.data;
                const updatedData = data.map((emp) =>
                    emp._id === updatedEmployee._id ? updatedEmployee : emp
                );
                dispatch(setData({ pageKey: "employee", data: updatedData }));
                closeDialog();
            }
        } catch (error) {
            console.error("Error edit employee:", error);
        } finally {
            setFormLoading(false);
        }
    };

    const actionsData = [
        { title: "Edit", handler: EditEmployeeHandler },
        { title: "Delete", handler: deleteEmployeeHandler },
    ]

    return (
        <>
            <div className="toolbar-container">
                <div className='toolbar-left'>
                    <CustomDropdown data={employeeFilterPosition} label='Position' handleStatusChange={handleStatusChange} />
                </div>
                <div className='toolbar-right'>
                    <div className="search-bar">
                        <MdSearch className="search-icon" />
                        <input type="text" placeholder="Search" name='search' value={search} onChange={onSearchHandler} />
                    </div>
                </div>
            </div>

            <DynamicTable
                data={data}
                columns={employeeTableColumn}
                onScrollEnd={fetchEmployee}
                loading={loading}
                hasMore={hasMore}
                actionsData={actionsData}
            />

            {open && <CustomDialogBox
                title='Edit Employee Details'
                initialData={editData}
                submitHandler={employeeSubmitHandler}
                onClose={closeDialog}
                fields={editEmploeeFormFields}
                confirmBox={false}
            />
            }
        </>
    )
}

export default AppLayout(Employees);