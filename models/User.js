const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "username is required",
    },

    email: {
      type: String,
      unique: true,
      required: "email is required",
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendsCount").get(function () {
  let count = 0;
  for (let i = 0; i < this.friends.length; ++i) {
    count++;
  }
  return count;
});

const User = model("User", UserSchema);

module.exports = User;
