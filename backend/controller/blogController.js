const Joi = require("joi");
const fs = require("fs");
const Blog = require("../models/blog");
const {
  BACKEND_SERVER_PATH,
  CLOUD_NAME,
  API_SECRET,
  API_KEY,
} = require("../config/index");
const BlogDTO = require("../dto/blog");
const BlogDetailsDTO = require("../dto/blog-details");
const Appointment = require('../models/appointment');
const AppointmentDTO = require('../dto/appointment');
const Comment = require("../models/comment");
const path = require('path'); 
const cloudinary = require('cloudinary').v2;


// Configuration
cloudinary.config({
  cloud_name: "daybsp2pi",
  api_key: "285512611414353",
  api_secret: "F3P4Pe-DGLyjAplnf9RVLWcRLfw",
});

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {

 async create(req, res, next) {
      // Validate request body
      const createBlogSchema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().regex(mongodbIdPattern).required(),
        content: Joi.string().required(),
        photoPath: Joi.string().required(), // Ensure photo is base64 encoded
        price: Joi.number().required(),
      });
  
      const { error } = createBlogSchema.validate(req.body);
  
      if (error) {
        return next(error);
      }
  
      const { title, author, content, photoPath,price } = req.body;
  
      // Upload photo to Cloudinary
      let photoUrl;
      try {
        const uploadResult = await cloudinary.uploader.upload(photoPath, { folder: 'blog_photos' });
        photoUrl = uploadResult.secure_url;
      } catch (cloudinaryError) {
        // Handle Cloudinary upload error
        return res.status(500).json({ error: 'Failed to upload photo to Cloudinary' });
      }
  
      // Save blog in DB with Cloudinary URL
      try {
        const newBlog = new Blog({
          title,
          author,
          content,
          photoPath: photoUrl, // Store Cloudinary URL instead of local path
          price
      
        });
  
        await newBlog.save();
  
        // Populate the author field to include the username
        await newBlog.populate('author', 'username')
  
        const blogDto = new BlogDTO(newBlog);
        return res.status(201).json({ blog: blogDto });
      } catch (dbError) {
        // Handle database save error
        return res.status(500).json({ error: 'Failed to save blog to database' });
      }
  },
  async getAll(req, res, next) {
    try {
      const blogs = await Blog.find({}).populate('author', 'username profileImage');
      const blogsDto = blogs.map(blog => new BlogDTO(blog));
      return res.status(200).json({ blogs: blogsDto });
    } catch (error) {
      return next(error);
    }
  },    
  async getById(req, res, next) {
    // validate id
    // response

    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = getByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    let blog;

    const { id } = req.params;

    try {
      blog = await Blog.findOne({ _id: id }).populate("author");
    } catch (error) {
      return next(error);
    }

    const blogDto = new BlogDetailsDTO(blog);

    return res.status(200).json({ blog: blogDto });
  },
  async  update (req, res, next)  {
  const updateBlogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().regex(mongodbIdPattern).required(),
    blogId: Joi.string().regex(mongodbIdPattern).required(),
    photo: Joi.string(),
    price: Joi.number().required(),
  });

  const { error } = updateBlogSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, content, author, blogId, photo, price } = req.body;

  let blog;
  try {
    blog = await Blog.findOne({ _id: blogId });
  } catch (error) {
    return next(error);
  }

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  if (photo) {
    const previousPhoto = blog.photoPath.split('/').pop();
    // fs.unlinkSync(`storage/${previousPhoto}`);

    try {
      const response = await cloudinary.uploader.upload(photo);
      blog.photoPath = response.url;
    } catch (error) {
      return next(error);
    }
  }

  blog.title = title;
  blog.content = content;
  blog.price = price;

  try {
    await blog.save();
    return res.status(200).json({ message: 'Blog updated!' });
  } catch (error) {
    return next(error);
  }
  },
  async delete(req, res, next) {
    // validate id
    // delete blog
    // delete comments on this blog

    const deleteBlogSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = deleteBlogSchema.validate(req.params);

    const { id } = req.params;

    // delete blog
    // delete comments
    try {
      await Blog.deleteOne({ _id: id });

      await Comment.deleteMany({ blog: id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: "blog deleted" });
  },
};

module.exports = blogController;