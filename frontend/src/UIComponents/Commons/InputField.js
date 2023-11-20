import React from "react";

const InputField = ({ className, name, label, value, onChange, type }) => {
    return (
        <React.Fragment>
            <div>{label}</div>
            <input
                className={className}
                name={name}
                value={value}
                onChange={onChange}
                type={type} />
        </React.Fragment>
    )
}

export default InputField;