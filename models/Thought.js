const { Schema, model, Types } = require('mongoose')
const { DateTime } = require('luxon')

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Please enter a reaction'],
      trim: true,
      maxLength: [280, 'Reaction must be less than 280 characters'],
    },
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      trim: true,
      createdAt: DateTime.now().toISO()
    },
    date: {
      type: Date,
      default: Date.now,
      get: DateTime => DateTime.toISO()
    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'Please enter a thought'],
      trim: true,
      maxLength: [280, 'Thought must be less than 280 characters'],
      minLength: [1, 'Thought must be at least 1 character'],
      createdAt: DateTime.now().toISO()
    },
    date: {
      type: Date,
      default: Date.now,
      get: DateTime => DateTime.toISO()
    },
    username: {
      type: String,
      required: [true, 'Please enter a username for the thought'],
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought
