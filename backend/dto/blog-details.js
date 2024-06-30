class BlogDetailsDTO{
    constructor(blog){
        this._id = blog._id;
        this.content = blog.content;
        this.title = blog.title;
        this.photoPath = blog.photoPath;
        this.createdAt = blog.createdAt;
        this.author = blog.author._id;
        this.price = blog.price;
       this.username = blog.author.username;
       this.authorPhotoPath = blog.author.profileImage;
    }
}

module.exports = BlogDetailsDTO;