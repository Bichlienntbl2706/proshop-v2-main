import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Lấy thông tin người dùng từ token
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        // Nếu không tìm thấy người dùng, trả về lỗi 401
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // Kiểm tra quyền truy cập vào tài nguyên
      // Ví dụ: kiểm tra quyền truy cập vào các tài nguyên chỉ admin có thể truy cập
      // if (!user.isAdmin) {
      //   res.status(403); // 403: Forbidden
      //   throw new Error('Not authorized, admin access required');
      // }

      // Gán thông tin người dùng vào request để sử dụng ở các middleware và handlers sau này
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
