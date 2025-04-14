import React, { useCallback, useEffect, useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout'
import './style.css';
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import DynamicTable from '../../components/common/DynamicTable';
import LeaveSection from '../../components/core/Leave/LeaveSection';
import Services from '../../services/operations';
import { leaveEndPoints } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setPagination, setLoading, updateFilter } from '../../redux/reducers/slices/table';
import { debounce } from '../../utils/optimizers';
import CustomDialogBox from '../../components/common/CustomDialogBox';
import { leaveFormFields } from '../../constant/formFieldsData'
import { leaveTableColumn } from '../../constant/tableColumnData'
import { leaveFilterStatus, leaveStatus } from '../../constant/filterAndDropDownData'

// const leaveStatus = ["Status", "Pending", "Approved", "Rejected"];

const Leaves = () => {
    const [open, setOpen] = useState(false);
    const [leaveCounts, setLeaveCounts] = useState([]);
    const { page, pageSize, status, search, hasMore, loading, data } = useSelector((state) => state.table.leave);
    const { accessToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const fetchLeaves = async (searchValue = "") => {
        if (loading || !hasMore) return;
        dispatch(setLoading({ pageKey: "leave", loading: true }));
        const query = { page, pageSize, status, search: searchValue };
        try {
            const response = await Services.getAndSearchOpeartion(leaveEndPoints.GET_AND_SEARCH_LEAVE_API, query, accessToken);
            const leaves = response?.users || [];
            const totalPages = response?.totalPages || 1;

            // console.log(response);
            dispatch(setData({ pageKey: "leave", data: leaves, append: page > 1 }));
            dispatch(setPagination({ pageKey: "leave", page: page + 1, hasMore: page < totalPages }));
        } catch (err) {
            console.error("Error:", err);
        } finally {
            dispatch(setLoading({ pageKey: "leave", loading: false }));
        }
    };

    const fetchApprovedLeavesCount = async () => {
        await Services.getAndSearchOpeartion(leaveEndPoints.GET_APPROVED_LEAVE_API, null, accessToken)
            .then((data) => setLeaveCounts(data || []))
            .catch((error) => console.log("Error :", error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchApprovedLeavesCount();
    }, []);

    useEffect(() => {
        fetchLeaves();
    }, [status]);

    const handleStatusChange = (value, label) => {
        dispatch(updateFilter({ pageKey: "leave", key: label, value }));
        dispatch(setPagination({ pageKey: "leave", page: 1, hasMore: true }));
        dispatch(setData({ pageKey: "leave", data: [] }));
    };

    const debouncedSearch = useCallback(
        debounce((val) => {
            dispatch(setPagination({ pageKey: "leave", page: 1, hasMore: true }));
            dispatch(setData({ pageKey: "leave", data: [] }));
            fetchLeaves(val);
        }, 500), []
    );

    const onSearchHandler = (e) => {
        const val = e.target.value;
        dispatch(updateFilter({ pageKey: "leave", key: 'search', value: val }));
        if (val.trim() === "") return;
        debouncedSearch(val);
    };

    const leaveStatusUpdated = async (leaveId, status) => {
        await Services.LeaveOperation.updateLeaveStatus({ leaveId, status }, accessToken);
        await fetchApprovedLeavesCount();
    }

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const createLeaveHandler = async (leaveData, setFormLoading) => {
        console.log("LeaveData :", leaveData);
        setFormLoading(true);
        if (!leaveData && !leaveData?.employeeId) {
            toast.error("Form Error, Retry again!");
            return;
        }

        try {

            const formData = new FormData();
            formData.append('employeeId', leaveData?.employeeId);
            formData.append('reason', leaveData?.reason);
            formData.append('date', leaveData?.date);
            if (leaveData?.docs) {
                formData.append('docs', leaveData.docs);
            }

            const response = await Services.LeaveOperation.applyForLeave(formData, accessToken);

            if (response?.data) {
                closeDialog();
            }
        } catch (err) {
            console.error("Error creating candidate:", err);
        } finally {
            setFormLoading(false);
        }
    }

    return (
        <>
            <div className="toolbar-container">
                <div className='toolbar-left'>
                    <CustomDropdown data={leaveFilterStatus} handleStatusChange={handleStatusChange} label='Status' />
                </div>
                <div className='toolbar-right'>
                    <div className="search-bar">
                        <MdSearch className="search-icon" />
                        <input type="text" placeholder="Search" value={search} onChange={onSearchHandler} />
                    </div>

                    <button className="add-btn" onClick={openDialog}>Add Leave</button>
                </div>
            </div>

            <div className="leave-page-container">
                <div style={{ width: "70%" }}>
                    <DynamicTable
                        data={data}
                        columns={leaveTableColumn}
                        loading={loading}
                        hasMore={hasMore}
                        onScrollEnd={fetchLeaves}
                        dropDownHandler={leaveStatusUpdated}
                        dropDownData={leaveStatus}
                    />
                </div>

                <div style={{ width: "30%" }}>
                    {/* <LeaveCalendar leaves={dummyLeaves} /> */}
                    <LeaveSection leaveCounts={leaveCounts} />
                </div>
            </div>

            {open && <CustomDialogBox
                title='Add New Leave'
                initialData={{}}
                submitHandler={createLeaveHandler}
                onClose={closeDialog}
                fields={leaveFormFields}
                confirmBox={false}
            />}
        </>
    )
}

export default AppLayout(Leaves);
