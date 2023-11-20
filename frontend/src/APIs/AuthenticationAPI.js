function Result(status, data, error, message) {
    this.statusCode = status;
    this.data = data;
    this.error = error;
    this.message = message;
}

export const POST_SignIn = async (username, password) => {
    function Payload(username, password) {
        this.account = username;
        this.password = password;
    }

    const payload = new Payload(username, password);

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

        return new Result(res.status, res.data, "", "");;
    } catch (error) {
        return new Result("failed", {}, error, "");
    }
}

// POST
export const POST_CreateNewAccount = async (userData) => {
    if (!userData) {
        return { status: 'fail' };
    }
    const response = await fetch('/api/v1/users/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
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
