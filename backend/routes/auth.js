const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'InoteBook'; // It's sign value

router.get('/', async(req,res) => {
    const Users = await User.find();
    res.send(Users);
})

// ROUTE 1: Createing a User using: POST "/api/auth/createuser"
router.post('/createuser',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a valid Password').isLength({min:5})
],async(req,res)=>{
    // If there are errors, retrun Bad Request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let success = false;
    try{
        // Check whether the user with email exists already
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(500).json({error: "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass,
        });
        const data = { 
            user : {
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        success = true;
        res.json({success,authToken});

    }catch(err){
        console.error(err.message);
        res.status(500).send({success,err:"Some Error occured"});
    }
})

// ROUTE 2: Authenticate a User : POST "/api/auth/login". No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be blank').exists()
],async (req,res)=>{
    // Check whether the user with email exists already
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let success = false;
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error : "Please try to login with correct credentials"})
        }

        const payload = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        // console.log(authToken);
        success = true;
        res.json({success,authToken});
    }catch(err){
        console.error(err.message);
        res.status(500).send({success,err:"Some Error occured"});
    }
})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(err){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router