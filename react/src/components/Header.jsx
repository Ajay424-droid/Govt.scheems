import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import { AuthContext } from "../context/AuthContext";
import Logo from '../assets/poster/logo.png'; // Make sure this path is correct

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [adminLogged, setAdminLogged] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setAdminLogged(true);
  }, []);

  const handleLogoutClick = () => {
    if (user) {
      logout();
    } else {
      localStorage.removeItem('adminToken');
      setAdminLogged(false);
      navigate('/admin-login');
    }
  };

  const toggleNav = () => setNavOpen(prev => !prev);

  return (
    <header className="header-custom">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="All In One Platform For Government Schemes"
            className="brand-logo"
          />
          <span className="brand-title ms-2">AIOPS</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNav"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/sidebar" className="nav-link">Categories</Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">About Us</Link>
            </li>
          </ul>

          <form className="d-flex mb-2 mb-lg-0 me-lg-3" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="d-flex gap-2 flex-wrap">
            {user ? (
              <>
                <Link to="/profile" className="btn btn-outline-light">Profile</Link>
                <button className="btn btn-outline-danger" onClick={handleLogoutClick}>Logout</button>
              </>
            ) : adminLogged ? (
              <>
                <Link to="/adminpage" className="btn btn-outline-light">Dashboard</Link>
                <button className="btn btn-outline-danger" onClick={handleLogoutClick}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light">Login</Link>
                <Link to="/register" className="btn btn-outline-light">Register</Link>
                <Link to="/admin-login" className="btn btn-outline-light">Admin Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
