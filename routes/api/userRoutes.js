const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// build route for /api/users
// Functions: Get all users, add new user
router.route('/').get(getUsers).post(createUser);

// build route for /api/users/:userId
// Functions: Get a single user, Update a specific user, Delete a specific user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// build route for /api/users/:userId/friends/:friendId
// Functions: Add a friend, delete a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;