class BlogDetailsDTO{
    constructor(blog){
        this._id = blog._id;
        this.content = blog.content;
        this.title = blog.title;
        this.photoPath = blog.photoPath;
        this.createdAt = blog.createdAt;
        this.author = blog.author._id;
       this.username = blog.author.username;
    }
}

module.exports = BlogDetailsDTO;