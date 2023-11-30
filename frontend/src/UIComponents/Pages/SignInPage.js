import React from "react";

import SignInForm from "../Authentication/SignInForm";

import "../../Styles/Authentication.css";

const SignInPage = (props) => {
    return (
        <React.Fragment>
            <div className="page">
                <SignInForm />
            </div>
        </React.Fragment>
    )
}

export default SignInPage;