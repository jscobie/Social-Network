# Challenge 18 NoSQL (MongoDB): Social Network API

## Badges
[![License: CC0-1.0](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

This is a Social Network API, built so we can test NoSQL API builds. We previously learned MySQL and its Sequelize process and this project focuses on how NoSQL and MongoDB compares and how it works.

The basics behind our Social Network API is to allow us to test what would be the backend of a Social Network where users can post thoughts, people can add friends, and react to others posts.

### Required links for review and grading submission
[Github Repository Link](https://github.com/jscobie/Social-Network)<br>
[Walkthrough video of all functions working in the Heroku deployment](https://drive.google.com/file/d/1tMJ7ckVqE6uzh23eMInoEqe0Q-ZVlWzv/view)
Code snippet of BONUS requirement to delete thoughts of user so they are not orphaned (line 84 un userController.js):
```
  // Delete user by id
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
  ```

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Tests](#tests)
* [Credits](#credits)
* [Questions?](#questions)

## Installation

**1. Clone to ***your computer*** using SSH from GitHub:**
```
git clone git@github.com:jscobie/Social-Network.git
```
**2. You'll need to run to install the node required dependencies after you clone the install by running:**
```
npm i
```
**3. You will need to install MongoDB and Compass**

**4. You will need to seed the database:**
```
npm run seed
```
**6. Finally to start node server you need to type the following command:**
```
npm start
```
**7. Open Insomnia to build and test routes**

## Usage

The usage of this project is to allow myself to turn this project in for grading to the MSU Bootcamp academic grading team. Additionally this is used to showcase what I have learned in Module 18 and that I am able to apply it based on the assignment requirements and criteria.

## License
Read more about [MIT license](https://opensource.org/licenses/MIT).

## Tests

Review walkthrough animations/videos to see Insomnia testing required routes.

## Credits

Credit to the MSU Bootcamp and instructors for training and training materials to resolve some of these issues.<br>
*Programs, packages used:*<br>
[Node.js](https://nodejs.org/en/)<br>
[MongoDB](https://www.mongodb.com/)<br>
[Compass, the GUI for MongoDB](https://www.mongodb.com/products/compass)<br>
[Express](https://www.npmjs.com/package/express)<br>
[Mongoose](https://www.npmjs.com/package/mongoose)<br>
[Nodemon](https://www.npmjs.com/package/nodemon)<br>
[Eslint](https://www.npmjs.com/package/eslint)<br>
[prettier](https://www.npmjs.com/package/prettier)<br>

## Questions:
*Use the following options to contact me for questions:*<br>
[jscobie](https://github.com/jscobie)<br>
jscobie@focus-solutions.net