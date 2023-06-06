import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/form.css';

function StudentEditForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [batch, setBatch] = useState('');
  const [branch, setBranch] = useState('');
  const [res, setRes] = useState();

  const getStudent = async () => {
    try {
      const response = await axiosPrivate.get(`/students/${id}`);
      setName(response.data.name);
      setRollNumber(response.data.rollNo);
      setBatch(response.data.batch);
      setBranch(response.data.branch);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getStudent();
  }, [])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosPrivate.put(`/students/${id}`, JSON.stringify({ name, rollNo: rollNumber, batch, branch }));
      setRes(response);
      setName('');
      setRollNumber('');
      setBatch('');
      setBranch('');
      navigate(`/students/${id}`);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='form'>
      <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
        <form className="card-body" onSubmit={handleSubmit}>

          <h2>Edit student</h2>

          <div className="card-body">
            <div className="input-group flex-nowrap">
              <input
                className="form-control"
                type="text"
                placeholder='Name'
                value={name}
                maxLength={30}
                minLength={3}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="card-body">
            <div className="input-group flex-nowrap">
              <input
                className="form-control"
                type="text"
                placeholder='Roll Number'
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                minLength={10}
                maxLength={10}
                required
              />
            </div>
          </div>
          <div className="card-body">
            <div className="input-group flex-nowrap">
              <input
                className="form-control"
                type="text"
                placeholder='Batch'
                value={batch}
                minLength={3}
                maxLength={3}
                onChange={(e) => setBatch(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="card-body">
            <div className="input-group flex-nowrap">
              <select
                className="form-select"
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
            </div>
          </div>

          <div className="card-body">
            <button onClick={() => navigate(`/students`)} className="btn btn-primary">go back</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentEditForm;
