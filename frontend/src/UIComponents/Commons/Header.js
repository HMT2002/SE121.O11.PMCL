import React from "react";

import Card from "./Card";

const Header = (props) => {
    return (
        <React.Fragment>
            <Card className="card-0 header">
                <img className="logo" src="logo192.png" alt="Logo" />
                {props.children}
            </Card>
        </React.Fragment>
    )
}

export default Header;