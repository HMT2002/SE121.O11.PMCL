import React from "react";

const Button = ({ className, content, onClick, type }) => {
    return (
        <React.Fragment>
            <button className={className} onClick={onClick} type={type}>
                {content}
            </button>
        </React.Fragment>
    )
}

export default Button;