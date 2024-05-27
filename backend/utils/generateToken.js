// import jwt from 'jsonwebtoken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   // Set JWT as an HTTP-Only cookie
//   // 2 comments phía dưới dùng khi build sản phẩm
//   // res.cookie('jwt', token, {
//   //   httpOnly: true,
//   //   secure: process.env.NODE_ENV !== 'development', //false,
//   //   sameSite: 'strict', //'None',
//   //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   // });
//   res.cookie('jwt', token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production', // Ensure secure in production
//   sameSite: 'Strict', // Adjust based on your requirements
//   maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
// });
//   return token;
// };

// export default generateToken;
import jwt from 'jsonwebtoken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
  // res.cookie('jwt', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'Strict',
  //   maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
  // });
  
  // return token;
// };

export default generateToken;

