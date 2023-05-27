import React, { useState } from 'react';
import './signup.css';

function MyForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { username, email, password });
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <form className="my-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Username:
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Password:
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
}

export default MyForm;
