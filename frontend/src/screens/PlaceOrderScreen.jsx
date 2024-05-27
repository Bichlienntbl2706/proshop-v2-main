// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';
// import CheckoutSteps from '../components/CheckoutSteps';
// import Loader from '../components/Loader';
// import { useCreateOrderMutation } from '../slices/ordersApiSlice';
// import { clearCartItems } from '../slices/cartSlice';

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();

//   const cart = useSelector((state) => state.cart);

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate('/shipping');
//     } else if (!cart.paymentMethod) {
//       navigate('/payment');
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const dispatch = useDispatch();
//   const placeOrderHandler = async () => {
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         // taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       }).unwrap();
//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (err) {
//       toast.error(err);
//     }
//   };

//   return (
//     <Container>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Row>
//         <Col md={8}>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Address:</strong>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
//                 {cart.shippingAddress.postalCode},{' '}
//                 {cart.shippingAddress.country}
//               </p>
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <strong>Method: </strong>
//               {cart.paymentMethod}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {cart.cartItems.length === 0 ? (
//                 <Message>Your cart is empty</Message>
//               ) : (
//                 <ListGroup variant='flush'>
//                   {cart.cartItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x {item.price}.000 = 
//                           {(item.qty * (item.price * 100)) / 100}.000
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>{cart.itemsPrice}0 <small>VND</small></Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>{cart.shippingPrice}0 <small>VND</small></Col>
//                 </Row>
//               </ListGroup.Item>
//               {/* <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>{cart.taxPrice}0 <small>VND</small></Col>
//                 </Row>
//               </ListGroup.Item> */}
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>{cart.totalPrice}0 <small>VND</small></Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 {error && (
//                   <Message variant='danger'>{error.data.message}</Message>
//                 )}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Button
//                   type='button'
//                   className='btn-block'
//                   disabled={cart.cartItems === 0}
//                   onClick={placeOrderHandler}
//                 >
//                   Place Order
//                 </Button>
//                 {isLoading && <Loader />}
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PlaceOrderScreen;
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching cart details from the Redux store
  const cart = useSelector((state) => state.cart);

  // Using the createOrder mutation from the ordersApiSlice
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    // Redirect users if shipping address or payment method is not selected
    if (!cart.shippingAddress.address || !cart.paymentMethod) {
      navigate('/shipping');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      // Create the order using the createOrder mutation
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      // Clear cart items after placing the order
      dispatch(clearCartItems());

      // Redirect to the order confirmation page
      navigate(`/order/${res._id}`);
    } catch (err) {
      // Display error message if there's an error during order placement
      toast.error(err.message || 'An error occurred while placing the order');
    }
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        {/* Left column: Order details */}
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* Shipping address */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>{' '}
                {`${cart.shippingAddress.address}, ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
              </p>
            </ListGroup.Item>

            {/* Payment method */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>{cart.paymentMethod}
            </ListGroup.Item>

            {/* Order items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {`${item.qty} x ${item.price}.000 = ${(item.qty * item.price).toFixed(3)}0 VND`}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right column: Order summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{`${cart.itemsPrice}0 VND`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{`${cart.shippingPrice}0 VND`}</Col>
                </Row>
              </ListGroup.Item>
              {/* Tax */}
              {/* <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{`${cart.taxPrice}0 VND`}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{`${cart.totalPrice}0 VND`}</Col>
                </Row>
              </ListGroup.Item>
              {/* Error message */}
              <ListGroup.Item>
                {error && (
                  <Message variant='danger'>{error.message}</Message>
                )}
              </ListGroup.Item>
              {/* Place order button */}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
