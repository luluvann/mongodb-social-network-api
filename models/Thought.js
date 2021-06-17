const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought Text is required',
    minLength: 1,
    maxLength: 280
  },

  createdAt: {
    type: Date,
    default:Date.now,
  },

});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;