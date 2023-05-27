import React, { useState } from 'react';
import './student.css';

function MForm() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [batch, setBatch] = useState('');
  const [branch, setBranch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { name, rollNumber, batch, branch });
    setName('');
    setRollNumber('');
    setBatch('');
    setBranch('');
  };

  return (
    <form className="my-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            value={name}
            maxLength={30}
            minLength={3}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Roll Number:
          <input
          className="form-input"
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          minLength={10}
          maxLength={10}
          required
        />
        
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Batch:
          <input
            className="form-input"
            type="text"
            value={batch}
            minLength={3}
            maxLength={4}
            onChange={(e) => setBatch(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form-group">
  <label className="form-label">
    Branch:
    <select
      className="form-input"
      value={branch}
      onChange={(e) => setBranch(e.target.value)}
      required
    >
      <option value="">Select Branch</option>
      <option value="CIC">CIC</option>
      <option value="CSM">CSM</option>
      <option value="AID">AID</option>
      <option value="CSE">CSE</option>
      <option value="CE">CE</option>
      <option value="AIM">AI&ML</option>
      <option value="ECE">ECE</option>
      <option value="ME">ME</option>
      <option value="EEE">EEE</option>
      <option value="IT">IT</option>
      <option value="CSO">CSO</option>


    </select>
  </label>
</div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
}

export default MForm;
