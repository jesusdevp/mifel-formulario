import React from "react";

export const SelectField = ({
    label,
    name,
    value,
    onChange,
    options = [],
    error,
    required = false,
    placeholder = "Selecciona una opción",
    colSpan = 1,
}) => {
    return (
        <div className={`col-span-${colSpan}`}>
            <label className="block mb-1 text-[#43A9A2] text-sm font-medium">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full bg-[#F6F8F9] rounded-lg px-4 py-2 outline-none ${error ? "border border-red-500" : ""
                    }`}
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
