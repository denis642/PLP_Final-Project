import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser
import './PatientDashboard.css'; // Link to the CSS file for styling

const PatientDashboard = () => {
  const { user } = useUser(); // Get user from context
  const patientName = user ? user.name : 'Guest'; // Extract patient's name

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Patient's Dashboard</h1>
      </header>

      {/* Sidebar with Profile and Navigation */}
      <aside className="dashboard-sidebar">
        <div className="profile-section">
          <img
            src="/img/icon.png"
            alt="User Profile"
            className="profile-icon"
          />
          <p className="profile-name">{patientName}</p> {/* Show the user's name */}
        </div>

        {/* Navigation Links */}
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/manage-profile">Manage Profile</Link>
            </li>
            <li>
              <Link to="/view-doctors">View Available Doctors</Link>
            </li>
            <li>
              <Link to="/book-appointment">Book/Reschedule/Cancel Appointments</Link>
            </li>
            <li>
              <Link to="/search-doctor-specialty">Search Doctors by Specialty</Link>
            </li>
            <li>
              <Link to="/doctor-availability">Calendar: Doctor Availability</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="dashboard-content">
        <h2>Welcome to your Dashboard</h2>
        <p>Select an option from the sidebar to proceed.</p>
        {/* You can render other components or information here */}
      </main>
    </div>
  );
};

export default PatientDashboard;
