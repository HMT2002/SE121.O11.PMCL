import { APIResponseModel } from "../Models/APIModels";

export const POST_SignIn = async (username, password) => {
    const payload = {
        account: username,
        password: password,
    };

    try {
        const response = await fetch('/api/v1/users/signin', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const res = await response.json();

        return new APIResponseModel(res.status, res.data, "", "");;
    } catch (error) {
        return new APIResponseModel(400, {}, error, "");
    }
}

// POST
export const POST_CreateNewAccount = async (password, passwordConfirm, email, username) => {
    if (passwordConfirm !== password) {
        return new APIResponseModel("failed", {}, "", "Passwords not match!");
    }

    const payload = {
        account: username,
        password: password,
        passwordConfirm: passwordConfirm,
        email: email,
    }

    try {
        const response = await fetch('/api/v1/users/signup', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json();

        return new APIResponseModel(res.status, res.data, "", "");;
    } catch (error) {
        return new APIResponseModel("failed", {}, error, "");
    }
};

// POST
export const POST_RegisterActionFormDataVersion = async (userFormData) => {
    if (!userFormData) {
        return { status: 'fail' };
    }
    const response = await fetch('/api/v1/users/signup', {
        method: 'POST',
        body: userFormData,
    });
    const data = await response.json();
    return data;
};

export const GET_CheckTokenAction = async (token) => {
    if (!token) {
        return { status: 'fail' };
    }
    const response = await fetch('/api/v1/auth/check-token', {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            Authorization: token,
        },
    });
    const data = await response.json();
    return data;
};

const AuthenticationAPI = {
    GET_CheckTokenAction,

    POST_SignIn,
    POST_CreateNewAccount,
}

export default AuthenticationAPI;
