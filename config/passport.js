const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../models/admin');
const User = require('../models/user');
const Gov = require('../models/gov');
const Bank = require('../models/bank');
const config = require('../config/database');
const SP = require('../models/sp');

module.exports = function(passport){
    let opts = {};
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;

    passport.use('admin-role', new JwtStrategy(opts, (jwt_payload, done)=>{
        //console.log(jwt_payload.data._id);
        Admin.getAdminById(jwt_payload.data._id, (err, admin)=>{
            if(err){
                return done(err, false);
            }
            if(admin){
                return done(null, admin);
            }else{
                return done(null, false);
            }
        });
    }));

    passport.use('user-role', new JwtStrategy(opts, (jwt_payload, done)=>{
        //console.log(jwt_payload.data._id);
        User.getUserById(jwt_payload.data._id, (err, user)=>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));

    passport.use('sp-role', new JwtStrategy(opts, (jwt_payload, done)=>{
        //console.log(jwt_payload.data._id);
        SP.getSPById(jwt_payload.data._id, (err, sp)=>{
            if(err){
                return done(err, false);
            }
            if(sp){
                return done(null, sp);
            }else{
                return done(null, false);
            }
        });
    }));
    passport.use('gov-role', new JwtStrategy(opts, (jwt_payload, done)=>{
        //console.log(jwt_payload.data._id);
        Gov.getGovById(jwt_payload.data._id, (err, gov)=>{
            if(err){
                return done(err, false);
            }
            if(gov){
                return done(null, gov);
            }else{
                return done(null, false);
            }
        });
    }));
    passport.use('bank-role', new JwtStrategy(opts, (jwt_payload, done)=>{
        //console.log(jwt_payload.data._id);
        Bank.getBankById(jwt_payload.data._id, (err, bank)=>{
            if(err){
                return done(err, false);
            }
            if(bank){
                return done(null, bank);
            }else{
                return done(null, false);
            }
        });
    }));
}
