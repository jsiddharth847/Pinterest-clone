const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  
  imageText: {
    type: String,
  },
  image:{
  type: String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { 
    type: Date,
    default: Date.now, // Set default to current date and time
  },
  likes: {
    type: Number,
    default: 0, // Initialize with 0 likes
  },
});

module.exports = mongoose.model('Post', postSchema);
