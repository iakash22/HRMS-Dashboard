import React from 'react';
import { SearchIcon } from '../../../assets';
import './style.css';

const SearchBar = ({
    value,
    onChange,
    placeholder = 'Search',
    maxWidth = '300px',
    className = '',
}) => {
    return (
        <div className={`search-bar ${className}`} style={{ maxWidth }}>
            <SearchIcon className="search-icon" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;