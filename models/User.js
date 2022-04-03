const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter a username'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'invalid email'],
    trim: true
  },
})


// email
  // - String
  // - Required
  // - Unique
  // - Must match a valid email address (look into Mongoose's matching validation)

// thoughts
  // - Array of _id values referencing the Thought model
  // - friends
  // - Array of _id values referencing the User model (self-reference)


// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.