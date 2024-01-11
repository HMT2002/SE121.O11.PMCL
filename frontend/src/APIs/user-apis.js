import axios from 'axios';
export const GETUserInfoAction = async (account, token) => {
  if (account == null || token == null) return { status: 'fail' };

  const response = await fetch('/api/v1/users/' + account, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  return data;
};

export const GETUserInfoTokenAction = async (token, refresh) => {
  if (token == null || refresh === null) return null;
  try {
    const { data } = await axios({
      method: 'get',
      url: '/api/v1/users/token',
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
        refresh: refresh,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const POSTUploadAvatarAction = async (formData) => {
  if (formData == null) return { status: 'fail' };

  const response = await fetch('/api/v1/users/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  //   console.log(data);
  return data;
};

const POSTUpdateUserInfo = async (account, token, payload) => {
  if (account == null || token == null) return { status: 'fail' };
  const response = await fetch('/api/v1/change-password', {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  //   console.log(data);
  return data;
};

const PATCHChangeUserPassword = async (account, token, payload) => {
  if (account == null || token == null) return { status: 'fail' };
  const response = await fetch('/api/v1/change-password', {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  //   console.log(data);
  return data;
};

const PATCHUpdateUserInfo = async (account, token, payload) => {
  if (account == null || token == null) return { status: 'fail' };
  const response = await fetch('/api/v1/users/', {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: token,
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  //   console.log(data);
  return data;
};

const POSTRequestUpgradeAccount = async (account, token, payload) => {
  console.log(token);
  const response = await fetch('/api/v1/users/' + account + '/request-upgrade', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  //   console.log(data);
  return data;
};

const GETUpgradeRequestByAccount = async (account, token) => {
  const response = await fetch('/api/v1/users/get-upgrade-request/' + account, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  return data;
};

const POSTAcceptRequestUpgrade = async (account, token, payload) => {
  const response = await fetch('/api/v1/users/' + account + '/accept-upgrade', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  return data;
};

export const GETUserByIdAction = async (id) => {
  const response = await fetch('/api/v1/users/id/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: token
    },
  });

  if (response.status == null || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  return data;
};

const UserAPIs = {
  GETUserInfoAction,
  POSTUploadAvatarAction,
  POSTUpdateUserInfo,
  GETUpgradeRequestByAccount,
  POSTRequestUpgradeAccount,
  POSTAcceptRequestUpgrade,
  GETUserByIdAction,
  PATCHChangeUserPassword,
  PATCHUpdateUserInfo,
  GETUserInfoTokenAction,
};

export default UserAPIs;
