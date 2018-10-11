/*
    Participant Management Routes 
*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');


// User Management 
    //Register
    router.post('/reg', (req, res, next) =>{
        //res.send('Register User');

        //Secret Token for each user
        const newSecretToken = randomstring.generate();

        let newUser = new User({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           username: req.body.username,
           userId: req.body.userId,
           address: req.body.address,
           secretToken : newSecretToken
         });

         
         
         User.addUser(newUser, (err, user)=>{
            if(err){
                res.json({success: false, msg: 'Falied to register the account'});
            }else{
                res.json({success: true, msg: 'User registered'});
            }
        });

        
    });
    //Authenticate - Passport-jwt enables the authentication works fluidly
    router.post('/auth', (req, res, next) =>{
        const username = req.body.username;
        const password = req.body.password;



        User.getUserByUsername(username, (err, user)=>{
            if(err)throw err;
            if(!user){
                return  res.json({success:false, message:'User not found'});
            }

            //User.confirmVerification()
            console.log(user.active);
            if(!user.active){
                return res.json({success:false, message:'User account not verified'});
            }
            User.comparePassword(password, user.password, (err, isMatch) =>{
                if(err)  throw err;
                if(isMatch){
                    const token = jwt.sign({data:user}, config.secret,{
                        expiresIn: 604800 //1 week
                    });


            res.json({
                success:true,
                token: 'JWT '+token,
                user:{
                    id:user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
                }
                else{

                    return res.json({success: false, msg:'Wrong Password'});
                }
            });
        });
    });

    router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
        res.json({user: req.user});
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
