const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  addThought,
  addReaction,
  updateThought,
  deleteThought,
  deleteReaction
} = require('../../controllers/thought-controller');

// GET all thoughts and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)

// POST a thought at /api/thoughts/:userId
router
  .route('/:userId')
  .post(addThought)

// GET one, PUT, and DELETE at /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought)

// POST at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

// DELETE at api/thoughts/:thoughId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router