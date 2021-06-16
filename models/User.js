const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique:true,
    trim: true,
    required: 'username is required',
  },

  email: {
    type: String,
    unique:true,
    required:'email is required',
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },

});

const User = model('User', userSchema);

module.exports = User;