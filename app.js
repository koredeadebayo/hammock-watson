const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const mailConfig = require('./config/email-setup');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

//Connect to Mongodb
mongoose.connect(config.database, { useNewUrlParser: true });

 //Checking if connection worked well
 mongoose.connection.on('connected', ()=>{
    console.log('Database successfully connected');
 });

//Checking if connection worked well
 mongoose.connection.on('error', (err)=>{
    console.log('Database error:' +err);
 });

//Set application 
const app = express();

//Instantiate user
const user = require('./routes/participant');
const asset = require('./routes/asset');

//Set port number for rest api
var port = 3000;

console.log(BusinessNetworkConnection);

//MIDDLEWARES
    //Bodyparser for accessing JSON from REST Requests
    app.use(bodyParser.json());
    //CORS for Domain protection
    app.use(cors());
    //Passport Middlware 
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport')(passport);

app.use('/users', user);
app.use('/assets', asset);
// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });


// Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
  });