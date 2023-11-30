import React, { useState } from "react";

import Card from "../Commons/Card";
import Button from "../Commons/Button";
import InputField from "../Commons/InputField";

const SignUpForm = (props) => {
    const [usernameInput, SetUsernameInput] = useState("");
    const [passwordInput, SetPasswordInput] = useState("");
    const [passVerifyInput, SetPassVerifyInput] = useState("");
    const [emailInput, SetEmailInput] = useState("");

    const OnUsernameInputValueChange = (event) => {
        const usernameValue = event.target.value;
        SetUsernameInput(usernameValue);
    }

    const OnEmailInputValuChange = (event) => {
        const emailValue = event.target.value;
        SetEmailInput(emailValue);
    }

    const OnPasswordInputValueChange = (event) => {
        const passwordValue = event.target.value;
        SetPasswordInput(passwordValue);
    }

    const OnVerifyPasswordInputChange = (event) => {
        const passVerifyValue = event.target.value;
        SetPassVerifyInput(passVerifyValue);
    }

    const OnUserSignUp = (event) => {
        event.preventDefault();



        console.log("Create new Account");
    }

    return (
        <React.Fragment>
            <Card className="sign-in_form card-0">
                <form className="display-flex flex-column" onSubmit={OnUserSignUp}>
                    <InputField
                        className="input-0"
                        name="username"
                        label="Username"
                        value={usernameInput}
                        onChange={OnUsernameInputValueChange} />
                    <InputField
                        className="input-0"
                        name="email"
                        label="Email"
                        value={emailInput}
                        onChange={OnEmailInputValuChange} />
                    <InputField
                        className="input-0"
                        name="password"
                        label="Password"
                        value={passwordInput}
                        onChange={OnPasswordInputValueChange}
                        type="password" />
                    <InputField
                        className="input-0"
                        name="password"
                        label="Re-enter Password"
                        value={passVerifyInput}
                        onChange={OnVerifyPasswordInputChange}
                        type="password" />
                    <Button className="button-0" content="Sign up" type="submit" />
                </form>
            </Card>
        </React.Fragment>
    )
}

export default SignUpForm;