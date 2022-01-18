import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [logDetail, setLogDetail] = useState({email:"",password:""});
    const onChange = e => {
        setLogDetail({ ...logDetail, [e.target.name]: e.target.value });
    }
    const SubmitLog = async(e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logDetail)
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate('/');
        }
    }
    return (
        <form onSubmit={SubmitLog}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login
