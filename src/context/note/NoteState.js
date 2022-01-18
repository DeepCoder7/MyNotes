import noteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))
    useEffect(() => {
        setAuthToken(localStorage.getItem('token'));
        // eslint-disable-next-line
    }, [localStorage.getItem('token')])
    const [notes, setNotes] = useState([]);
    const host = 'http://localhost:8080/api/notes';
    // Get all Notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token" : `${[localStorage.getItem('token')]}`
                },
            });
            const NoteJson = await response.json();
            setNotes(NoteJson);
        } catch (err) {
            console.log(err);
        }
    }
    // Add a Note
    const addNote =async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token" : `${authToken}`
                },
                body: JSON.stringify({title, description, tag})
            });
            const NoteJson = await response.json();
            console.log(NoteJson);
            // setNotes(notes.concat(NoteJson));
            getNotes();
        } catch (err) {
            console.log(err);
        }
    }

    // Delete a Note
    const deleteNote = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`${host}/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token" : `${authToken}`
                },
            });
            const NoteJson = await response.json();
            console.log(NoteJson);
            getNotes();
        } catch (err) {
            console.log(err);
        }
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        try{
            const response = await fetch(`${host}/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token" : `${authToken}`
                },
                body: JSON.stringify({title, description, tag})
            });
            const NoteJson = await response.json();
            console.log(NoteJson);
            getNotes();
        }catch(err){
            console.log(err);
        }
    }
    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, authToken}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;