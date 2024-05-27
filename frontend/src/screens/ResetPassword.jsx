/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdatePasswordMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

export default function Reset() {
  const { email, setEmail } = useContext(RecoveryContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [updatePassword, { isLoading: loadingUpdatePassword }] = useUpdatePasswordMutation();

  useEffect(() => {
    const storedEmail = localStorage.getItem('otpEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const email = localStorage.getItem('otpEmail');
        const res = await updatePassword({ email, password }).unwrap();
        toast.success('Password changed successfully');
        navigate('/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
      <div className='bg-white p-5 shadow-lg rounded' style={{ width: '600px' }}>
        <section className="bg-gray-50">
          <div className="d-flex justify-content-center align-items-center px-6 py-8 h-screen">
            <div className="p-6 bg-white w-100">
              <h2 className="mb-4 text-xl font-bold text-center fs-1 fw-bolder text-black bg-white">
                Change Password
              </h2>
              <form onSubmit={submitHandler} className="mt-4">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-black">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label text-black">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="newsletter"
                    required
                  />
                  <label className="form-check-label" htmlFor="newsletter">
                    I accept the{' '}
                    <a
                      href="#"
                      className="text-primary-600 font-medium textDecoration-none"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <button type='submit' className="btn btn-primary w-100">
                  Reset Password
                </button>
                {loadingUpdatePassword && <Loader />}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
