import axios from 'axios';

class AccessRefreshCaller {
  static Caller = async (url, method, token, contentType) => {
    let { data } = await axios({
      method: method,
      url: url,
      validateStatus: () => true,
      headers: {
        'Content-Type': contentType,
        authorization: token,
      },
    });
    if (data.expired) {
      let { data: refresh_data } = await axios({
        method: method,
        url: url,
        validateStatus: () => true,
        headers: {
          'Content-Type': contentType,
          authorization: data.token,
        },
      });
      data = { ...refresh_data, expired: true, access: data.token };
    }
    return data;
  };
}

export default AccessRefreshCaller;
