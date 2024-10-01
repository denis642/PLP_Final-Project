import React, { useState, useEffect } from 'react';

const EditUserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setUpdatedData(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/update-user/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log('User updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Edit User Profiles</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleSelectUser(user)}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>

      {selectedUser && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedData.email}
            onChange={handleChange}
            required
          />

          {/* Additional fields for role or specialization */}
          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default EditUserProfiles;
