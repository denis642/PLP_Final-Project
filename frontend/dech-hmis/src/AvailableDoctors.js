import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Use the correct key for the token
    console.log('Retrieved token:', token); // Log the token for debugging

    // Redirect to login if no token is found
    if (!token) {
      navigate('/login-patient'); // Adjust this path to your login route
      return;
    }

    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/doctors/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Corrected JWT token syntax
          },
        });
        setDoctors(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log('Token expired or invalid, redirecting to login...');
          localStorage.removeItem('accessToken'); // Clear invalid token
          navigate('/login-patient'); // Redirect to login
        } else {
          console.error('Error fetching doctors:', err); // Log error for debugging
          setError(err.message);
        }
      }
    };

    fetchDoctors();
  }, [navigate]);

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Available Doctors</h3>
      {error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            marginTop: '20px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
          }}>
          <thead>
            <tr style={{ backgroundColor: '#3a3dbe', color: 'white' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Doctor Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Specialty</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr key={index} style={{ 
                    '&:hover': { backgroundColor: '#f1f1f1' },
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' 
                  }}>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                    {doctor.user.username}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                    {doctor.specialty}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '12px' }}>
                  No doctors are available at the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AvailableDoctors;
