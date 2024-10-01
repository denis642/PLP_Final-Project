// Footer.js
import React from 'react';
import './Footer.css'; // Optional: import CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Dech Health System. All rights reserved.</p>
        <nav className="footer-nav">
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contacts">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
