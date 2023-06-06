import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import '../styles/students.css';
import { Link } from "react-router-dom";

const Students = () => {
    const axiosPrivate = useAxiosPrivate();
    const [students, setStudents] = useState();

    const getStudents = async () => {
        const response = await axiosPrivate.get('/students');
        setStudents(response.data)
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
        <div className="data-display">
            <div className="data-columns">
                {students?.length
                    ? students.map((student, i) =>
                    (
                        <div key={i} className="data-item">
                            <Link className="link" to={student.id}>
                                <p>{student.rollNo}</p>
                            </Link>
                        </div>
                    ))
                    : <div>none</div>
                }
            </div>
        </div>
    )
}

export default Students;