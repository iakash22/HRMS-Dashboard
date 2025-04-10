import React from "react";
import "./style.css";

const ConfirmPopup = ({
    title = "Confirm",
    message = "Are you sure?",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    isOpen,
}) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-backdrop">
            <div className="confirm-box">
                <div className="confirm-header">{title}</div>
                <div className="confirm-body">
                    <p>{message}</p>
                    <div className="confirm-actions">
                        <button className="cancel-btn" onClick={onCancel}>
                            {cancelLabel}
                        </button>
                        <button className="logout-btn" onClick={onConfirm}>
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
