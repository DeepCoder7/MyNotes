import React, {useContext} from 'react'
import noteContext from '../context/note/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { deleteNote } = context;
    const { _id, title, description, tag } = props.note;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(_id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                    </div>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
