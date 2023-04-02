const { Schema, model } = require('mongoose');
const validator = require('validator')


// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'invalid email']

    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })
const User = model('user', userSchema);

module.exports = User;