import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal';
import noteContext from '../context/note/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

Modal.setAppElement('#root');

const Notes = () => {
    const context = useContext(noteContext);
    let { notes, getNotes, editNote } = context;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [[localStorage.getItem('token')]])

    const [curNote, setCurNote] = useState({id:'', edtitle: '', eddescription: '', edtag: '' })
    const updateNote = (currentNote) => {
        setCurNote({id:currentNote._id ,edtitle: currentNote.title, eddescription: currentNote.description, edtag: currentNote.tag });
        setModalIsOpen(true);
    }
    const editNotes = e =>{
        e.preventDefault();
        // console.log(curNote);
        editNote(curNote.id,curNote.edtitle,curNote.eddescription,curNote.edtag);

        setModalIsOpen(false);
    }
    const onChange = e => {
        setCurNote({ ...curNote, [e.target.name]: e.target.value });
    }
    return (
        <>
            <AddNote />
            <Modal
                isOpen={modalIsOpen}
                style={
                    {
                        overlay: {
                            backgroundColor: 'grey'
                        },
                        content: {
                            width: '1000px',
                            left : '18%'
                        }
                    }
                }
            >
                <h2>Add a Note</h2>
                <div>
                    <div className="mb-3">
                        <label htmlFor="edtitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="edtitle" name="edtitle" aria-describedby="emailHelp" onChange={onChange} value={curNote.edtitle}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eddescription" className="form-label">Description</label>
                        <input type="text" className="form-control" id="eddescription" name="eddescription" onChange={onChange} value={curNote.eddescription}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edtag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="edtag" name="edtag" aria-describedby="emailHelp" onChange={onChange} value={curNote.edtag}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={editNotes}>Submit</button>
                    <button className='btn btn-primary mx-2' onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes && notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote}/>
                })}
            </div>
        </>
    )
}

export default Notes
