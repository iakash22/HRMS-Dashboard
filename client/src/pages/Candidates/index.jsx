import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../components/common/ActionButton';
import CustomDialogBox from '../../components/common/CustomDialogBox';
import CustomDropdown from '../../components/common/CustomDropDown';
import DynamicTable from '../../components/common/DynamicTable';
import SearchBar from '../../components/common/SearchBar';
import AppLayout from '../../components/layouts/AppLayout';
import { candidateFilterpostion, candidateFilterStatus, candidateStatus } from '../../constant/filterAndDropDownData';
import { candidateFormFields } from '../../constant/formFieldsData';
import { candidateTableColumn } from '../../constant/tableColumnData';
import { removeItem, setData, setLoading, setPagination, updateFilter } from '../../redux/reducers/slices/table';
import { candidateEndPoints } from '../../services/api';
import Services from '../../services/operations';
import { debounce } from '../../utils/optimizers';
import './style.css';

const Candidates = ({ isSidebarOpen }) => {
    const [open, setOpen] = useState(false);
    const { page, pageSize, status, position, search, hasMore, loading, data } = useSelector((state) => state.table.candidate);
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const fetchCandidate = async (searchValue = '') => {
        if (loading || !hasMore) return;
        dispatch(setLoading({ pageKey: 'candidate', loading: true }));
        const query = { page, pageSize, status, position, search: searchValue };
        try {
            const response = await Services.getAndSearchOpeartion(candidateEndPoints.GET_AND_SEARCH_CANDIDATE_API, query, accessToken);
            const users = response?.users || [];
            const totalPages = response?.totalPages || 1;

            dispatch(setData({ pageKey: 'candidate', data: users, append: page > 1 }));
            dispatch(setPagination({ pageKey: 'candidate', page: page + 1, hasMore: page < totalPages }));
        } catch (err) {
            console.error('Error:', err);
        } finally {
            dispatch(setLoading({ pageKey: 'candidate', loading: false }));
        }
    };

    useEffect(() => {
        fetchCandidate();
    }, [status, position]);

    const handleStatusChange = (value, label) => {
        dispatch(updateFilter({ pageKey: 'candidate', key: label, value }));
        dispatch(setPagination({ pageKey: 'candidate', page: 1, hasMore: true }));
        dispatch(setData({ pageKey: 'candidate', data: [] }));
    };

    const debouncedSearch = useCallback(
        debounce((val) => {
            dispatch(setPagination({ pageKey: 'candidate', page: 1, hasMore: true }));
            dispatch(setData({ pageKey: 'candidate', data: [] }));
            fetchCandidate(val);
        }, 500),
        []
    );

    const onSearchHandler = (e) => {
        const val = e.target.value;
        dispatch(updateFilter({ pageKey: 'candidate', key: 'search', value: val }));
        if (val.trim() === '') return;
        debouncedSearch(val);
    };

    const updateStatusHandler = async (candidateId, status) => {
        await Services.CandidateOperation.updateCandidateStatus({ candidateId, status }, accessToken);
    };

    const handleDownloadResume = (candidate) => {
        const resumeUrl = candidate?.resumeUrl;
        if (resumeUrl) {
            const fileName = resumeUrl.split('/').pop().split('?')[0];
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.setAttribute('download', fileName);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            toast.error('Resume not found');
        }
    };

    const handleDeleteCandidate = async (candidate) => {
        if (!candidate?._id) return;
        try {
            await Services.CandidateOperation.deleteCandidate(candidate._id, accessToken);
            dispatch(removeItem({ pageKey: 'candidate', id: candidate._id }));
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
    };

    const actionsData = [
        { title: 'Download Resume', handler: handleDownloadResume },
        { title: 'Delete Candidate', handler: handleDeleteCandidate },
    ];

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const addCandidateSubmitHandler = async (candidatedata, setFormLoading) => {
        try {
            setFormLoading(true);

            const formData = new FormData();
            formData.append('fullName', candidatedata.fullName);
            formData.append('email', candidatedata.email);
            formData.append('phone', candidatedata.phone);
            formData.append('resume', candidatedata.resume);
            formData.append('position', candidatedata.position);
            formData.append('experience', candidatedata.experience);

            const response = await Services.CandidateOperation.addCandidate(formData, accessToken);

            if (response?.data) {
                const newCandidate = response.data;
                const currentData = data;
                const updatedData = [newCandidate, ...currentData];
                dispatch(setData({ pageKey: 'candidate', data: updatedData }));
                closeDialog();
            }
        } catch (err) {
            console.error('Error creating candidate:', err);
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className={`container candidates ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="toolbar-container">
                <div className="toolbar-left">
                    <CustomDropdown
                        data={candidateFilterStatus}
                        handleStatusChange={handleStatusChange}
                        label="Status"
                    />
                    <CustomDropdown
                        data={candidateFilterpostion}
                        handleStatusChange={handleStatusChange}
                        extraStyles={{ width: '180px' }}
                        label="Position"
                    />
                </div>
                <div className="toolbar-right">
                    <SearchBar
                        value={search}
                        onChange={onSearchHandler}
                        placeholder="Search"
                    />
                    <ActionButton
                        text="Add Candidate"
                        onClick={openDialog}
                    />
                </div>
            </div>
            <DynamicTable
                data={data}
                columns={candidateTableColumn}
                onScrollEnd={fetchCandidate}
                loading={loading}
                hasMore={hasMore}
                dropDownHandler={updateStatusHandler}
                actionsData={actionsData}
                dropDownData={candidateStatus}
            />
            {open && (
                <CustomDialogBox
                    title="Add New Candidate"
                    initialData={{}}
                    submitHandler={addCandidateSubmitHandler}
                    onClose={closeDialog}
                    fields={candidateFormFields}
                    confirmBox={true}
                />
            )}
        </div>
    );
};

export default AppLayout(Candidates);