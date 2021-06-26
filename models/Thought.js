const { Schema, model } = require("mongoose");

const ReactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
    default:""
  },
  username: {
    type: String,
    required: "Username who created the reaction is required",
    default:""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: "Thought Text is required",
    minLength: 1,
    maxLength: 280,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  username: {
    type: String,
    required: "Username who created the thought is required",
  },

  reactions: { type: [ReactionSchema] }
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
