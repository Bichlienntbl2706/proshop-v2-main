import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import cookie from 'cookie-parser';
import { response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
// import {verificationEmail} from '../config/JWT.js'

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     generateToken(res, user._id);

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//     console.log(
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       })
//     );
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.isVerified) {
      // Trạng thái isVerified của người dùng là true, cho phép đăng nhập
      const token = generateToken(user._id);
      res.cookie('tokenEmail', token, { maxAge: 900000, httpOnly: true }); // Thiết lập token vào cookie
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token, // Trả về token nếu cần
      });
    } else {
      res.status(401).json({ message: 'Email not verified' });
    }
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  },
  tls: {
    rejectUnauthorized:false
  }

})


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  try {
    // Tạo emailToken trước khi tạo user
    
    // Tạo user
    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
    });
    
    if (user) {
      const emailToken = generateToken(user._id); // Hàm createToken được định nghĩa trong utils/generateToken.js
      user.emailToken = emailToken;
      user.save();
      // Gửi email xác thực
      var mailOptions  = {
        from: process.env.AUTH_EMAIL,
        to: user.email,
        subject: 'De Pureté Essential Oil Verify Email',
        // html: `<h2>${user.name}! Thanks for registering on our site</h2>
        //       <h4>Please verify your email to continue...</h4>   
        //       <a href="http://localhost:5000/api/users/verify-email?token=${user.emailToken}">Click here</a>` 
        html:  `<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>De Pureté - Verify Email</title>
        </head>
        <body>
        
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">De Pureté Essential Oil</a>
            </div>
            <p style="font-size:1.1em">Hi ${user.name},</p>
            <p>Thank you for choosing De Pureté Essential Oil. 
            <a href="http://localhost:5000/api/users/verify-email?token=${user.emailToken}">Click here</a> to complete register.</p>
            <p style="font-size:0.9em;">Regards,<br />De Pureté Essential Oil</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>De Pureté Essential Oil Inc</p>
              <p>Khu do thi FPT, Hoa Hai, Ngu Hanh Son</p>
              <p>Da Nang City</p>
            </div>
          </div>
        </div>
        </body>
        </html>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Verification email is sent to your gmail account");
        }
      });

      res.status(201).json({
        message: 'User registered successfully, please check your email to verify.',
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Error creating user');
  }
});



const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET )
}

//verifyEmail
// const verifyEmail = asyncHandler(async (req, res) => {
//   try {
//     const token = req.query.token;
//     if (!token) {
//       res.status(400).json({ message: 'Token is missing' });
//       return;
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id: decoded.userId, emailToken: token });

//     if (user) {
//       user.emailToken = null;
//       user.isVerified = true;
//       await user.save();
//       res.redirect('/login');  // Redirect to login page on success
//     } else {
//       res.status(400).json({ message: 'Invalid token' });  // Invalid token
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// Route to handle email verification
// @desc    Verify user email
// @route   GET /api/users/verify-email
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.query.token; // Lấy token từ URL
  console.log("token controller: " , token)
  if (!token) {
    res.status(400).json({ message: 'Token is missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneAndUpdate(
      { emailToken: token }, // Tìm người dùng bằng token
      { $set: { isVerified: true } }, // Cập nhật trạng thái isVerified thành true
      { new: true } // Trả về tài khoản đã được cập nhật
    );

    if (user) {
      // Chuyển hướng người dùng đến trang đăng nhập
      res.redirect('http://localhost:3000/verified');
    } else {
      res.status(400).json({ message: 'Invalid token' }); // Token không hợp lệ
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//--------------------------------------------

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyEmail
};
