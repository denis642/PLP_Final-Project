import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    specialty: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch the doctor profile on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/doctor/profile/')
      .then(response => setProfile(response.data.user))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://127.0.0.1:8000/users/doctor/profile/', profile)
      .then(response => {
        alert('Profile updated successfully!');
        setIsEditing(false);  // Disable editing after update
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="doctor-profile">
      <h2>Doctor Profile</h2>

      {!isEditing ? (
        // Display profile info
        <div>
          <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Specialty:</strong> {profile.specialty}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        // Show form to edit profile
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={profile.last_name}
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
              value={profile.email}
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
              value={profile.specialty}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default DoctorProfile;
