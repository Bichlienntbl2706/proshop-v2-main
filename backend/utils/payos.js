import express from 'express';
import PayOS from "@payos/node";

const router = express.Router();

const payos = new PayOS('a7ce97e5-7c80-42ba-ae48-e8e26fae41bd', '44599fa2-1b45-44dd-a0da-e8ad2d51fcc2', 'bf45ecef4ade4829e974799f90a589b315b752542baa78c85b5df77007fa0c5c');

const generateRandomNumber = () => {
  const max = 9007199254740991; // Giới hạn cho số nguyên trong JavaScript
  return Math.floor(Math.random() * max);
};

const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/create-payment-link', async (req, res) => {
    const orderCode = generateRandomNumber();
  
    const order = {
      amount: req.body.amount * 1000,
      description: 'Thanh toan tinh dau mix',
      orderCode: orderCode,
      cancelUrl: `${YOUR_DOMAIN}/order/${req.body.orderId}?status=CANCELLED`,
      returnUrl: `${YOUR_DOMAIN}/order/${req.body.orderId}?status=PAID`,
    };
    
    try {
      const paymentLink = await payos.createPaymentLink(order);
      console.log('Payment link created:', paymentLink);
      res.redirect(303, paymentLink.checkoutUrl);
    } catch (error) {
      console.error('Error creating payment link:', error);
      res.status(500).json({ message: 'Error creating payment link', error: error.message });
    }
    
  });
export default router;
