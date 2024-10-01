import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

function DoctorRegister() {
    const [formData, setFormData] = useState({
        name: '',      // Corrected to name instead of username
        email: '',     // Add email
        password: '',
        specialty: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/register/doctor/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Doctor registered successfully:', response.data);
            alert('Doctor registered successfully');
            setFormData({
                name: '',
                email: '',
                password: '',
                specialty: '',
            });
        } catch (error) {
            console.error('There was an error registering the doctor!', error);
            alert('There was an error registering the doctor!');
        }
    };

    return (
        <div className="register-doctor">
            <h2>Register Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}  // Use formData
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email} // Use formData
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password} // Use formData
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        value={formData.specialty} // Use formData
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
            {/* Link to Login page */}
            <p>
                Proceed to <Link to="/login-doctor">Login</Link>
            </p>
        </div>
    );
}

export default DoctorRegister;
