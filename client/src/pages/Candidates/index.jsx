import React, { useCallback, useEffect, useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout';
import DynamicTable from '../../components/common/DynamicTable';
import './style.css'
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import CustomDialogBox from '../../components/common/CustomDialogBox';
import Services from '../../services/operations';
import { candidateEndPoints } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setData, setLoading, setPagination, updateFilter } from '../../redux/reducers/slices/table';
import { debounce } from '../../utils/optimizers';
import toast from 'react-hot-toast';
import { candidateFormFields } from '../../constant/formFieldsData'
import { candidateTableColumn } from '../../constant/tableColumnData'
import { candidateStatus, candidateFilterpostion, candidateFilterStatus } from '../../constant/filterAndDropDownData'



// const newFilterToolbar = ["Status", "New", "Scheduled", "Ongoing", "Selected", "Rejected"];
// const positionFilterToolbar = ["Position", "Designer", "Developer", "Human Resource"]

const Candidates = () => {
    const [open, setOpen] = useState(false);
    const { page, pageSize, status, position, search, hasMore, loading, data } = useSelector((state) => state.table.candidate);
    const { accessToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const fetchCandidate = async (searchValue = "") => {
        if (loading || !hasMore) return;
        dispatch(setLoading({ pageKey: "candidate", loading: true }));
        const query = { page, pageSize, status, position, search: searchValue };
        try {
            const response = await Services.getAndSearchOpeartion(candidateEndPoints.GET_AND_SEARCH_CANDIDATE_API, query, accessToken);
            const users = response?.users || [];
            const totalPages = response?.totalPages || 1;

            // console.log(response);
            dispatch(setData({ pageKey: "candidate", data: users, append: page > 1 }));
            dispatch(setPagination({ pageKey: "candidate", page: page + 1, hasMore: page < totalPages }));
        } catch (err) {
            console.error("Error:", err);
        } finally {
            dispatch(setLoading({ pageKey: "candidate", loading: false }));
        }
    };

    useEffect(() => {
        fetchCandidate();
    }, [status, position]);


    const handleStatusChange = (value, label) => {
        dispatch(updateFilter({ pageKey: "candidate", key: label, value }));
        dispatch(setPagination({ pageKey: "candidate", page: 1, hasMore: true }));
        dispatch(setData({ pageKey: "candidate", data: [] }));
    };

    const debouncedSearch = useCallback(
        debounce((val) => {
            dispatch(setPagination({ pageKey: "candidate", page: 1, hasMore: true }));
            dispatch(setData({ pageKey: "candidate", data: [] }));
            fetchCandidate(val);
        }, 500), []
    );

    const onSearchHandler = (e) => {
        const val = e.target.value;
        dispatch(updateFilter({ pageKey: "candidate", key: 'search', value: val }));
        if (val.trim() === "") return;
        debouncedSearch(val);
    };

    const updateStatusHandler = async (candidateId, status) => {
        await Services.CandidateOperation.updateCandidateStatus({ candidateId, status }, accessToken);
    }

    const handleDownloadResume = (candidate) => {
        const resumeUrl = candidate?.resumeUrl;
        if (resumeUrl) {
            const fileName = resumeUrl.split('/').pop().split('?')[0];
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.setAttribute('download', fileName); // This may be ignored by some servers
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            toast.error("Resume not found");
        }
    };

    const handleDeleteCandidate = async (candidate) => {
        if (!candidate?._id) return;
        try {
            await Services.CandidateOperation.deleteCandidate(candidate._id, accessToken);
            dispatch(removeItem({ pageKey: 'candidate', id: candidate._id }));
        } catch (error) {
            console.error("Error deleting candidate:", error);
        }
    };

    const actionsData = [
        { title: "Download Resume", handler: handleDownloadResume },
        { title: "Delete Candidate", handler: handleDeleteCandidate },
    ]

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
                dispatch(setData({ pageKey: "candidate", data: updatedData }));
                closeDialog();
            }
        } catch (err) {
            console.error("Error creating candidate:", err);
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <>
            <div className="toolbar-container">
                <div className='toolbar-left'>
                    <CustomDropdown data={candidateFilterStatus} handleStatusChange={handleStatusChange} label="Status" />
                    <CustomDropdown data={candidateFilterpostion} handleStatusChange={handleStatusChange} extraStyles={{ "width": "180px" }} label="Position" />
                </div>
                <div className='toolbar-right'>
                    <div className="search-bar">
                        <MdSearch className="search-icon" />
                        <input type="text" value={search} placeholder="Search" onChange={onSearchHandler} />
                    </div>

                    <button className="add-btn" onClick={openDialog}>Add Candidate</button>
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

            {open && <CustomDialogBox
                title='Add New Candidate'
                initialData={{}}
                submitHandler={addCandidateSubmitHandler}
                onClose={closeDialog}
                fields={candidateFormFields}
                confirmBox={true}
            />
            }
        </>
    );
};


export default AppLayout(Candidates);