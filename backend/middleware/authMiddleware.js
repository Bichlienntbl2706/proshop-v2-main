import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import cookies from 'cookie-parser';

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
  
//   token = req.cookies.tokenEmail; // Sử dụng tokenEmail thay vì jwt
//   console.log("token middle: ", token); // Debugging log

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded token:", decoded);

//       const user = await User.findById(decoded.userId).select('-password');
//       console.log("User found:", user);

//       if (!user) {
//         res.status(401);
//         throw new Error('Not authorized, user not found');
//       }

//       req.user = user;
//       next();
      
//     } catch (error) {
//       console.error('Token verification error:', error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.tokenEmail;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
