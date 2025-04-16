import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "../../../utils/optimizers";
import "./style.css";
import Services from '../../../services/operations';
import { employeeEndPoints } from '../../../services/api';
import { useSelector } from "react-redux";
import { CrossIcon } from "../../../assets";

const CustomSearchInputField = ({ register, setValue, error, required, Icon }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const { accessToken } = useSelector(state => state.auth);
    const searchInputRef = useRef(null);

    useEffect(() => {

        if (isItemSelected) {
            setIsItemSelected(false); // Reset the flag after handling selection
            return; // Prevent API call after selection
        }

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
        setQuery(employee.fullName);
        setShowDropdown(false);
        setResults([]);
        setIsItemSelected(true);
        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
    };

    return (
        <div className="search-container">
            <div className={`search-bar ${error ? 'error' : ''}`}>
                <Icon className="search-icon" />
                <input
                    {...register("fullName", { required })}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Employee Name"
                    className="search-input"
                    onFocus={() => setShowDropdown(results.length > 0 && query.trim() !== '')}
                    ref={searchInputRef}
                />
                {query && (<CrossIcon className="clear-btn" onClick={() => setQuery("")} />)}
            </div>

            {showDropdown && (
                <ul className="dropdown">
                    {results.map((emp, idx) => (
                        <li key={idx} onClick={() => handleSelect(emp)}>
                            {emp.fullName}
                        </li>
                    ))
                    }
                </ul>
            )}
        </div>
    );
};

export default CustomSearchInputField;