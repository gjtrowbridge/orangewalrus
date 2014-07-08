var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  name: String,
  organization: String,
  description: String,
  location: String,
  cost: String,
  start_date: String,
  end_date: String,
  how_to_sign_up: String,

  created_at: { type: Date },
  updated_at: { type: Date }
});

//Adds timestamps
ActivitySchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
})

module.exports = mongoose.model('Activity', ActivitySchema);