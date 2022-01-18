import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [localStorage.getItem('token')])
    return (
        <div>
            This is about.
        </div>
    )
}

export default About
