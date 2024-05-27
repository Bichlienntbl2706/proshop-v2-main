// import asyncHandler from '../middleware/asyncHandler.js';
// import Order from '../models/orderModel.js';
// import Product from '../models/productModel.js';
// import { calcPrices } from '../utils/calcPrices.js';
// import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';
// import PayOS from '@payos/node';
// const payos = new PayOS('a7ce97e5-7c80-42ba-ae48-e8e26fae41bd', '44599fa2-1b45-44dd-a0da-e8ad2d51fcc2', 'bf45ecef4ade4829e974799f90a589b315b752542baa78c85b5df77007fa0c5c');

// // @desc    Create new order
// // @route   POST /api/orders
// // @access  Private
// const addOrderItems = asyncHandler(async (req, res) => {
//   const { orderItems, shippingAddress, paymentMethod } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error('No order items');
//   } else {
//     // NOTE: here we must assume that the prices from our client are incorrect.
//     // We must only trust the price of the item as it exists in
//     // our DB. This prevents a user paying whatever they want by hacking our client
//     // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

//     // get the ordered items from our database
//     const itemsFromDB = await Product.find({
//       _id: { $in: orderItems.map((x) => x._id) },
//     });

//     // map over the order items and use the price from our items from database
//     const dbOrderItems = orderItems.map((itemFromClient) => {
//       const matchingItemFromDB = itemsFromDB.find(
//         (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
//       );
//       return {
//         ...itemFromClient,
//         product: itemFromClient._id,
//         price: matchingItemFromDB.price,
//         _id: undefined,
//       };
//     });

//     // calculate prices
//     const { itemsPrice, shippingPrice, totalPrice } =
//       calcPrices(dbOrderItems);

//     const order = new Order({
//       orderItems: dbOrderItems,
//       user: req.user._id,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       // taxPrice,
//       shippingPrice,
//       totalPrice,
//     });

//     const createdOrder = await order.save();

//     res.status(201).json(createdOrder);
//   }
// });

// // @desc    Get logged in user orders
// // @route   GET /api/orders/myorders
// // @access  Private
// const getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.json(orders);
// });

// // @desc    Get order by ID
// // @route   GET /api/orders/:id
// // @access  Private
// const getOrderById = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate(
//     'user',
//     'name email'
//   );

//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error('Order not found');
//   }
// });

// // @desc    Update order to paid
// // @route   PUT /api/orders/:id/pay
// // @access  Private

// // const updateOrderToPaid = asyncHandler(async (req, res) => {
// //   try {
// //     const { verified, value } = await verifyPayPalPayment(req.body.id);
// //     if (!verified) throw new Error('Payment not verified');

// //     // check if this transaction has been used before
// //     const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);

// //     if (!isNewTransaction) throw new Error('Transaction has been used before');

// //     const order = await Order.findById(req.params.id);

// //     if (order) {
// //       // check the correct amount was paid
// //       console.log('Order Total Price:', order.totalPrice);
// //       console.log('PayPal Value:', value);

// //       const paidCorrectAmount = parseFloat(order.totalPrice).toFixed(2) === parseFloat(value).toFixed(2);
// //       console.log('Paid Correct Amount:', paidCorrectAmount);

// //       if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

// //       order.isPaid = true;
// //       order.paidAt = Date.now();
// //       order.paymentResult = {
// //         id: req.body.id,
// //         status: req.body.status,
// //         update_time: req.body.update_time,
// //         email_address: req.body.payer.email_address,
// //       };

// //       const updatedOrder = await order.save();
// //       res.json(updatedOrder);
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: error.message || 'Server Error' });
// //     return;
// //   }
// // });
// const verifyPayosPayment = async (paymentId) => {
//   try {
//     const paymentResult = await payos.verifyPayment(paymentId);
//     if (paymentResult.verified) {
//       return { verified: true, value: paymentResult.amount };
//     } else {
//       return { verified: false };
//     }
//   } catch (error) {
//     console.error('Error verifying PayOS payment:', error);
//     return { verified: false };
//   }
// };

// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   try {
//     console.log('Updating order to paid');
//     const { verified, value } = await verifyPayosPayment(req.body.id);
//     if (!verified) throw new Error('Payment not verified');

//     const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
//     if (!isNewTransaction) throw new Error('Transaction has been used before');

//     const order = await Order.findById(req.params.id);

//     if (order) {
//       console.log('Order found:', order);
//       console.log('Order Total Price:', order.totalPrice);
//       console.log('PayOS Value:', value);

//       const paidCorrectAmount = parseFloat(order.totalPrice).toFixed(2) === parseFloat(value).toFixed(2);
//       console.log('Paid Correct Amount:', paidCorrectAmount);

//       if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.payer.email_address,
//       };

