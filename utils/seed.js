const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, email, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Connected');
  // drop all existing data to prep for seeding
  await User.deleteMany({});
  await Thought.deleteMany({});
  console.log('Exiting data dropped');

  // arrays so we can populate the arrays then push to the database
  const users = [];
  const userThoughts = [];

  // build user data into users array
  for (let i = 0; i < usernames.length; i++) {
    const userObj = {
      username: usernames[i],
      email: email[i],
    };
    const newUser = await User.create(userObj);
    users.push({
      _id: newUser._id.toString(),
      username: newUser.username,
    });
  }

  // build thought data into userThoughts array
  for (let i = 0; i < thoughts.length; i++) {
    const thoughtsObj = {
      username: usernames[i],
      thoughtText: thoughts[i],
    };
    const newThought = await Thought.create(thoughtsObj);
    userThoughts.push({
      _id: newThought._id.toString(),
      username: newThought.username,
    });
  }

  // This builds users into the userThoughts array so that the data connects user/userThoughts together
  for (let i = 0; i < userThoughts.length; i++) {
    const userId = users.filter(
      (user) => user.username === userThoughts[i].username
    );
    console.log('USER ID', userId);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId[0]._id },
      { $push: { thoughts: userThoughts[i]._id } },
      { new: true }
    );
    console.log(updatedUser);
  }

  console.info('Seeding complete');

  process.exit(0);
});