import React, { useState } from 'react';

const ManageSchedule = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:8000/doctors/set-availability/', { // Adjust the URL to your Django backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time }), // Send date and time in the request body
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Availability set for ${data.date} at ${data.time}`);
        // Clear the form fields after successful submission
        setDate('');
        setTime('');
      } else {
        alert('Failed to set availability. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while setting availability. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Manage Availability</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Select Date:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="time">Select Time:</label>
          <input 
            type="time" 
            id="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>Set Availability</button>
        {loading && <p>Loading...</p>} {/* Show loading message */}
      </form>
    </div>
  );
};

export default ManageSchedule;
