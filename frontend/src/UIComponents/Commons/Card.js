import React from "react";

import "../../Styles/Commons.css";

const Card = ({ className, children }) => {
    return (
        <React.Fragment>
            <div className={className}>
                {children}
            </div>
        </React.Fragment>
    )
}

export default Card;