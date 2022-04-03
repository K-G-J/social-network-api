const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  addUser,
  addFriend,
  updateUser,
  deleteUser,
  deleteFriend
} = require('../../controllers/user-controller')

// GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(addUser)

 // GET one, PUT, and DELETE at /api/users/:userId
router
  .route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser)

// POST and DELETE at /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)

module.exports = router