const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  photoPath: { type: String, required: true },
  author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  authorPhotoPath: {  }
}, 
{ timestamps: true });

// Define a virtual for the username
blogSchema.virtual('username').get(function() {
  if (this.populated('author') && this.author) {
    return this.author.username;
  }
  return null;
});
blogSchema.virtual('profileImage').get(function() {
  if (this.populated('author') && this.author) {
    return this.author.profileImage;
  }
  return null;
});

// Enable virtual fields in JSON output
blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Blog', blogSchema, 'blogs');
