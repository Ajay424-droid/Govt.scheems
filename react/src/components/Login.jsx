import React, { useState, useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import userApi from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailAddr, setEmailAddr] = useState('');
  const [pwd, setPwd] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // prevent default form reload

    try {
      // 1. Get CSRF token first (backend requires it)
      const csrf = await userApi.getCsrfToken();

      // 2. Try login with creds and token
      const res = await userApi.login({ email: emailAddr, password: pwd }, csrf);

      const { token, user } = res;

      // debug logs - can be removed later
      console.log("Login Success ✅");
      console.log("Token:", token);
      console.log("User Info:", user);

      // 3. Store user in context and redirect
      login({ token, user });
      navigate('/profile');
    } catch (err) {
      // basic error handling for now
      const errMsg = err.response?.data?.error || err.message;
      console.error('Login failed ❌:', errMsg);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleLogin}
        className="w-50 w-sm-30 w-md-35 p-5 rounded shadow-lg"
        style={{ backgroundColor: '#1e3c72' }}
      >
        <h2 className="text-center text-white mb-4">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label text-white">Email Address</label>
          <div className="input-group">
            <span className="input-group-text" style={{ backgroundColor: '#1e3c72', color: '#fff' }}>
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              value={emailAddr}
              onChange={(e) => setEmailAddr(e.target.value)}
              placeholder="Enter your email"
              className="form-control"
              style={{ borderColor: '#6F4F9F' }}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label text-white">Password</label>
          <div className="input-group">
            <span className="input-group-text" style={{ backgroundColor: '#1e3c72', color: '#fff' }}>
              <FaLock />
            </span>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter your password"
              className="form-control"
              style={{ borderColor: '#6F4F9F' }}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-100 py-2"
          style={{ backgroundColor: '#1e3c72', color: '#fff', borderRadius: '25px' }}
        >
          Login
        </button>

        {/* TODO: Add 'Forgot Password?' link here later */}

        {/* Register Prompt */}
        <div className="mt-3 text-center">
          <small className="text-white">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-decoration-none" style={{ color: '#F5C6A5' }}>
              Register here
            </a>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
