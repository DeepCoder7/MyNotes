import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {

    }, [location]);
    const LogOut = (e) =>{
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                            {!localStorage.getItem('token')?<>
                                <Link className='btn btn-primary mx-2' to="/login">Login</Link>
                                <Link className='btn btn-primary mx-2' to="/signup">SignUp</Link>
                            </>:<button onClick={LogOut} className='btn btn-primary mx-2'>LogOut</button>}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
