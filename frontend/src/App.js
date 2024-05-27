import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createContext,useState  } from "react";

export const RecoveryContext = createContext();
const App = () => {
  
const [email, setEmail] = useState();
const [otp, setOTP] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <RecoveryContext.Provider
      value={{ otp, setOTP, setEmail, email }}
    >
      <ToastContainer />
      <Header />
      <main className=''>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
      </RecoveryContext.Provider>
  );
};

export default App;
