import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
dotenv.config();

// const loginRequired = async (req, res, next)=>{

//     const token = req.cookies['access-token'];
//     if(token){
//         const validatoken = await jwt.verify(token, process.env.JWT_SECRET);
//         if(validatoken){
//             res.user = validatoken.id;
//             next();
//         }else{
//             console.log("token expires")
//             res.redirect('/login')
//         }
//     }else{
//         console.log("token not found")
//         res.redirect('/login')
//     }
// }
const loginRequired = async (req, res, next) => {
  // Lấy token từ header
  // const token = req.cookies.jwt;
  // console.log("TOKEN login required:", token);

  // if (!token) {
  //   return res.status(401).json({ message: 'Not authorized, no token' });
  // }

  try {
    // Xác thực token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if(user.isVerified){

      next();
    }else{
      return res.status(401).json({ message: 'Email not verification! Please check email to verify.' }); 
    }

  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};



const verificationEmail = async (req, res, next) =>{
        try{
            const user = await User.findOne({ email: req.body.email})
            if(user.isVerified){
                next()
            }else{
                console.log("Please check your email to verify your account")
            }
        }catch(err){
            console.log(err);
        }
}

export {loginRequired,verificationEmail};