import React from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import CustomTextField from "../../customTextField";
import FileUploadField from "../FileUploadTextField";

const CustomDialogBox = ({
    edit = false,
    initialData = {},
    submitHandler,
    onClose,
    fields = defaultFields,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm({ defaultValues: initialData });

    const onSubmit = (data) => {
        submitHandler(data);
    };

    return (
        <div className="dialog-backdrop">
            <div className="dialog-box">
                <div className="dialog-header">
                    <h3>{edit ? "Edit Candidate" : "Add New Candidate"}</h3>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form className="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="dialog-grid">
                        {fields.map(({ name, label, required, type = "text", icon }, idx) => (
                            type === "file" ?
                                <FileUploadField
                                    key={idx}
                                    name={name}
                                    label={label}
                                    clearErrors={clearErrors}
                                    required={true}
                                    register={register}
                                    error={errors[name]}
                                    setValue={setValue}
                                />
                                :
                                <CustomTextField
                                    key={idx}
                                    name={name}
                                    label={label}
                                    type={type}
                                    icon={icon}
                                    register={register}
                                    required={required}
                                    error={errors[name]}
                                />
                        ))}
                    </div>

                    <div className="form-footer">
                        <label className="custom-checkbox">
                            <input type="checkbox" id="confirm" />
                            <span className="checkmark"></span>
                            I hereby declare that the above information is true to the best of my knowledge and belief
                        </label>

                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={!edit && !initialData}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomDialogBox;

// Default fields (can be overridden via props)
const defaultFields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "email", label: "Email Address", required: true },
    { name: "phone", label: "Phone Number", required: true },
    { name: "position", label: "Position", required: true },
    { name: "experience", label: "Experience", required: true },
    {
        name: "resume",
        label: "Resume",
        required: true,
        type: "file",
        icon: "📤",
    },
];