import { Outlet, useNavigate, Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';

function Layout() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();
    const style = {
        backgroundColor: '#f8f8f8'
    }

    const signout = async () => {
        await logout();
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={style}>
                <div className="container-fluid">
                    <Link className='navbar-brand' to="/">Diary</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {!auth?.username
                                ? <>
                                    <li className="nav-item"><Link className="nav-link active" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/signup">Signup</Link></li>
                                </>
                                : <>
                                    <li className="nav-item"><Link className="nav-link active" to="/students">Students</Link></li>
                                    <li className="nav-item"><Link className="nav-link active" to="/students/new">Create Student</Link></li>
                                    <li className="nav-item"><button className="nav-link active" onClick={signout}>Logout</button></li>
                                </>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;