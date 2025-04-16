import React, { useRef, useState } from 'react';
import './style.css';
import { CrossIcon } from '../../../assets';

const FileUploadField = ({
    name,
    label,
    required,
    register,
    error,
    setValue,
    clearErrors,
    Icon,
    accept
}) => {
    const inputRef = useRef();
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setValue(name, file);
            clearErrors(name);
        }
    };

    const handleClearFile = (e) => {
        e.stopPropagation(); // Prevent click on wrapper from triggering file input
        inputRef.current.value = ''; // Reset the input value
        setFileName('');
        setValue(name, null);
    };

    const triggerFileInput = () => {
        inputRef.current.click();
    };

    return (
        <div className="file-upload-field">
            <label className={`file-label ${fileName ? 'float' : ''}`}>
                {label}
                {required && <span className="required">*</span>}
            </label>
            <div
                className={`file-upload-wrapper ${fileName ? 'has-file' : ''} ${error ? 'error' : ''}`}
                onClick={triggerFileInput} // Trigger file input on wrapper click
                style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
            >
                <input
                    type="file"
                    name={name}
                    ref={(e) => {
                        inputRef.current = e;
                        register(name, { required });
                    }}
                    onChange={handleFileChange}
                    className="file-input"
                    accept={'.pdf'}
                />
                <div className="file-display">
                    {fileName ? (
                        <>
                            <span className="file-name">{fileName}</span>
                            <CrossIcon className="icon" onClick={handleClearFile} />
                        </>
                    ) : (
                        <Icon className="icon upload" />
                    )}
                </div>
            </div>
            {error && <span className="error-msg">{label} is required</span>}
        </div>
    );
};

export default FileUploadField;