const { User, Thought } = require('../models');

// Get all users - Aggregate count of users
const allUsers = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

// All user Routes:
module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .populate('thoughts')
      .then(async (users) => {
        const userData = {
          users,
        };
        return res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Error: User not found.' })
          : res.json({
            user,
            allUsers: await allUsers(),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Error: User not found.' })
          : res.json({ user: 'Complete: User updated.' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete user by id
  // include BONUS: Remove a user's associated thoughts when deleted.
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Error: User not found.' })
            // ******************* include BONUS: Remove a user's associated thoughts when deleted code:
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
            // ******************* end BONUS.
      )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'Complete: User deleted, no thoughts exist to delete.' })
          : res.json({
            message: 'Complete: User and their thoughts deleted.',
          })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add friend by userId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: [req.params.friendId] } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({
            message: 'Error: No friend with that ID found.',
          })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete friend by userId
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: [req.params.friendId] } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Error: User not found.' })
          : res.json({ user: 'Complete: Friend deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};