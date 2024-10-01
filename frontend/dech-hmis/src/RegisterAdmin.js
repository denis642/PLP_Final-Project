import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',  // Add email field
        password: '',
        role: '',   // Admin role
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
            const response = await axios.post('http://127.0.0.1:8000/users/register/admin/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Admin registered successfully', response.data);
            alert('Admin registered successfully');
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
            });
        } catch (error) {
            console.error('There was an error registering the admin!', error);
            alert('There was an error registering the admin!');
        }
    };

    return (
        <div className="register-admin">
            <h2>Register Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name} // Use formData
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
                    <label htmlFor="role">Role:</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role} // Use formData
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
            {/* Link to Login page */}
            <p>
                Proceed to <Link to="/login-admin">Login</Link>
            </p>
        </div>
    );
}

export default AdminRegister;
