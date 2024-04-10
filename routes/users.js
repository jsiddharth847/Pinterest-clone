var express = require('express');
var router = express.Router();
const plm = require("passport-local-mongoose")

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // Install bcrypt for password hashing

mongoose.connect("mongodb://127.0.0.1:27017/Pinterest");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
   
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Reference the Post model
    },
  ],
  dp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
}, {
  // Add timestamps automatically
  timestamps: true,
});

// Hash password before saving the user
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);

