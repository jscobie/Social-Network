const { User, Thought } = require('../models');

// Handle thought routes
module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thoughts) =>
        !thoughts
          ? res
            .status(404)
            .json({ message: 'Error: Thought not found.' })
          : res.json({
            thoughts,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'Error: thought was not created' })
          : User.findOneAndUpdate(
            { userId: req.body.userId },
            { $push: { thought: { thought: thought.thoughtText } } },
            { runValidators: true, new: true }
          )
      )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Error: User not found.' })
          : res.json({ thought: 'Complete: Thought created' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a specific thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { thoughtText: req.body.thoughtText, username: req.body.username },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'Error: Thought not found.' })
          : res.json({ thought: 'Complete: Thought updated.' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a specific thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ thoughtId: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Error: Thought not found'})
          : res.json({ message: 'Complete: Thought deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add reaction to specific thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $addToSet: { reactions: [ req.body ] } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
            message: 'Error: Thought not found.',
          })
          : res.json({ thought: 'Complete: Reaction added.' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete reaction by specific thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'Error: Thought not found.' })
          : res.json({ thought: 'Complete: Reaction removed.' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};