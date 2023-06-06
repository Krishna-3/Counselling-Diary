import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";

const Comment = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [comments, setComments] = useState();
  const { id } = useParams();

  const getComments = async () => {
    const response = await axiosPrivate.get(`/students/${id}/comments`);
    setComments(response.data)
  }

  const handleDelete = async (comId) => {
    const response = await axiosPrivate.delete(`/students/${id}/comments/${comId}`);
    if (response.data?.success) {
      setComments(comments.filter(comment => comment.id !== comId));
    }
  }

  useEffect(() => {
    getComments();
  }, [])

  return (
    <>
      {comments?.length ?
        (
          <div className="card" style={{
            height: '78vh',
            padding: '20px 0px',
            backgroundColor: '#f8f8f8'
          }}>
            <div className="card-body" style={{
              height: '80%',
              overflowY: 'auto'
            }}>
              {comments.map((comment, i) => {
                const comId = comment.id;
                return (
                  <div key={i}>
                    <div className="card">
                      <div className="card-body"  >
                        <p>{comment.comment}</p>
                        <i style={{ color: 'rgba(33,33,33,0.5)' }}>{
                          comment.editedOn
                            ? <p><strong>Edited on: </strong><span>{comment.editedOn.slice(0, 10)}</span></p>
                            : <p><strong>Created on: </strong><span>{comment.date.slice(0, 10)}</span></p>
                        }</i>
                        <button onClick={() => navigate(`comments/${comId}`)} className="btn btn-primary">Edit</button>&nbsp;&nbsp;&nbsp;
                        <button onClick={() => handleDelete(comId)} className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                    <br />
                  </div>
                )
              })}
            </div >
          </div>
        ) :
        <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
          <div className="card-body">
            <p>Nothing</p>
          </div>
        </div>
      }
    </>
  )
}

export default Comment