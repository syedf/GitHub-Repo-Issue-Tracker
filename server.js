var express = require('express'), // The Api layer for our server
    app = express(),
    config = require('./config'), // configurations are loaded from here
    cookieParser = require('cookie-parser'), // lets you read cookies
    bodyParser = require('body-parser'), // lets you read JSONs' sent from POST request
    morgan = require('morgan'); // Logging Library for express

var environment = config.env || 'development';
if(environment === 'dev')
    app.use(morgan('dev')); // logging is only enabled in development mode : Change environments via config.js or set NODE_ENV to 'prod' or 'dev'
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());  // initializing of modules
app.use(cookieParser());
app.use(express.static('public')); // server will serve all file from the public folder other folders aren't visible

// generic route to detect error cases such as 404 or 500 etc
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Define Routes here
app.get('/*',function (req, res) {
    // Server index page on every request , This is done to eliminate the '#' symbol routing libraries introduce in angularjs
    res.sendFile(__dirname+'/public/index.html');
});
app.listen(config.port, function () {
    console.log('Listening to port '+config.port); // start the server and listen to port we set in config.js
});



