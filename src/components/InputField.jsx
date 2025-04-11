import React from "react";

export const InputField = ({
    label,
    name,
    value,
    onChange,
    error,
    type = "text",
    required = false,
    placeholder = "",
    colSpan = 1,
}) => {


    console.log(colSpan)
    return (
        <div className={`col-span-${colSpan}`}>
            <label className="block mb-1 text-[#43A9A2] text-sm font-medium">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full bg-[#F6F8F9] rounded-lg px-4 py-2 outline-none ${error ? "border border-red-500" : ""
                    }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
