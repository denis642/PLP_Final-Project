import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Admin Dashboard Header */}
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            User Management
            <ul className="dropdown-menu">
              <li><Link to="/add_user">Add/Remove Users</Link></li>
              <li><Link to="/edit-user">Edit User Profiles</Link></li>
              <li><Link to="/view-activity">View User Activity</Link></li>
              <li><Link to="/role-management">Role Management</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="dashboard-content">
        {/* Dashboard functionalities will go here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
