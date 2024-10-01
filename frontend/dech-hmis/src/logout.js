import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (e.g., tokens from localStorage or state management)
    localStorage.removeItem('accessToken');  // Adjust according to your token storage
    localStorage.removeItem('refreshToken'); // If you have a refresh token as well

    // Redirect to the home page
    navigate('/'); // Redirects to the home page
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
