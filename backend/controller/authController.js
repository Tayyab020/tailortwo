const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");
const JWTService = require("../services/JWTService");
const RefreshToken = require("../models/token");
const cloudinary = require('cloudinary').v2;

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {

  async register(req, res, next) {
    console.log(req.body);
    // 1. validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      // name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
      isTailor: Joi.boolean().default(false),
     
    });
    const { error } = userRegisterSchema.validate(req.body);

    // 2. if error in validation -> return error via middleware
    if (error) {
      return next(error);
    }

    // 3. if email or username is already registered -> return an error
    const { username, email, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });

      const usernameInUse = await User.exists({ username });

      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email already registered, use another email!",
        };

        return next(error);
      }

      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username not available, choose another username!",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    // 4. password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. store user data in db
    let accessToken;
    let refreshToken;

    let user;

    try {
      const userToRegister = new User({
        username,
        email,
        // name,
        password: hashedPassword,
        isTailor:false
      });

      user = await userToRegister.save();

      // token generation

      accessToken = JWTService.signAccessToken({ _id: user._id }, "300000m");
      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "600000m");

      // res.status(200).json(
      //   {
      //     message:"User created Successfully"
      //   }
      // )

    } 
    catch (error) {
      return next(error);
    }

    // store refresh token in db
    await JWTService.storeRefreshToken(refreshToken, user._id);

    // send tokens in cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    // // 6. response send

    const userDto = new UserDTO(user);

    return res.status(200).json({ user: user, auth: true });
  },
  async login(req, res, next) {
    // 1. validate user input
    // 2. if validation error, return error
    // 3. match username and password
    // 4. return response

    // we expect input data to be in such shape
    
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern),
    });

    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { username, password } = req.body;

    // const username = req.body.username
    // const password = req.body.password

    let user;

    try {
      // match username
      user = await User.findOne({ username: username });

      if (!user) {
        const error = {
          status: 401,
          message: "Invalid username",
        };

        return next(error);
      }

      // match password
      // req.body.password -> hash -> match

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const error = {
          status: 401,
          message: "Invalid password",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const accessToken = JWTService.signAccessToken({ _id: user._id }, "300000m");
    const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "600000m");

    // update refresh token in database
    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDTO(user);

    return res.status(200).json({ user: user, auth: true });
  },
  async logout(req, res, next) {
    // 1. delete refresh token from db
    const { refreshToken } = req.cookies;

    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    // delete cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    // 2. response
    res.status(200).json({ user: null, auth: false });
  },
  async refresh(req, res, next) {
    // 1. get refreshToken from cookies
    // 2. verify refreshToken
    // 3. generate new tokens
    // 4. update db, return response

    const originalRefreshToken = req.cookies.refreshToken;

    let id;

    try {
      id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    try {
      const match = RefreshToken.findOne({
        _id: id,
        token: originalRefreshToken,
      });

      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };

        return next(error);
      }
    } catch (e) {
      return next(e);
    }

    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "300000m");

      const refreshToken = JWTService.signRefreshToken({ _id: id }, "600000m");

      await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (e) {
      return next(e);
    }

    const user = await User.findOne({ _id: id });

    const userDto = new UserDTO(user);

    return res.status(200).json({ user: userDto, auth: true });
  },
  async updateProfileImage(req, res, next) {
    console.log('Updating profile image');
    const { id } = req.params;
    console.log(id);

    const { profileImage } = req.body;
    //console.log(profileImage);
    const schema = Joi.object({
        profileImage: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {
        const uploadResult = await cloudinary.uploader.upload(profileImage, { folder: 'profile_images' });
        const photoUrl = uploadResult.secure_url;

        await User.updateOne({ _id: id }, { profileImage: photoUrl });

        const user = await User.findOne({ _id: id });
        const userDto = new UserDTO(user);

        return res.status(200).json({ user: userDto, auth: true });
    } catch (error) {
        return next(error);
    }
  },
  async getProfileImage(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ profileImage: user.profileImage });
    } catch (error) {
      return next(error);
    }
  },
  async updateUserDetails  (req, res, next) {
    const userId = req.params.id;
  
    // const userUpdateSchema = Joi.object({
    //   address: Joi.string().allow(''),
    //   phoneNumber: Joi.string().allow(''),
    //   availabilityTimeFrom: Joi.string().allow(''),
    //   availabilityTimeTo: Joi.string().allow(''),
    // });
  
    // const { error } = userUpdateSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: 'Invalid data', error: error.details });
    // }
  
    const updateData = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },
  async getUserDetails(req, res, next) {
    try {
      const userId = req.user._id; // Assumes the user ID is available in the request object (set by authentication middleware)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },
};


module.exports = authController;
