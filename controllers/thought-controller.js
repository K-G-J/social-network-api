const { Thought, User } = require('../models')

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const dbThoughtData = await Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1 })
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  getOneThought: async ({ params }, res) => {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.thoughtId })
        .populate({
          path: 'reactions',
          select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1 })
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' })
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  addThought: async ({ params, body }, res) => {
    try {
      const dbUserData = await User.findOne({ _id: params.userId })
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
      }
      const newThought = await Thought.create({
        ...body,
        userId: dbUserData._id,
      })
      dbUserData.thoughts.push(newThought._id)
      await dbUserData.save()
      res.json(newThought)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  addReaction: async ({ params, body }, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true },
      )
        .populate({
          path: 'reactions',
          select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1 })
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' })
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  updateThought: async ({ params, body }, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        body,
        { new: true, runValidators: true },
      )
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' })
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  deleteThought: async ({ params }, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({
        _id: params.thoughtId,
      })
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' })
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  deleteReaction: async ({ params }, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { _id: params.reactionId } } },
        { new: true, runValidators: true },
      ).populate({
        path: 'reactions',
        select: '-__v',
      })
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' })
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
}

module.exports = thoughtController
