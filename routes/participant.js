/*
    Participant Management Routes 
*/
const express = require('express');
const router = express.Router();
const passport = require('passport');

// User Management 
    //Register
    router.post('/user', async (req, res) =>{
        let newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            userId: req.body.userid,
            address: req.body.address,
            password: req.body.password
        });
    });
    //Authenticate
    router.get('/user', async (req, res) =>{

    });
    //Dashboard
    router.get('/user', async (req, res) =>{

    });
//Notary Management       
    //Register
    
    //Authenticate

    //Dashboard                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

//Banks Management
    //Register
    
    //Authenticate

    //Dashboard

//Agent Management
    //Register
    
    //Authenticate

    //Dashboard


module.exports = router;
