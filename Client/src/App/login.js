import React, { useState } from 'react';
import '../styles/form.css';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/login';

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }));
      const accessToken = response?.data?.accessToken;
      setAuth({ username, password, accessToken });
      setUsername('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        //NNo server response
      } else if (err.response?.status === 400) {
        //Missin username or password
      } else if (err.respomse?.status === 401) {
        //Unauthorized
      } else {
        //login failed
      }
    }
  };

  // const togglePersist = () => {
  //   setPersist(prev => !prev);
  // }

  // useEffect(() => {
  //   localStorage.setItem('persist', persist);
  // }, [persist])

  return (
    <div className='form'>
      <div className='d-inline-flex p-2'>
        <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
          <form className="card-body" onSubmit={handleSubmit}>

            <h2>Login</h2>

            <div className="card-body">
              <div className="input-group flex-nowrap">
                <input
                  className="form-control"
                  type="text"
                  placeholder='Username'
                  minLength={3}
                  maxLength={30}
                  autoComplete='off'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                User name required.
              </div>
            </div>

            <div className="card-body">
              <div className="input-group flex-nowrap">
                <input
                  className="form-control"
                  type="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="card-body">
              <button type="submit" className="btn btn-success">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
