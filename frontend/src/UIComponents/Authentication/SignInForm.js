import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Card from "../Commons/Card";
import InputField from "../Commons/InputField";
import Button from "../Commons/Button";

import AuthenticationAPI from "../../APIs/AuthenticationAPI.js";

const SignInForm = (props) => {
    const navigator = useNavigate();

    const [usernameInput, SetUsernameInput] = useState("");
    const [passwordInput, SetPasswordInput] = useState("");

    const OnUsernameInputValueChange = (event) => {
        const usernameValue = event.target.value;
        SetUsernameInput(usernameValue);
    }

    const OnPasswordInputValueChange = (event) => {
        const passwordValue = event.target.value;
        SetPasswordInput(passwordValue);
    }

    const OnUserSignIn = (event) => {
        event.preventDefault();

        const UserSignInHandler = async () => {
            const result = await AuthenticationAPI.POST_SignIn(usernameInput, passwordInput);

            if (result.IsSuccess()) {
                navigator("/");
            }
        }

        UserSignInHandler();
    }

    const ClickBtnCreateNewAccount = () => {
        navigator("/signup");
    }

    return (
        <React.Fragment>
            <Card className="sign-in_form card-0">
                <div>Sign In</div>
                <form className="display-flex flex-column" onSubmit={OnUserSignIn}>
                    <InputField
                        className="input-0"
                        name="username"
                        label="Username"
                        value={usernameInput}
                        onChange={OnUsernameInputValueChange} />
                    <InputField
                        className="input-0"
                        name="password"
                        label="Password"
                        value={passwordInput}
                        onChange={OnPasswordInputValueChange}
                        type="password" />
                    <Button className="button-0" content="Sign In" type="submit" />
                    <Button className="button-0" content="Create New Account" onClick={ClickBtnCreateNewAccount} type="button" />
                </form>
            </Card>
        </React.Fragment>
    );
}

export default SignInForm;