import React, { useState } from 'react'
import AppLayout from '../../components/layouts/AppLayout';
import DynamicTable from '../../components/common/DynamicTable';
import './style.css'
import CustomDropdown from '../../components/common/CustomDropDown';
import { MdSearch } from 'react-icons/md';
import CustomDialogBox from '../../components/common/CustomDialogBox';

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
    { key: 'CandidatesName', label: 'Candidates Name' },
    { key: 'Email', label: 'Email Address' },
    { key: 'Phone', label: 'Phone Number' },
    { key: 'Position', label: 'Position' },
    { key: 'Status', label: 'Status' },
    { key: 'Experience', label: 'Experience' },
    { key: 'Action', label: 'Action' },
];

const newFilterToolbar = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
const positionFilterToolbar = ["Position", "Designer", "Developer", "Human Resource"]

const Candidates = () => {
    const [open, setOpen] = useState(false);
    const handleDownloadResume = (candidate) => {
        console.log('Download resume for:', candidate);
    };

    const handleDeleteCandidate = (candidate) => {
        console.log('Delete candidate:', candidate);
    };

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
                data={candidateData}
                columns={candidateColumns}
                onDownloadResume={handleDownloadResume}
                onDeleteCandidate={handleDeleteCandidate}
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