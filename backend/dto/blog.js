class BlogDTO {
  constructor(blog) {
    this._id = blog._id;
    this.title = blog.title;
    this.content = blog.content;
    this.photoPath = blog.photoPath;
    this.author = blog.author._id;
    this.username = blog.author.username; // This should correctly access the populated username
    this.authorPhotoPath = blog.author.profileImage; // Add this line
  }
}
  module.exports = BlogDTO;
  