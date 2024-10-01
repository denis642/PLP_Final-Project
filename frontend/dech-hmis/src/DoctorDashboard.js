import React from 'react';
import { Link } from 'react-router-dom';
import { useDoctor } from './DoctorContext'; // Import the context
import './DoctorDashboard.css'; // Link to the CSS file for styling

const DoctorDashboard = () => {
  const { doctorName } = useDoctor(); // Get the doctor's name from context

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Doctor's Dashboard</h1>
      </header>

      {/* Sidebar with Profile and Navigation */}
      <aside className="dashboard-sidebar">
        <div className="profile-section">
          <img
            src="/img/icon1.png" // Use a relevant image for the doctor
            alt="Doctor Profile"
            className="profile-icon"
          />
          <p className="profile-name">{doctorName ? doctorName : 'Dr. John Doe'}</p> {/* Display dynamic name */}
        </div>

        {/* Navigation Links */}
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/manage-schedule">Manage Availability</Link>
            </li>
            <li>
              <Link to="/view-patients">View Patients</Link>
            </li>
            <li>
              <Link to="/manage-appointments">Manage Appointments</Link>
            </li>
            <li>
              <Link to="/view-schedule">View Schedule</Link>
            </li>
            <li>
              <Link to="/doctor-profile">Manage Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="dashboard-content">
        <h2>Welcome to your Dashboard</h2>
        <p>Select an option from the sidebar to proceed.</p>
      </main>
    </div>
  );
};

export default DoctorDashboard;
