// LeaveSection.jsx
import React from "react";
import LeaveCalendar from "../LeaveCalendar";
import "./style.css";

const approvedLeaves = [
    {
        name: "Cody Fisher",
        date: "8/09/24",
        position: "Senior Backend Developer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    // Add more leaves as needed
];

export default function LeaveSection() {
    return (
        <div className="leave-section-container">
            <div className="calendar-header-title">Leave Calendar</div>
            <div style={{padding : "6px"}}>
                <LeaveCalendar />
            </div>

            <div className="approved-leaves">
                <h4>Approved Leaves</h4>
                {approvedLeaves.map((leave, idx) => (
                    <div className="leave-item" key={idx}>
                        <img className="avatar" src={leave.avatar} alt={leave.name} />
                        <div className="leave-info">
                            <div className="name">{leave.name}</div>
                            <div className="position">{leave.position}</div>
                        </div>
                        <div className="leave-date">{leave.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
