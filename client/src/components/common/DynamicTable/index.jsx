import React, { useState } from 'react';
import './style.css';
import CustomDropdown from '../CustomDropDown';
import ActionMenuDots from '../ActionMenuDots';

const statusStyles = {
    New: 'status status-new',
    Selected: 'status status-selected',
    Rejected: 'status status-rejected',
};

const status = {

}

function DynamicTable({ data, columns, onDownloadResume, onDeleteCandidate }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    return (
        <div className="dynamic-table-container">
            <table className="dynamic-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.key} data-label={column.label}>
                                    {column.key === 'Status' ? (
                                        <>
                                            {/* <span className={statusStyles[row[column.key]]}>{row[column.key]}</span> */}
                                            <CustomDropdown options={statusStyles} />
                                        </>
                                    ) : column.key === 'Action' ? (
                                        <ActionMenuDots
                                            actions={[
                                                { title: "Download Resume", handler: () => alert("Downloading...") },
                                                { title: "Delete Candidate", handler: () => alert("Deleted!") },
                                            ]}
                                        />

                                    ) : (
                                        row[column.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DynamicTable;
