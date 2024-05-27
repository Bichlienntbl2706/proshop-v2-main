import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc    Update password
// @route   PUT /api/reset/reset-password
// @access  Private

const updatePassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Tìm kiếm người dùng bằng email
    const user = await User.findOne({ email });
  
    if (user) {
      user.password = password;
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
    updatePassword
  };