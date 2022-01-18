import React, { useContext, useState } from 'react'
import noteContext from '../context/note/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleAddNote = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
    }
    const onChange = e =>{
        setNote({...note, [e.target.name]:e.target.value});
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" onChange={onChange} value={note.tag}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
