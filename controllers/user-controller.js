const { User } = require('../models')

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const dbUserData = await User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1 })
      res.json(dbUserData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  getOneUser: async ({ params }, res) => {
    try {
      const dbUserData = await User.findOne({ _id: params.userId })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1 })
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
      }
      res.json(dbUserData)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  addUser: async ({ body }, res) => {
    try {
      const dbUserData = await User.create(body)
      res.json(dbUserData)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  addFriend: async ({ params }, res) => {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true },
      )
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
      res.json(dbUserData)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  updateUser: async ({ params, body }, res) => {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        body,
        {
          new: true,
          runValidators: true,
        },
      )
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
      }
      res.json(dbUserData)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  deleteUser: async ({ params }, res) => {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.userId })
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
      }
      res.json(dbUserData)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  deleteFriend: async ({ params }, res) => {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true },
      )
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
      }
      res.json(dbUserData)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
}

module.exports = userController
