import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    gender: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setErrorMessage('You need to log in to access this page.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/users/patient/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email, gender, phone } = response.data;

        setProfileData({
          name: name || '',
          email: email || '',
          gender: gender || '',
          phone: phone || '',
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Unauthorized: Please log in again.');
        } else {
          setErrorMessage('Failed to load profile. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://127.0.0.1:8000/users/update-patient-profile/', profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Profile Updated:", response.data);
      alert('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (errorMessage) return <p style={{ color: 'red' }}>{errorMessage}</p>;

  return (
    <div>
      <h3>Manage Your Profile</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={profileData.gender || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone || ''}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Update Profile</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Phone:</strong> {profileData.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
