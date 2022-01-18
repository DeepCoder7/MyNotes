import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [signUpD, setSignUpD] = useState({ name: "", email: "", password: "", cpassword: "" })
    const onChange = e => {
        setSignUpD({ ...signUpD, [e.target.name]: e.target.value });
    }
    const SubmitLog = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        if (signUpD.password == signUpD.cpassword) {
            const { name, email, password } = signUpD;
            const response = await fetch('http://localhost:8080/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            })
            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken);
                console.log(json);
                navigate('/');
            }else{
                console.log(json);
            }
        } else {
            console.log("Password isn't match");
        }
    }
    return (
        <div className='container'>
            <form onSubmit={SubmitLog}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className='form-control' name="name" id="name" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
