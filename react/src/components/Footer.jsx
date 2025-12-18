import React from 'react';
import '../css/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="about">
          <h3>SchemeHub</h3>
          <p>Making government schemes accessible to everyone.</p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Students</a></li>
            <li><a href="#">Farmers</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Healthcare</a></li>
          </ul>
        </div>
        <div className="connect">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 SchemeHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
