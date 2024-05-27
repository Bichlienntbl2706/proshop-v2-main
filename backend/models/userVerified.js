import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userVerificationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uniqueString: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
    },
    expiresAt: {
        type: Date,
      },
   
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('UserVerification', userVerificationSchema);

export default User;
