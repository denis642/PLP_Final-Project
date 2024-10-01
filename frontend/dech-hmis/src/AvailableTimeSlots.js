import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the styles
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have axios installed

const AvailableTimeSlots = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDateChange = async (newDate) => {
    setDate(newDate);
    setLoading(true);
    setError(null);
    
    try {
      const formattedDate = newDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const response = await axios.get(`http://localhost:8000/users/timeslots?date=${formattedDate}`);
      setTimeSlots(response.data);
    } catch (err) {
      setError('Failed to fetch time slots. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Select a Date for Available Time Slots</h3>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={new Date()} // Disable past dates
      />
      {loading && <p>Loading available time slots...</p>}
      {error && <p className="error-message">{error}</p>}
      {timeSlots.length > 0 ? (
        <ul>
          {timeSlots.map((slot, index) => (
            <li key={index}>{slot}</li> // Adjust the display as needed
          ))}
        </ul>
      ) : (
        !loading && <p>No available time slots for this date.</p>
      )}
    </div>
  );
};

export default AvailableTimeSlots;
