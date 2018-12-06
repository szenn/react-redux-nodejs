const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true

  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = User = mongoose.model('user', UserSchema);