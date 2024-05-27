/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OTPinput() {
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(['', '', '', '']);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  
  const email = localStorage.getItem('otpEmail');
  const otp = parseInt(localStorage.getItem('otp'), 10);

  useEffect(() => {
    if (!email || !otp) {
      navigate('/login');
    }

    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [disable, navigate, email, otp]);

  function resendOTP() {
    if (disable) return;
    axios
      .post('http://localhost:5000/api/send_recovery_email', {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert('A new OTP has successfully been sent to your email.'))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join('')) === otp) {
      navigate('/reset');
      return;
    }
    alert('The code you have entered is not correct, try again or re-send the link');
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
      <div className='bg-white p-5 shadow-lg rounded' style={{ width: '600px' }}>
        <div className='mx-auto d-flex flex-column align-items-center mb-4'>
          <h3 className='text-center fs-1 fw-bolder text-black bg-white'>Email Verification</h3>
          <p className='text-center text-muted'>We have sent a code to your email {email}</p>
        </div>

        <div>
          <form>
            <div className='d-flex justify-content-center pb-4'>
              {OTPinput.map((digit, index) => (
                <input
                  key={index}
                  maxLength='1'
                  className='form-control text-center mx-1 fs-2'
                  style={{ width: '80px', height: '80px' }}
                  type='text'
                  value={digit}
                  onChange={(e) => {
                    const newOTPinput = [...OTPinput];
                    newOTPinput[index] = e.target.value;
                    setOTPinput(newOTPinput);
                  }}
                />
              ))}
            </div>

            <div className='d-flex flex-column align-items-center'>
              <button
                type='button'
                onClick={verifyOTP}
                className='btn btn-primary w-100 mb-3'
                style={{ padding: '15px' }}
              >
                Verify Account
              </button>

              <p className='text-muted mb-0'>
                Didn't receive code?{' '}
                <a
                  className={`${disable ? 'text-muted' : 'text-primary'}`}
                  style={{
                    pointerEvents: disable ? 'none' : 'auto',
                    textDecoration: disable ? 'none' : 'underline',
                    cursor: disable ? 'default' : 'pointer',
                  }}
                  onClick={resendOTP}
                >
                  {disable ? `Resend OTP in ${timerCount}s` : 'Resend OTP'}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
