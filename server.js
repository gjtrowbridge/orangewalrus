var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Handle incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

//Serves static pages
app.use('/', express.static(__dirname + '/public'));

//Defines port for azure deploy (and local deploy)
var port = process.env.port || 8080;


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