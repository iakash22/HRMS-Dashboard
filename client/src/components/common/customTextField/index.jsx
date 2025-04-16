import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import CustomDropdownInputField from '../CustomDropdownInputField';

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
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloatLabel = isFocused || !!value;

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
                        <div className="datepicker-wrapper">
                            <DatePicker
                                selected={value ? new Date(value) : null}
                                onChange={(date) => {
                                    setValue(name, date, { shouldValidate: true, shouldDirty: true });
                                    onChange?.({ target: { value: date } });
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                dateFormat="dd/MM/yy"
                                className="date-picker-input"
                                calendarClassName="custom-datepicker-calendar"
                                placeholderText=""
                                minDate={new Date()}
                            />
                            <input
                                type="hidden"
                                {...validation}
                                value={value || ''}
                                readOnly
                            />
                        </div>
                        <label
                            className={`floating-label ${shouldFloatLabel ? 'active' : ''}`}
                            htmlFor={name}
                        >
                            {label}
                            {required && <span className="required">*</span>}
                        </label>
                    </>
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
                {type !== 'date' && <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
                }
                {Icon && <span className="textfield-icon"><Icon /></span>}
            </div>
            {error && <span className="error-msg">{error.message}</span>}
        </div>
    );
};

export default CustomTextField;
