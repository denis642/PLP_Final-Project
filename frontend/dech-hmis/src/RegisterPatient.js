import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function PatientRegister() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',   // Add email to formData
      password: '',
      gender: '',  // Patient gender
      phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Dynamically update formData
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:8000/users/register/patient/', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Patient registered successfully', response.data);
          alert('Patient registered successfully');
          setFormData({
            name: '',
            email: '',
            password: '',
            gender: '',
            phone: '',
          });
        } catch (error) {
          console.error('There was an error registering the patient!', error);
          alert('There was an error registering the patient!');
        }
    };

    return (
        <div className="register-form-container">
            <h2>Patient Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}  // Use formData.name
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email} // Use formData.email
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password} // Use formData.password
                    onChange={handleChange}
                    required
                />
                  <label htmlFor="phone">Phone</label> {/* New Phone Field */}
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender} // Use formData.gender
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <button type="submit" className="register-btn">Register</button>
            </form>
             {/* Link to Login page */}
             <p>
                Proceed to <Link to="/login-patient">Login</Link>
            </p>
        </div>
    );
}

export default PatientRegister;
