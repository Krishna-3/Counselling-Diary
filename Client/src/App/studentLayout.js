import { Outlet, useLocation, Navigate, } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const StudentLayout = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.username
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default StudentLayout