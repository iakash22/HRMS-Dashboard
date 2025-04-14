import { CalendarIcon, DropdownIcon, SearchIcon, UploadIcon } from '../assets';

export const leaveFormFields = [
    { name: "fullName", type: "search", label: "", placeholder: "Search Employee Name", required: true, icon: SearchIcon },
    { name: "designation", label: "Designation", required: true },
    { name: "date", label: "Leave Date", required: true, type: "date", icon: CalendarIcon },
    { name: "docs", label: "Documents", required: false, type: "file", icon: UploadIcon },
    { name: "reason", label: "Reason", required: true },
];

export const editEmploeeFormFields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "email", label: "Email Address", required: true },
    { name: "phone", label: "Phone Number", required: true },
    { name: "department", label: "Department", required: true },
    { name: "position", label: "Position", required: true, type: "dropdown", options: ["Intern", "Full Time", "Junior", "Senior", "Team Lead"], icon: DropdownIcon },
    { name: "joiningDate", label: "Date of Joining", required: true, type: "date", icon: CalendarIcon },
];

export const candidateFormFields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "email", label: "Email Address", required: true },
    { name: "phone", label: "Phone Number", required: true },
    { name: "position", label: "Position", required: true },
    { name: "experience", label: "Experience", required: true },
    { name: "resume", label: "Resume", required: true, type: "file", icon: UploadIcon },
];