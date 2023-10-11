export const receiveNotiAll = (message) => {
  console.log(message);
};

export const receiveNotiMe = (message) => {
  console.log(message);
};

const SocketAPIs = {
  receiveNotiAll,
  receiveNotiMe,
};

export default SocketAPIs;
