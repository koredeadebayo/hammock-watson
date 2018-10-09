const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

//Set application 
const app = express();

//Instantiate user
const user = app.use();

//Set port number for rest api
var port = 3000;

//MIDDLEWARES
    //Bodyparser for accessing JSON from REST Requests
    app.use(bodyParser.json());
    //CORS for Domain protection
    app.use(cors());
    //Passport Middlware 
    app.use(passport.initialize());
    app.use(passport.session());

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });


// Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
  });