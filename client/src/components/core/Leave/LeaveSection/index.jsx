// LeaveSection.jsx
import React, { useEffect, useState } from "react";
import LeaveCalendar from "../LeaveCalendar";
import "./style.css";
import { useSelector } from "react-redux";
import Services from '../../../../services/operations';
import { leaveEndPoints } from '../../../../services/api';
import { formatDate } from '../../../../utils/helper';
import Loader from '../../../layouts/Loaders/Loader';

const LeaveSection = ({ leaveCounts }) => {
    const [approvedLeavesData, setAppprovedLeavesData] = useState([]);
    const { accessToken } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);

    const fetchApprovedLeavesByDay = async (date) => {
        setLoading(true);
        await Services.getAndSearchOpeartion(leaveEndPoints.GET_APPROVED_LEAVE_API, { date }, accessToken)
            .then((data) => setAppprovedLeavesData(data))
            .catch((error) => console.log("Error :", error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const date = new Date();
        fetchApprovedLeavesByDay(date);
    }, []);

    return (
        <div className="leave-section-container">
            <div className="calendar-header-title">Leave Calendar</div>
            <div style={{ padding: "6px" }}>
                <LeaveCalendar dateLeaveHandler={fetchApprovedLeavesByDay} leaveCounts={leaveCounts} />
            </div>

            <div className="approved-leaves">
                <h4>Approved Leaves</h4>
                {
                    loading ? <Loader />
                        :
                        !approvedLeavesData || approvedLeavesData.length <= 0 ?
                            (
                                <p className="no-leaves">Looks like no one is on leave this day.</p>
                            )
                            :
                            approvedLeavesData.map((leave, idx) => (
                                <div className="leave-item" key={idx}>
                                    <img className="avatar" src={leave?.employee?.profilePic} alt={leave?.employee?.fullName} />
                                    <div className="leave-info">
                                        <div className="name">{leave?.employee?.fullName}</div>
                                        <div className="position">{leave?.employee?.position + " " + leave?.employee?.department}</div>
                                    </div>
                                    <div className="leave-date">{formatDate(leave.date, 'dd/MM/yy')}</div>
                                </div>
                            ))}
            </div>
        </div>
    );
}

export default LeaveSection