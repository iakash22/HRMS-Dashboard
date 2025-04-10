import React, { useEffect, useRef, useState } from 'react';
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

function DynamicTable({ data, columns, onScrollEnd, onDownloadResume, onDeleteCandidate, loading, hasMore }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [revealEnd, setRevealEnd] = useState(false);

    const tableRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (!tableRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                onScrollEnd(); // call when reached near bottom
            }
        };

        const currentRef = tableRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [onScrollEnd]);


    useEffect(() => {
        const handleScroll = () => {
            if (!tableRef.current || loading || hasMore) return;

            const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
            const offsetFromBottom = scrollHeight - scrollTop - clientHeight;

            if (offsetFromBottom <= 20) {
                // console.log("if")
                setRevealEnd(true);
            } else {
                // console.log("else")
                setRevealEnd(false);
            }

        };

        const currentRef = tableRef.current;
        currentRef?.addEventListener('scroll', handleScroll);

        return () => {
            currentRef?.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);


    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    return (
        <div className="dynamic-table-container" ref={tableRef}>
            <table className="dynamic-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="no-data-cell">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={row?._id + rowIndex}>
                                {columns.map((column) => (
                                    <td key={column.key} data-label={column.label}>
                                        {
                                            column.key === "SrNo" ? (
                                                String(rowIndex + 1).padStart(2, '0')
                                            )
                                                :
                                                column.key == 'profile' ? (
                                                    <img
                                                        src={row?.profilePic}
                                                        alt={`${row?.fullName}-Pic`}
                                                        className="profile-icon"
                                                    />
                                                )
                                                    :
                                                    column.key === 'Status' ? (
                                                        <CustomDropdown options={statusStyles} />
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
                        ))
                    )}
                </tbody>

            </table>
            <div style={{ height: '80px', display: revealEnd ? "none" : "block" }} />

            <div className="scroll-loader-footer">
                {hasMore ? (
                    loading && <div className="loader">Loading...</div>
                ) : (
                    <div className={`end-reveal ${revealEnd ? 'visible' : ''}`}>
                        🎉 You’ve reached the end
                    </div>
                )}
            </div>
        </div>
    );
}

export default DynamicTable;
