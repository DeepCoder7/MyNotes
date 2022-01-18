const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const notes = require('./routes/notes');
const auth = require('./routes/auth');


connectToMongo();
const app = express()
const port = 8080;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/notes',notes);
app.use('/api/auth',auth);


app.listen(port, ()=>{
    console.log(`App listen to port - ${port}`);
})
