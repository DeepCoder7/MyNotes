const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// ROUTE 1 : Get all the notes using : GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }catch(err){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: To POST the note using : POST "/api/notes/addnote" .Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Enter a valid email').isLength({ min: 5 }),
], async (req, res) => {
    try{
        const { title, description, tag } = req.body;
        
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    }catch(err){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenotes" .Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try{
        const {title,description,tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        // Find the note to be Updated
        let note =await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not found")}
        
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.json({note});
    }catch(err){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote" .Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
        // Find the note to be Delete
        let note =await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not found")}
        
        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({Success : "Note has been successfully deleted",note});
    }catch(err){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router