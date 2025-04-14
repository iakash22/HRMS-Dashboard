import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "../../../utils/optimizers";
import "./style.css";
import Services from '../../../services/operations';
import { employeeEndPoints } from '../../../services/api';
import { useSelector } from "react-redux";

const CustomSearchInputField = ({ register, setValue, error, required, Icon }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const { accessToken } = useSelector(state => state.auth);

    useEffect(() => {
        if (query && query.trim()) {
            debouncedSearch(query);
        } else {
            setResults([]);
            setShowDropdown(false);
        }
    }, [query]);

    const debouncedSearch = useCallback(debounce((val) => { searchEmpoyee(val); }, 500), []);

    const searchEmpoyee = async (search) => {
        setLoading(true);
        await Services.getAndSearchOpeartion(employeeEndPoints.GET_AND_SEARCH_EMPLOYEE_API, { search, onlyFullName: true }, accessToken)
            .then((res) => {
                const employees = res?.users;
                if (employees && employees.length > 0) {
                    const resultData = employees.map((emp) => ({ employeeId: emp._id, fullName: emp?.fullName, designation: emp?.position }));
                    setResults(resultData);
                    setShowDropdown(true);
                } else {
                    setResults([]);
                    setShowDropdown(false);
                }
            }).catch(() => {
                setResults([]);
                setShowDropdown(false);
            })
            .finally(() => setLoading(false));
    }

    const handleSelect = (employee) => {
        setValue("fullName", employee?.fullName, { shouldValidate: true });
        setValue("designation", employee.designation, { shouldValidate: true });
        setValue("employeeId", employee.employeeId);
        setQuery(employee.fullName); // Update query with selected name
        setShowDropdown(false);
    };

    const handleCreateNew = () => {
        setValue("fullName", query, { shouldValidate: true });
        setValue("designation", "");
        setShowDropdown(false);
    };

    return (
        <div className="employee-search-wrapper">
            <div className={`search-input ${error ? 'error' : ''}`}>
                <Icon className="search-icon" />
                <input
                    {...register("fullName", { required })}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Employee Name"
                    onFocus={() => setShowDropdown(results.length > 0 && query.trim() !== '')}
                // onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Add a slight delay to handle clicks on dropdown items
                />
                {query && (
                    <button className="clear-btn" onClick={() => setQuery("")}>×</button>
                )}
            </div>

            {showDropdown && (
                <ul className="dropdown">
                    {results.length > 0 ? results.map((emp, idx) => (
                        <li key={idx} onClick={() => handleSelect(emp)}>
                            {emp.fullName}
                        </li>
                    )) : (
                        <li className="create-option" onClick={handleCreateNew}>
                            Create new: <strong>{query}</strong>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CustomSearchInputField;