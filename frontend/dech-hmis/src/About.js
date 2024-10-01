// About.js
import React from 'react';
import './About.css'; // Optional: import CSS for styling

const About = () => {
    return (
        <div className="about-container">
            <h1 style={{ color: 'black' }}>About Us</h1>
            <p style={{ color: 'black' }}>
                Welcome to Dech Health System, where we are committed to providing the best healthcare solutions.
                Our mission is to ensure accessible and quality healthcare for everyone. 
            </p>
            <h2 style={{ color: 'black' }}>Our Mission</h2>
            <p style={{ color: 'black' }}>
                At Dech Health System, our mission is to improve the health and well-being of our patients 
                through innovative solutions and compassionate care.
            </p>
            <h2 style={{ color: 'black' }}>Our Values</h2>
            <ul>
                <li style={{ color: 'black' }}>Compassion</li>
                <li style={{ color: 'black' }}>Integrity</li>
                <li style={{ color: 'black' }}>Excellence</li>
                <li style={{ color: 'black' }}>Innovation</li>
                <li style={{ color: 'black' }}>Teamwork</li>
            </ul>
            <h2 style={{ color: 'black' }}>Meet Our Team</h2>
            <p style={{ color: 'black' }}>
                Our team consists of dedicated professionals with a wealth of experience in healthcare and technology.
            </p>
            <p style={{ color: 'black' }}>
                <strong style={{ color: 'black' }}>Penninah Nduku</strong> - CEO <br />
                <strong style={{ color: 'black' }}>Dr. Eunice Mutheu</strong> - Chief Medical Officer <br />
                <strong style={{ color: 'black' }}>Dennis Muuo</strong> - Head of Technology
            </p>
            <h2 style={{ color: 'black' }}>Contact Us</h2>
            <p style={{ color: 'black' }}>
                If you have any questions or would like to learn more about our services, feel free to <a href="/contacts">contact us</a>.
            </p>
        </div>
    );
};


export default About;
