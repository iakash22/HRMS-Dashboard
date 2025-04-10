import React, { useState } from "react";
import "./style.css";

const LeaveCalendar = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const prevMonth = () => {
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(prev);
    };

    const nextMonth = () => {
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(next);
    };

    const handleDateClick = (date) => {
        if (date.getMonth() !== currentDate.getMonth()) return;
        setSelectedDate(date);
        console.log("Clicked date:", date.toISOString().split("T")[0]);

        // 🔥 API call example
        // fetch(`/api/leave?date=${date.toISOString().split("T")[0]}`)
        //   .then(res => res.json())
        //   .then(data => console.log("Leave data:", data));
    };

    const generateCalendarDays = () => {
        const days = [];

        // Leading empty boxes
        for (let i = 0; i < startDay; i++) {
            days.push({ date: null });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            days.push({ date });
        }

        // Trailing empty boxes
        const totalCells = Math.ceil(days.length / 7) * 7;
        const emptyCells = totalCells - days.length;
        for (let i = 0; i < emptyCells; i++) {
            days.push({ date: null });
        }

        return days;
    };

    const days = generateCalendarDays();
    const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

    return (
        <div className="leave-calendar">
            <div className="calendar-header">
                <button onClick={prevMonth}>❮</button>
                <span>
                    {currentDate.toLocaleString("default", { month: "long" })}, {currentDate.getFullYear()}
                </span>
                <button onClick={nextMonth}>❯</button>
            </div>

            <div className="calendar-grid">
                {dayLabels.map((day, idx) => (
                    <div key={idx} className="day-label">
                        {day}
                    </div>
                ))}

                {days.map(({ date }, idx) => {
                    if (!date) {
                        return <div key={idx} className="day-cell"></div>;
                    }

                    const isToday =
                        date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();

                    const isSelected =
                        selectedDate &&
                        date.getDate() === selectedDate.getDate() &&
                        date.getMonth() === selectedDate.getMonth() &&
                        date.getFullYear() === selectedDate.getFullYear();

                    const isBeforeToday =
                        currentDate.getMonth() === today.getMonth() &&
                        currentDate.getFullYear() === today.getFullYear() &&
                        date.getDate() < today.getDate();

                    return (
                        <div
                            key={idx}
                            className={`day-cell 
                                ${isToday ? "today" : ""} 
                                ${isSelected ? "selected" : ""} 
                                ${isBeforeToday ? "grey" : ""}`
                            }
                            onClick={() => handleDateClick(date)}
                        >
                            {date.getDate()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LeaveCalendar;
