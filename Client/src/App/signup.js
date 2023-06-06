import React, { useState } from 'react';
import '../styles/form.css';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const SIGNUP_URL = '/signup';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');

  const handleSubmit = async (e) => {
    if (password !== matchPassword) {
      console.log('passwords dont match');
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(SIGNUP_URL, JSON.stringify({ username, password, mail: email }));
      console.log(response)
      setUsername('');
      setPassword('');
      setEmail('');
      navigate('/login', { replace: true });
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

  return (
    <div className='form'>
      <div className='d-inline-flex p-2'>
        <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
          <form className="card-body" onSubmit={handleSubmit}>

            <h2>Signup</h2>

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
            </div>

            <div className="card-body">
              <div className="input-group flex-nowrap">
                <input
                  className="form-control"
                  type="email"
                  placeholder='Email'
                  autoComplete='off'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
              <div className="input-group flex-nowrap">
                <input
                  className="form-control"
                  type="password"
                  placeholder='Confirm password'
                  value={matchPassword}
                  onChange={(e) => setMatchPassword(e.target.value)}
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

export default Signup;
