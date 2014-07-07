var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Activity = require('./app/models/activity');

// BASIC SETUP
// ===========

var mongooseConnectionURL = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/ow'
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

//Handles interactions for single activities
router.route('/activity/:activity_id')

  .get(function(req, res) {
    //Find activity
    Activity.findById(req.params.activity_id, function(err, activity) {
      
      //Return errors if necessary
      if (err) {
        res.send(err);
        return;
      }

      //Else returns activity object (JSON)
      res.json(activity);
    });
  })

  .put(function(req, res) {
    //Find activity
    Activity.findById(req.params.activity_id, function(err, activity) {

      //Return errors if necessary
      if (err) {
        res.send(err);
        return;
      }

      //Else update activity name
      activity.name = req.body.name;

      //Save activity
      activity.save(function(err) {

        //Return errors if necessary
        if (err) {
          res.send(err);
          return;
        }

        //Return message on success
        res.json({ message: 'Activity updated: ' + activity._id });
      });
    });
  })

  .delete(function(req, res) {
    Activity.remove({
      _id: req.params.activity_id
    }, function(err, activity) {
      //Return errors if necessary
      if (err) {
        res.send(err);
        return;
      }

      //Return message on success
      res.json({ message: 'Successfully deleted' });
    });
  });

//Handles interactions at /api/activities
router.route('/activities')
  
  //Handles querying of all activities
  .get(function(req, res) {
    Activity.find(function(err, activities) {
      
      //Return errors if necessary
      if (err) {
        res.send(err);
        return;
      }

      //Return array of activity objects (JSON format)
      res.json(activities);
    });
  })

  //Handles creation of new activities
  .post(function(req, res) {

    //Create activity
    var activity = new Activity();
    activity.name = req.body.name;

    //Save activity
    activity.save(function(err, activity) {
      //Return errors if necessary
      if (err) {
        res.send(err);
        return;
      }

      //Return message on success
      res.json({ message: 'Activity created: ' + activity._id });
    });

  });


// REGISTER ROUTES
// ===============
app.use('/api', router);


// START SERVER
// ============
app.listen(port);
console.log('Listening on port ' + port);