import React, {useEffect,useContext} from 'react'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/note/noteContext'

const Home = () => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { authToken } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [authToken])

    return (
        <div>
            <Notes />
        </div>
    )
}

export default Home
