import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import CustomTextField from "../customTextField";
import FileUploadField from "../FileUploadTextField";
import { toUSFormat, toNormalFormat } from "../../../utils/helper";
import CustomSearchInputField from "../CustomSearchInputField";
import { CrossIcon } from '../../../assets';
import CustomDropdownInputField from "../CustomDropdownInputField";

const CustomDialogBox = ({
    title = "",
    initialData = {},
    submitHandler,
    onClose,
    fields,
    confirmBox,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        setValue,
        clearErrors,
        watch,
        getValues,
    } = useForm({
        defaultValues: {
            ...initialData,
            phone: initialData?.phone ? toUSFormat(initialData.phone) : "",
        },
        mode: "onChange",
    });

    const onSubmit = (data) => {
        const formattedData = { ...data };
        if (data.phone) {
            formattedData.phone = toNormalFormat(data.phone); // convert to 1234567890
        }
        submitHandler(formattedData, setLoading);
    };

    const handlePhoneChange = (e) => {
        const rawValue = e.target.value;
        const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 10); // Max 10 digits
        const formatted = toUSFormat(digitsOnly);
        setValue('phone', formatted, { shouldValidate: true });
    };

    return (
        <div className="dialog-backdrop">
            <div className="dialog-box">
                <div className="dialog-header">
                    <h3>{title}</h3>
                    <button className="close-btn" onClick={onClose}>
                        <CrossIcon style={{ color: "white" }} />
                    </button>
                </div>

                <form className="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="dialog-grid">
                        {fields.map(({ name, label, required, type = "text", icon, options }, idx) =>
                            type === "file" ? (
                                <FileUploadField
                                    key={idx}
                                    name={name}
                                    label={label}
                                    clearErrors={clearErrors}
                                    required={required}
                                    register={register}
                                    error={errors[name]}
                                    setValue={setValue}
                                    Icon={icon}
                                />
                            ) :
                                type === "search" ? (
                                    <CustomSearchInputField
                                        error={errors[name]}
                                        register={register}
                                        required={required}
                                        setValue={setValue}
                                        key={idx}
                                        Icon={icon}
                                    />
                                )
                                    :
                                    type === 'dropdown' ? (
                                        <CustomDropdownInputField
                                            key={idx}
                                            label={label}
                                            name={name}
                                            required={required}
                                            error={errors[name]}
                                            options={options}
                                            register={register}
                                            setValue={setValue}
                                            watch={watch}
                                            Icon={icon}
                                        />
                                    )
                                        :
                                        (
                                            <CustomTextField
                                                key={idx}
                                                name={name}
                                                label={label}
                                                type={type}
                                                Icon={icon}
                                                register={register}
                                                required={required}
                                                error={errors[name]}
                                                watch={watch}
                                                setValue={setValue}
                                                options={options}
                                                onChange={name === "phone" ? handlePhoneChange : undefined}
                                            />
                                        )
                        )}
                    </div>

                    <div className="form-footer">
                        {confirmBox && (
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="confirm"
                                    name="confirm"
                                    {...register("confirm", { required: true })}
                                />
                                <span className="checkmark"></span>
                                I hereby declare that the above information is true to the best of my knowledge and belief
                            </label>
                        )}

                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={loading || !isValid || !isDirty}
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
