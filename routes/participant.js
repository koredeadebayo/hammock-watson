/*
    Participant Management Routes 
*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Token = require('../models/token');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mailConfig = require('../config/email-setup');
const participantCtrl = require('../controller/participant');


// User Management 
    //Register
    router.post('/reg', (req, res, next) =>{
        //res.send('Register User');

        //Secret Token for each user
        //const newSecretToken = randomstring.generate();

        let newUser = new User({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           username: req.body.username,
           userId: req.body.userId,
           address: req.body.address,
           //secretToken : newSecretToken
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

            // console.log('mailTransporter');
            //Check if the user is active and ready to login
            //console.log(user.active);
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
                }else{
                    return res.json({success: false, msg:'Wrong Password'});
                }
            });
        });
    });
    
    //Verify user account by sending mail to the user. This would also be used incase the token has expired
    router.post('/verify',  (req, res, next) =>{
        const username = req.body.username;

        User.getUserByUsername(username, (err, user)=>{
            if(err)throw err;
            if(!user){
                return  res.json({success:false, message:'User not found'});
            }
            //console.log(user);
            //generate the token and 
            //Create a verification token for this user
             const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
             token.save(function (err) {
                 if (err) { 
                     return res.status(500).send({ msg: err.message }); 
                 }
             //console.log(token);
             // Send the email
            const transporter = nodemailer.createTransport(mailConfig);
            //Set mail address
            const mailOptions = { 
                from: 'victor@crestsage.com',
                to: user.email,
                subject: 'Account Verification Token',
                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/users/confirm\/?token=' + token.token + '.\n' 
            };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    return res.status(500).send({ msg: err.message }); 
                }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });

            //Creating Blockchain Identity
            participantCtrl.addUser(user);
            
            });
         });
        
    });
    
    //Confirm Token
    router.get('/confirm',  (req, res, next) =>{
        //console.log(req.query.token);
        //const url = require('url');
        //const querystring = require('querystring');



        //const token = req.body.token;
        //console.log(token);
         Token.findOne({ token: req.query.token }, function (err, token) {
             if (!token) 
                 return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
     
            // If we found a token, find a matching user
              User.findOne({ _id: token._userId }, function (err, user) {
                  if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                  if (user.active) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
     
                 // Verify and save the user
                  user.active = true;
                  user.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                      res.status(200).send("The account has been verified. Please log in.");
                  });
              });
          });

          //Add Blockchain participant to the network

    });

    //Show user profile
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
