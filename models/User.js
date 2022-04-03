const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Please enter a username'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter an email'],
      validate: [isEmail, 'invalid email'],
      trim: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  },
)

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;
