import React, { useState, useRef, useEffect } from "react";
import "./style.css";

const ActionMenuDots = ({ actions = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => {
        if (!isOpen) {
            const rect = menuRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setDropUp(spaceBelow < 150); // threshold for menu height
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="action-menu-container" ref={menuRef}>
            <button className="action-menu-button" onClick={toggleMenu}>
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
            </button>

            {isOpen && (
                <div className={`action-menu-popup ${dropUp ? "drop-up" : ""}`}>
                    {actions.map((action, idx) => (
                        <div
                            key={idx}
                            className="action-menu-item"
                            onClick={() => {
                                action.handler();
                                setIsOpen(false);
                            }}
                        >
                            {action.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActionMenuDots;
