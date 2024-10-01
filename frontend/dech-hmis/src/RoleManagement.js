import React, { useState, useEffect } from 'react';

const RoleManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleChangeRole = async (user, newRole) => {
    try {
      const response = await fetch(`/api/update-role/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        console.log('Role updated successfully');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div>
      <h2>Role Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
            <select
              value={user.role}
              onChange={(e) => handleChangeRole(user, e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
