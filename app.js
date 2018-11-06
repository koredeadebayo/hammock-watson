const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const mailConfig = require('./config/email-setup');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const cfenv = require('cfenv');// Cloud Foundry Environment Variables
const appEnv = cfenv.getAppEnv();// Grab environment variables
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo/es5')(session);
const fallback = require('express-history-api-fallback');


//Detects environment and connects to appropriate DB
if(appEnv.isLocal){
    mongoose.connect(config.database, { useNewUrlParser: true });
    sessionDB = config.database;
    console.log('Your MongoDB is running at ' + config.database);
}
//Connect to MongoDB Service on Bluemix
    else if(!appEnv.isLocal){
    mongoose.connect(config.clouddb, { useNewUrlParser: true }); // connect to our database
    sessionDB = config.clouddb;
    console.log("Your MongoDB is running at ", config.clouddb);
}
else{
    console.log('Unable to connect to MongoDB.');
}


//Set application
const app = express();

//Instantiate user
const user = require('./routes/participant');
const asset = require('./routes/asset');

const root = path.join(__dirname, "public");

//const port = process.env.PORT||8080;

//MIDDLEWARES
    //Bodyparser for accessing JSON from REST Requests
    app.use(bodyParser.json());
    //CORS for Domain protection
    app.use(cors());

    //Set static folder

    app.use(express.static(root));

    // app.use(express.static(root));
    // app.use(fallback('index.html', { root }));

    //Passport Middlware
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport')(passport);

app.use('/users', user);

// Index Route

app.use('/assets', asset);

//fallback
app.use(fallback('index.html', { root }));
// Index Route

app.get('/', (req, res) => {
    res.send('Just another end point');
  });

  /*app.get("/:page", function(req, res) {
      res.sendFile(site_public+"/"+req.params.page+".html")
  });*/



// Start Server
app.listen(appEnv.port, appEnv.bind, () => {
    console.log('Server started on port '+ appEnv.url);
  });