//       const updatedOrder = await order.save();
//       console.log('Order updated:', updatedOrder);
//       res.json(updatedOrder);
//     } else {
//       res.status(404);
//       throw new Error('Order not found');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Server Error' });
//     return;
//   }
// });
// // @desc    Update order to delivered
// // @route   GET /api/orders/:id/deliver
// // @access  Private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error('Order not found');
//   }
// });

// // @desc    Get all orders
// // @route   GET /api/orders
// // @access  Private/Admin
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name');
//   res.json(orders);
// });

// export {
//   addOrderItems,
//   getMyOrders,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getOrders,
// };
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { checkIfNewTransaction } from '../utils/paypal.js'; // Hàm này có thể tái sử dụng cho PayOS
import PayOS from '@payos/node';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Khởi tạo đối tượng PayOS với API key và secret
const payos = new PayOS(
  'a7ce97e5-7c80-42ba-ae48-e8e26fae41bd',
  '44599fa2-1b45-44dd-a0da-e8ad2d51fcc2',
  'bf45ecef4ade4829e974799f90a589b315b752542baa78c85b5df77007fa0c5c'
);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Fetch products from the database
  const itemsFromDB = await Product.find({
    _id: { $in: orderItems.map((x) => x._id) },
  });

  // Map order items from client to include product details
  const dbOrderItems = orderItems.map((itemFromClient) => {
    const matchingItemFromDB = itemsFromDB.find(
      (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
    );
    return {
      ...itemFromClient,
      product: itemFromClient._id,
      price: matchingItemFromDB.price,
      _id: undefined,
    };
  });

  // Calculate prices
  const { itemsPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

  // Create order
  const order = new Order({
    orderItems: dbOrderItems,
    user: req.user._id, // Assuming user is available in req object
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  // Save order to database
  const createdOrder = await order.save();

  // Send email confirmation
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: req.user.email, // Assuming user email is available in req object
      subject: 'Order confirmation',
      html: `<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>De Pureté - Order Information</title>
        </head>
        <body>
        
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">De Pureté Essential Oil</a>
            </div>
            <p style="font-size:1.1em">Hi ${req.user.name},</p>
            <p>Thank you for choosing De Pureté Essential Oil. Please check again order information.</p>
            <p>Your name: ${req.user.name}</p>
            <p>Phone number: ${shippingAddress.postalCode}</p>
            <p>Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country}</p>
            <p>Product: ${orderItems.map(item => item.name).join(', ')}</p>
            <p style="color: #4d4dff">If there is any error in the order information, please call <strong>070 272 6839</strong> or contact our fanpage <a style="font-weight:600" href="https://www.facebook.com/tinhdaudepurete"><strong>here</strong></a>.</p>
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
        </html>

      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email is sent to the user');
  } catch (error) {
    console.error('Error sending email:', error);
  }

  // Return the created order
  res.status(201).json(createdOrder);
});


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Hàm xác minh thanh toán qua PayOS
const verifyPayosPayment = async (paymentId) => {
  try {
    console.log('Verifying PayOS payment:', paymentId);

    console.log(
      'Type of payos.verifyPayment:',
      typeof payos.verifyPaymentWebhookData
    );

    const paymentResult = await payos.verifyPaymentWebhookData(paymentId);

    console.log('Payment Result:', paymentResult);

    if (paymentResult.verified) {
      return { verified: true, value: paymentResult.amount };
    } else {
      return { verified: false };
    }
  } catch (error) {
    console.error('Error verifying PayOS payment:', error);
    return { verified: false };
  }
};

// // @desc    Update order to paid
// // @route   PUT /api/orders/:id/pay
// // @access  Private
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   try {
//     // const { verified, value } = await verifyPayosPayment(req.body);
//     // if (!verified) throw new Error('Payment not verified');

//     // console.log(typeof payos.verifyPaymentWebhookData);

//     // const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
//     // if (!isNewTransaction) throw new Error('Transaction has been used before');

//     const order = await Order.findById(req.params.id);

//     if (order) {
//       // const paidCorrectAmount = parseFloat(order.totalPrice).toFixed(2) === parseFloat(value).toFixed(2);
//       // if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.payer.email_address,
//       };

//       const updatedOrder = await order.save();

//       res.json(updatedOrder);

//     } else {
//       res.status(404);
//       throw new Error('Order not found');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Server Error' });
//     return;
//   }
// });
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    // console.log('Request body:', req.body); // Log request body

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Log order details
    // console.log('Order found:', order);

    // Cập nhật trạng thái thanh toán của đơn hàng
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      isPaid: true,
    };

    const updatedOrder = await order.save();

    // Log updated order
    console.log('Order updated:', updatedOrder);

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error in updateOrderToPaid:', error); // Log detailed error
    res.status(500).json({ message: error.message || 'Server Error' });
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
