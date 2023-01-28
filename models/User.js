const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        // regex for checking is a valid email address is here
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Enter valid email address!',
      ],
    },
    // Build array of _id's of thoughts related
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    // Build array of _ids of friends of users
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize the User model
const User = model('user', userSchema);

module.exports = User;