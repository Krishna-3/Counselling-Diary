import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/form.css'

function CommentEditForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const { id, comId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(`/students/${id}/comments/${comId}`, JSON.stringify({ data: text }));
      console.log(response)
      navigate(`/students/${id}`)
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    try {
      const response = await axiosPrivate.get(`/students/${id}/comments/${comId}`);
      setText(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getComments();
  }, [])

  return (
    <div className='form'>
      <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
        <form className="card-body" onSubmit={handleSubmit}>

          <div className="card-body">
            <div className="input-group flex-nowrap">
              <div className="form-floating">
                <textarea
                  value={text}
                  className='form-control'
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  autoFocus
                />
                <label htmlFor="floatingTextarea">Comment</label>
              </div>
            </div>
          </div>

          <div className="card-body">
            <button onClick={() => navigate(`/students/${id}`)} className="btn btn-success">go back</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CommentEditForm;
