import React, { useState, useContext } from 'react';
import './LogIn.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import { Toaster, toast } from 'sonner';
import Button from '../../components/UI elements/Button';

function Login() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
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
        data.data.refresh,
        data.data.role,
        data.data.department,
        true
      );
      toast.success('Đăng nhập thành công', {
        duration: 2000,
      });
      navigate(from, { replace: true });
    } else {
      toast.error('Lỗi đăng nhập, xin kiểm tra thông tin', {
        duration: 2000,
      });
    }
  };

  return (
    <React.Fragment>
      <Toaster />
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
          <div className="login--redirect" to="/">
            <div>Chưa có tài khoản?</div>
            <Link to="/signup">Đăng kí</Link>
          </div>{' '}
          <Button className="register-form__button" type="submit" content="Đăng nhập" onClick={handleSubmit} />
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
