// Contact.js
import React from 'react';
import './Contact.css'; // Optional: import CSS for styling
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons from react-icons

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <div className="contact-details">
                <div className="contact-item">
                    <FaPhone /> <span>0701526064</span>
                </div>
                <div className="contact-item">
                    <FaEnvelope /> <span>dennismuuo74@gmai.com</span>
                </div>
                <div className="contact-item">
                    <FaMapMarkerAlt /> <span>P.O.BOX 141-90134 YOANI</span>
                </div>
            </div>
            
            <h3>Send Us a Message</h3>
            <form className="contact-form">
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Message:
                    <textarea name="message" required></textarea>
                </label>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
