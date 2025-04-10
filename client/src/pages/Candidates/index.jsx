import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout';
import DynamicTable from '../../components/common/DynamicTable';
import './style.css'
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import CustomDialogBox from '../../components/common/CustomDialogBox';
import Services from '../../services/operations';
import { candidateEndPoints } from '../../services/api';
import { useSelector } from 'react-redux';

const candidateData = [
    {
        SrNo: '01',
        CandidatesName: 'Jacob William',
        Email: 'jacob.william@example.com',
        Phone: '(252) 555-0111',
        Position: 'Senior Developer',
        Status: 'New',
        Experience: '1+',
        Action: '...',
    },
    {
        SrNo: '02',
        CandidatesName: 'Guy Hawkins',
        Email: 'kenzi.lawson@example.com',
        Phone: '(907) 555-0101',
        Position: 'Human Resource I...',
        Status: 'New',
        Experience: '0',
        Action: '...',
    },
    {
        SrNo: '03',
        CandidatesName: 'Arlene McCoy',
        Email: 'arlene.mccoy@example.com',
        Phone: '(302) 555-0107',
        Position: 'Full Time Designer',
        Status: 'Selected',
        Experience: '0',
        Action: '...',
    },
    {
        SrNo: '04',
        CandidatesName: 'Leslie Alexander',
        Email: 'willie.jennings@example.com',
        Phone: '(207) 555-0119',
        Position: 'Full Time Developer',
        Status: 'Rejected',
        Experience: '0',
        Action: '...',
    },
    {
        SrNo: '04',
        CandidatesName: 'Leslie Alexander',
        Email: 'willie.jennings@example.com',
        Phone: '(207) 555-0119',
        Position: 'Full Time Developer',
        Status: 'Rejected',
        Experience: '0',
        Action: '...',
    },
    {
        SrNo: '04',
        CandidatesName: 'Leslie Alexander',
        Email: 'willie.jennings@example.com',
        Phone: '(207) 555-0119',
        Position: 'Full Time Developer',
        Status: 'Rejected',
        Experience: '0',
        Action: '...',
    },
    {
        SrNo: '04',
        CandidatesName: 'Leslie Alexander',
        Email: 'willie.jennings@example.com',
        Phone: '(207) 555-0119',
        Position: 'Full Time Developer',
        Status: 'Rejected',
        Experience: '0',
        Action: '...',
    },
    {
        SrNo: '04',
        CandidatesName: 'Leslie Alexander',
        Email: 'willie.jennings@example.com',
        Phone: '(207) 555-0119',
        Position: 'Full Time Developer',
        Status: 'Rejected',
        Experience: '0',
        Action: '...',
    },
    {
        SrNo: '04',
        CandidatesName: 'Leslie Alexander',
        Email: 'willie.jennings@example.com',
        Phone: '(207) 555-0119',
        Position: 'Full Time Developer',
        Status: 'Rejected',
        Experience: '0',
        Action: '...',
    },
];

const candidateColumns = [
    { key: 'SrNo', label: 'Sr no.' },
    { key: 'fullName', label: 'Candidates Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'position', label: 'Position' },
    { key: 'Status', label: 'Status' },
    { key: 'experience', label: 'Experience' },
    { key: 'Action', label: 'Action' },
];

const newFilterToolbar = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
const positionFilterToolbar = ["Position", "Designer", "Developer", "Human Resource"]

const Candidates = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { accessToken } = useSelector(state => state.auth);

    
    const handleDownloadResume = (candidate) => {
        console.log('Download resume for:', candidate);
    };

    const handleDeleteCandidate = (candidate) => {
        console.log('Delete candidate:', candidate);
    };

    const fetchCandidate = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const query = { page, pageSize: 10 };

        try {
            const response = await Services.getAndSearchOpeartion(candidateEndPoints.GET_AND_SEARCH_CANDIDATE_API, query, accessToken, setLoading);

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
        fetchCandidate();
    }, [])

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    return (
        <>
            <div className="toolbar-container">
                <div className='toolbar-left'>
                    <CustomDropdown data={newFilterToolbar} />
                    <CustomDropdown data={positionFilterToolbar} extraStyles={{ "width": "180px" }} />
                </div>
                <div className='toolbar-right'>
                    <div className="search-bar">
                        <MdSearch className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>

                    <button className="add-btn" onClick={openDialog}>Add Candidate</button>
                </div>
            </div>
            <DynamicTable
                data={data}
                columns={candidateColumns}
                onDownloadResume={handleDownloadResume}
                onDeleteCandidate={handleDeleteCandidate}
                onScrollEnd={fetchCandidate}
                loading={loading}
                hasMore={hasMore}
            />

            {open && <CustomDialogBox
                edit={false}
                initialData={{}}
                submitHandler={(data) => console.log("Submitted:", data)}
                onClose={closeDialog}
            />
            }
        </>
    );
};


export default AppLayout(Candidates);