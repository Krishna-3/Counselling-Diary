import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const { id } = useParams();
  const [student, setStudent] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const getStudent = async () => {
    const response = await axiosPrivate.get(`/students/${id}`);
    setStudent(response.data)
  }

  const handleDelete = async () => {
    const response = await axiosPrivate.delete(`/students/${id}`);
    navigate('/students')
  }

  useEffect(() => {
    getStudent();
  }, [])

  return (
    <>
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="row">

          {
            student
              ? (
                <>
                  <div className="col col-lg-3">
                    <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
                      <div className="card-body">
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Roll No:</strong> {student.rollNo}</p>
                        <p><strong>Batch:</strong> {student.batch}</p>
                        <p><strong>Branch:</strong> {student.branch}</p>
                      </div>

                      <div className="card-body">
                        <button onClick={() => navigate('edit')} className="btn btn-primary">Edit</button>&nbsp;&nbsp;&nbsp;
                        <button onClick={() => navigate('new')} className="btn btn-success">New comment</button><br /><br />
                        <button onClick={handleDelete} className="btn btn-danger">Delete Student</button>
                      </div>
                    </div>
                    <br />
                  </div>

                  <div className="col col-lg-9">
                    <Outlet />
                  </div>
                </>
              ) :
              <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
                <div className="card-body">
                  <p>Nothing</p>
                </div>
              </div>
          }

        </div>
      </div >
    </>)
}

export default Student