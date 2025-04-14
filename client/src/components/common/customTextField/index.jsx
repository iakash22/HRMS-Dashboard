import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

const CustomTextField = ({
    label,
    name,
    type = 'text',
    Icon,
    register,
    required,
    error,
    minLength = 10,
    maxLength = 15,
    onChange,
    watch,
    setValue,
    options = [], // ✅ options for dropdown
}) => {
    const value = watch(name);

    const getValidationRules = () => {
        const rules = {};
        if (required) rules.required = `${label} is required`;

        if (name === 'email') {
            rules.pattern = {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
            };
        }

        if (name === 'phone') {
            rules.validate = {
                validFormat: (val) =>
                    /^\(\d{3}\) \d{3}-\d{4}$/.test(val) ||
                    'Phone number must be in (123) 456-7890 format',
                onlyNumbers: (val) =>
                    /^[0-9()\s-]*$/.test(val) ||
                    'Phone must only contain numbers',
                minLength: (val) =>
                    val.replace(/\D/g, '').length >= minLength ||
                    `Minimum ${minLength} digits`,
                maxLength: (val) =>
                    val.replace(/\D/g, '').length <= maxLength ||
                    `Maximum ${maxLength} digits`,
            };
        }

        return rules;
    };

    // console.log("options value", value);
    const validation = register(name, getValidationRules());

    return (
        <div className="custom-textfield">
            <div className={`textfield-wrapper ${error ? 'error' : ''}`}>
                {type === 'date' ? (
                    <>
                        <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(date) => {
                                setValue(name, date, { shouldValidate: true, shouldDirty: true });
                                onChange?.({ target: { value: date } });
                            }}
                            dateFormat="dd/MM/yy"
                            className={`date-picker-input ${value ? 'filled' : ''}`}
                            calendarClassName="custom-datepicker-calendar"
                            placeholderText=" "
                            wrapperClassName="datepicker-wrapper"
                            minDate={new Date(value) || new Date()}
                        />
                        <input
                            type="hidden"
                            {...validation}
                            value={value || ''}
                            readOnly
                        />
                    </>
                ) : type === 'dropdown' ? (
                    <select
                        id={name}
                        {...validation}
                        value={value || ''}
                        onChange={(e) => {
                            validation.onChange(e);
                            onChange?.(e);
                        }}
                        className={`dropdown-input ${value ? 'filled' : ''}`}
                    >
                        <option value="" disabled hidden> </option>
                        {options.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={name}
                        type={type}
                        inputMode={name === 'phone' ? 'numeric' : 'text'}
                        value={value}
                        {...validation}
                        onChange={(e) => {
                            validation.onChange(e);
                            onChange?.(e);
                        }}
                        placeholder=" "
                    />
                )}
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
                {Icon && <span className="textfield-icon"><Icon /></span>}
            </div>
            {error && <span className="error-msg">{error.message}</span>}
        </div>
    );
};

export default CustomTextField;
