import React, { useState, useContext } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [account, setAccount] = useState({
    account: '',
    password: '',
  });

  const updateAccount = (e) => {
    let fieldName = e.target.name;
    setAccount((existingValue) => ({
      ...existingValue,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    const { data } = await axios.post(
      'http://localhost:7000/api/v1/users/signin',
      {
        account: account.account,
        password: account.password,
      },
      {
        validateStatus: () => true,
        headers: {
          // authorization: 'Bearer ',
        },
      }
    );
    console.log(data);
    if (data.status === 200) {
      authCtx.OnUserLogin(
        data.data.account,
        data.data.avatar,
        data.data.username,
        data.data.token,
        data.data.role,
        data.data.department,
        true
      );

      navigate('/');
    }
  };

  return (
    <div id="login-section">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="account" value={account.account} onChange={updateAccount} placeholder="Account" />
        <br />
        <input
          type="password"
          name="password"
          value={account.password}
          onChange={updateAccount}
          placeholder="Password"
        />
        <br />
        {/* <button type="submit"><Link to="/petpage">GO</Link></button> */}
        <button onClick={handleSubmit}>GO</button>
      </form>
    </div>
  );
}

export default Login;
