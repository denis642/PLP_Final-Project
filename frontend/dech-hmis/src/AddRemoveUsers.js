import React, { useState } from 'react';
import axios from 'axios';

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

const AddRemoveUsers = () => {
    const [userData, setUserData] = useState({ name: '', email: '', role: '' });
    const [userIdToRemove, setUserIdToRemove] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUserIdChange = (e) => {
        setUserIdToRemove(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken'); // Ensure you are retrieving the CSRF token correctly
        console.log("CSRF Token:", csrftoken); // Log the CSRF token for debugging
        
        if (!csrftoken) {
            alert('CSRF token is not set. Please reload the page and try again.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/admin/add-user/', userData, {
                headers: { 'X-CSRFToken': csrftoken },
            });

            alert('User added successfully!');
            console.log('User added successfully:', response.data);
            setUserData({ name: '', email: '', role: '' });
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleRemoveUser = async (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
        console.log("CSRF Token:", csrftoken); // Log the CSRF token for debugging

        try {
            const response = await fetch(`http://localhost:8000/users/remove-user/${userIdToRemove}/`,{
                method: 'DELETE',
                headers: { 'X-CSRFToken': csrftoken },
            });

            if (response.ok) {
                alert('User removed successfully!');
                console.log('User removed successfully');
                setUserIdToRemove('');
            } else {
                const data = await response.json();
                alert(`Error removing user: ${data.message}`);
                console.error('Error removing user:', data.message);
            }
        } catch (error) {
            alert('Error removing user: ' + error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add/Remove Users</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
                <label htmlFor="role">Role:</label>
                <select name="role" value={userData.role} onChange={handleChange} required>
                    <option value="">Select a role</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Add User</button>
            </form>

            <form onSubmit={handleRemoveUser}>
                <label htmlFor="userId">User ID to Remove:</label>
                <input type="text" id="userId" value={userIdToRemove} onChange={handleUserIdChange} required />
                <button type="submit">Remove User</button>
            </form>
        </div>
    );
};

export default AddRemoveUsers;
