const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
// Functions: Get all thoughts, add a thought
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// Functions: Get single thought, update a specific thought, delete a specific thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// Functions: Add a reaction, delete a reaction
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;