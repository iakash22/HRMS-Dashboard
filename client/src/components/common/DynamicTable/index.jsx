import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import CustomDropdown from '../CustomDropDown';
import ActionMenuDots from '../ActionMenuDots';
import { toUSFormat, formatDate } from '../../../utils/helper';
import { DocumentIcon } from '../../../assets';
import Loader from '../Loader';

function DynamicTable({ data, columns, onScrollEnd, loading, hasMore, dropDownHandler, actionsData = [], dropDownData = [] }) {
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
                    {
                        (!loading) && (!data || data.length === 0) ? (
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
                                                column.key === 'SrNo' ? (
                                                    String(rowIndex + 1).padStart(2, '0')
                                                )
                                                    :
                                                    column.key === 'profile' ? (
                                                        <img
                                                            style={{ width: "40px", height: "40px" }}
                                                            src={row?.profilePic}
                                                            alt={`${row?.fullName}-Pic`}
                                                            className='profile-icon'
                                                        />
                                                    )
                                                        :
                                                        column.key === 'phone' ? (toUSFormat(row.phone))
                                                            :
                                                            column.key === 'joiningDate' || column.key === 'date' ? (formatDate(row[column.key], 'dd/MM/yyyy'))
                                                                :
                                                                column.key === 'Status' ? (<CustomDropdown data={dropDownData} value={row?.status || row?.attendance} handleStatusChange={(selectedStatus) => dropDownHandler(row?._id, selectedStatus)} />)
                                                                    :
                                                                    column.key === 'task' ? (row.task.length <= 0 ? "--" : row.task)
                                                                        :
                                                                        column.key === 'docs' ? (<span className={`docs-icon ${row?.docsUrl ? "" : "no-docs"}`}><DocumentIcon /></span>)
                                                                            :
                                                                            column.key === 'Action' ? (
                                                                                <ActionMenuDots
                                                                                    actions={actionsData.map(action => ({
                                                                                        title: action.title,
                                                                                        handler: () => action.handler(row)
                                                                                    }))}
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
            {/* <div style={{ height: '80px', display: revealEnd ? "none" : "block" }} /> */}

            <div className="scroll-loader-footer">
                {
                    hasMore && loading && <Loader  circleStyles={{width : "8px", height : "8px",}}/>
                }
                {!hasMore && <div className={`end-reveal ${revealEnd ? 'visible' : ''}`}>
                    🎉 You’ve reached the end
                </div>
                }
            </div>
        </div>
    );
}

export default DynamicTable;
