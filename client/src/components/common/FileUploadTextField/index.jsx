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
    Icon
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

    const handleClearFile = () => {
        inputRef.current.value = '';
        setFileName('');
        setValue(name, null);
    };

    return (
        <div className="file-upload-field">
            <div className={`file-upload-wrapper ${fileName ? 'has-file' : ''} ${error ? 'error' : ''}`}>
                <label className={`file-label ${fileName ? 'float' : ''}`}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>

                <input
                    type="file"
                    name={name}
                    ref={(e) => {
                        inputRef.current = e;
                        register(name, { required });
                    }}
                    onChange={handleFileChange}
                    className="file-input"
                    style={{width : fileName ? "75%" : "85%"}}
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
