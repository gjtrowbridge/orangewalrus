var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// BASIC SETUP
// ===========

var mongooseConnectionURL = process.env.CONNECT || 'mongodb://localhost/ow'
mongoose.connect(mongooseConnectionURL)

//Defines port for azure deploy (and local deploy)
var port = process.env.port || 8080;

//Parses incoming form data onto request.body
app.use(bodyParser.urlencoded({ extended: true }));



// STATIC FILE SERVING
// ===================
app.use('/', express.static(__dirname + '/public'));


// ROUTES FOR API
// ==============
var router = express.Router();

//test route
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the orange walrus API!' });
});

// REGISTER ROUTES
// ===============
app.use('/api', router);


// START SERVER
// ============
app.listen(port);
console.log('Listening on port ' + port);