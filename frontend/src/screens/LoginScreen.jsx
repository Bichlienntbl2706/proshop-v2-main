// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';

// import { useLoginMutation } from '../slices/usersApiSlice';
// import { setCredentials } from '../slices/authSlice';
// import { toast } from 'react-toastify';

// import bglogin from "../assets/images/bg-login.png";

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get('redirect') || '/';

//   useEffect(() => {
   
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       navigate(redirect);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//      }
//   };

//   return (
//   <div className="d-flex flex-row position-relative">
//   <div className="position-absolute top-50 start-0 translate-middle-y col-md-8 col-12 ">
//     <FormContainer>
//       <h1 className='text-center'>Sign In</h1>
//       <Form onSubmit={submitHandler} className="d-grid gap-2">
//         <Form.Group className='my-2' controlId='email'>
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='password'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button disabled={isLoading} type='submit' variant='primary'>
//           Sign In
//         </Button>

//         {isLoading && <Loader />}
//       </Form>

//       <Row className='py-3'>
//         <Col>
//           New Customer?{' '}
//           <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   </div>

//   <img src={bglogin} alt="img" className='w-100' style={{height: "700px", backgroundSize: "cover"}}/>
// </div>

//   );
// };

// export default LoginScreen;



import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import bglogin from "../assets/images/bg-login.png";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  function navigateToOtp() {
    if (email) {
      const newOTP = Math.floor(Math.random() * 9000 + 1000);
      axios
        .post("http://localhost:5000/api/send_recovery_email", {
          OTP: newOTP,
          recipient_email: email,
        })
        .then(() => {
          // console.log("otp: ", newOTP)
          localStorage.setItem('otpEmail', email);
          localStorage.setItem('otp', newOTP);
          navigate('/forgot-password');
        })
        .catch(console.log);
    } else {
      alert("Please enter your email");
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/auth', { email, password });
      dispatch(setCredentials(data));
      navigate(redirect);
    } catch (error) {
      toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="d-flex flex-row position-relative">
      <div className="position-absolute top-50 start-0 translate-middle-y col-md-8 col-12">
        <FormContainer>
          <h1 className='text-center'>Sign In</h1>
          <Form onSubmit={submitHandler} className="d-grid gap-2">
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button disabled={false} type='submit' variant='primary'>
              Sign In
            </Button>

            {false && <Loader />}
          </Form>

          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
              </Link>
            </Col>

            <Col className='' style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Link to='#' onClick={navigateToOtp}>
                Forgot Password?
              </Link>
            </Col>
          </Row>
          
        </FormContainer>
      </div>

      <img src={bglogin} alt="img" className='w-100' style={{ height: "700px", backgroundSize: "cover" }} />
    </div>
  );
};

export default LoginScreen;
