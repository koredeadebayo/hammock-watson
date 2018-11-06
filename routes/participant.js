/*
    Participant Management Routes
*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admin');
const User = require('../models/user');
const SP =  require('../models/sp');
const Gov = require('../models/gov');
const Bank = require('../models/bank');
const Token = require('../models/token');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mailConfig = require('../config/email-setup');
const participantCtrl = require('../controller/participant');

//Admin Management
    //Register
    router.post('/adminreg', (req, res, next)=>{
        let newAdmin = new Admin({
            name: "hammock-admin",
            password: "WatsonBuild2018"
        });

        Admin.addAdmin(newAdmin, (err, admin)=>{
            if(err){
                res.json({success:false, msg:'Admin not Created'});
            }else{
                res.json({success:true, msg:'Admin Created Successfully'});
            }
        });
    });
    //Authentication 
    router.post('/adminauth', (req, res, next)=>{
        const name = req.body.username;
        const password = req.body.password;

<<<<<<< HEAD
    //Register
    router.post('/register', (req, res, next) =>{
        //res.send('Register User');
        //Secret Token for each user
=======
        Admin.getAdminByName(name, (err, admin)=>{
            if(err) throw err;

            if(!admin){
                return res.json({success: false, msg:'Admin not found'});
            }

            Admin.comparePassword(password, admin.password, (err, isMatch)=>{
                if (err) throw err;
                if(isMatch){
                    const token = jwt.sign({data: admin}, config.secret,{
                        expiresIn: 604800 // 1 Week
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user:{
                            id: admin._id,
                            name: admin.name
                        }
                    });
                }else{
                    return res.json({success: false, msg:'Wrong Password'})
                }
            });
        });
    });
    
    

// User Management

    //Register
    router.post('/register', (req, res, next) =>{

>>>>>>> 8c4d989ab2a15cd1b8ed448108a574be080d73bb
        const newUserId = randomstring.generate(12);

        let newUser = new User({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           username: req.body.username,
<<<<<<< HEAD
           userId: newUserId,
           //address: req.body.address,
           //secretToken : newSecretToken
        });
=======
           userId: newUserId
         });
>>>>>>> 8c4d989ab2a15cd1b8ed448108a574be080d73bb

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
                            email: user.email,
                            userId: user.userId
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
            //Create a verification token for this user
             const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
             token.save(function (err) {
                 if (err) {
                     return res.status(500).send({ msg: err.message });
                 }
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
            });
         });
    });

    //Confirm Token
    router.get('/confirm', async  (req, res) =>{
         Token.findOne({ token: req.query.token }, function (err, token) {
             if (!token)
                 return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });

            // If we found a token, find a matching user
              User.findOne({ _id: token._userId }, function (err, user) {
                  if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                  if (user.active) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

                  //Add Blockchain participant to the network
                  let result = participantCtrl.addUser(user, (err)=>{
                    if (err) throw err;
                    user.active = true;
                    user.save();
                    res.status(200).send({msg:"The account has been verified. Please log in."})
                  });
              });
          });

    });

    //List All users
<<<<<<< HEAD


    //router.get('/list',  async (req, res) => {});
        //List all approve properties

    router.get('/list',  async (req, res) => {
        //List all approve properties
=======
    router.get('/list', passport.authenticate('admin-role', {session:false}),  async (req, res) => {
        //List all approve properties     
>>>>>>> 8c4d989ab2a15cd1b8ed448108a574be080d73bb
        User.find( function(err, users) {
            if (err) throw err;
            res.json({success: true, msg: users});
        });

    });

    //Get user with username
<<<<<<< HEAD
    router.get('/list/:username',  async (req, res) => {
        //List all approve properties
        const username = req.params.username;

        User.find({active:true, username:username}, function(err, user) {
=======
    router.get('/list/:username', passport.authenticate('admin-role', {session:false}), async (req, res) => {
        //List all approve properties 
        const username = req.params.username;
        
        User.find({username:username}, function(err, user) {
>>>>>>> 8c4d989ab2a15cd1b8ed448108a574be080d73bb
            if (err) throw err;
            res.json({success: true, msg: user});
        });

    });

    //Show user profile
    router.get('/profile', passport.authenticate('user-role', {session:false}), (req, res, next) => {
        res.json({user: req.user});
    });

    //Dashboard
    router.get('/user', async (req, res) =>{

    });
    
    //Credit the 
    router.post('/credituser', passport.authenticate('admin-role', {session:false}), (req, res, next)=>{
        const username = req.body.username;
        const creditamount = req.body.creditamount;

        User.getUserByUsername(username, (err, user)=>{
            if (err) throw err;
            if(user){
                user.balance = creditamount;
                participantCtrl.creditUser(user);
                res.json({success:true, msg:'Successful, '+ username +' credited with '+ creditamount});
            }
        });
    });


    //Sevice Provider Management
    //Register
    router.post('/spreg', (req, res, next) =>{

        let newSP= new SP({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           businessname: req.body.businessname,
           username: req.body.username,
           userId: req.body.userId,
           categories: req.body.categories,
           businessreg: req.body.businessreg,
<<<<<<< HEAD
           //secretToken : newSecretToken
        });
=======
         });
>>>>>>> 8c4d989ab2a15cd1b8ed448108a574be080d73bb



        SP.addSP(newSP, (err, sp)=>{
            if(err){
                res.json({success: false, msg: 'Falied to register the account'});
            }else{
                res.json({success: true, msg: 'Service Provider registered'});
            }
        });

    });
    //Authenticate - Passport-jwt enables the authentication works fluidly
    router.post('/spauth', (req, res, next) =>{
        const username = req.body.username;
        const password = req.body.password;



        SP.getSPByUsername(username, (err, sp)=>{
            if(err)throw err;
            if(!sp){
                return  res.json({success:false, message:'Service Provider not found'});
            }

            SP.comparePassword(password, sp.password, (err, isMatch) =>{
                if(err)  throw err;
                if(isMatch){
                        const token = jwt.sign({data:sp}, config.secret,{
                            expiresIn: 604800 //1 week
                        });
                    res.json({
                        success:true,
                        token: 'JWT '+token,
                        sp:{
                            id:sp._id,
                            name: sp.name,
                            username: sp.username,
                            email: sp.email,
                            businessname: sp.businessname
                            }
                        });
                }else{
                    return res.json({success: false, msg:'Wrong Password'});
                }
            });
        });
    });
    //Authenticate

    //Dashboard
    //Show Service Providers profile
    router.get('/spprofile', passport.authenticate('sp-role',{session:false}), (req, res, next) => {
        res.json({sp: req.sp});
    });



//Goverment Management
    //Register
    router.post('/addgov', passport.authenticate('admin-role', {session:false}), (req, res, next) =>{

        let newGov = new Gov({
           govId: req.body.govId,
           name: req.body.name,
           password: req.body.password,
           govRate: req.body.govRate
        });



        Gov.addGov(newGov, (err, gov)=>{
            if(err){
                res.json({success: false, msg: 'Falied to register the Government account'});
            }else{
                participantCtrl.addGov(gov);
                res.json({success: true, msg: 'Government registered'});
            }

        });
    });

    //Authenticate
    router.post('/govauth', (req, res, next) =>{
        const name = req.body.name;
        const password = req.body.password;



        Gov.getGovByName(name, (err, gov)=>{
            if(err)throw err;
            if(!gov){
                return  res.json({success:false, message:'Government not found'});
            }

            Gov.comparePassword(password, gov.password, (err, isMatch) =>{
                if(err)  throw err;
                if(isMatch){
                        const token = jwt.sign({data:gov}, config.secret,{
                            expiresIn: 604800 //1 week
                        });

                    res.json({
                        success:true,
                        token: 'JWT '+token,
                        user:{
                            id:gov._id,
                            name: gov.name,
                            govId: gov.govId                            }
                        });
                }else{
                    return res.json({success: false, msg:'Wrong Password'});
                }
            });
        });
    });

    //Dashboard


    //Bank Management
    //Register
    router.post('/addbank', passport.authenticate('admin-role', {session:false}), (req, res, next) =>{

        //Secret Token for each user
        const newBankId = randomstring.generate(10);

        let newBank = new Bank({
           bankId: newBankId,
           bankname: req.body.bankname,
           username: req.body.username,
           password: req.body.password
         });



         Bank.addBank(newBank, (err, bank)=>{
            if(err){
                //console.log(err);
                res.json({success: false, msg: 'Falied to register the Bank account'});
            }else{
                participantCtrl.addBank(bank);
                res.json({success: true, msg: 'Bank registered'});
            }
        });
    });

    //Authenticate
    router.post('/bankauth', (req, res, next) =>{
        const username = req.body.username;
        const password = req.body.password;

        Bank.getBankByUsername(username, (err, bank)=>{
            if(err)throw err;
            if(!bank){
                return  res.json({success:false, message:'Bank not found'});
            }

            Bank.comparePassword(password, bank.password, (err, isMatch) =>{
                if(err)  throw err;
                if(isMatch){
                        const token = jwt.sign({data:bank}, config.secret,{
                            expiresIn: 604800 //1 week
                        });

                    res.json({
                        success:true,
                        token: 'JWT '+token,
                        user:{
                            id:bank._id,
                            username: bank.username,
                            bankname: bank.bankname
                            }
                        });
                }else{
                    return res.json({success: false, msg:'Wrong Password'});
                }
            });
        });
    });

    //Dashboard


module.exports = router;
