import { useState, useEffect } from 'react';

const BookAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctor: '',
    date: '',
    time: '',
    end_time: '',
  });
  const [editingIndex, setEditingIndex] = useState(null); // Track which appointment is being edited
  const [doctors, setDoctors] = useState([]); // State to hold the list of doctors
  const [error, setError] = useState(null); // State to hold error messages
  const [success, setSuccess] = useState(null); // State to hold success messages
  const [availabilityError, setAvailabilityError] = useState(null); // State for doctor availability

  // Replace these with your actual method of getting the patient ID and token
  const patientId = localStorage.getItem('patientId');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/doctors/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch doctors');

        const data = await response.json();
        setDoctors(Array.isArray(data) ? data : []);
      } catch (error) {
        setError('Failed to load doctors. Please try again later.');
      }
    };

    fetchDoctors();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const appointmentPayload = {
      doctor: appointmentData.doctor,
      patient: patientId,
      date: appointmentData.date,
      start_time: appointmentData.time,
      end_time: calculateEndTime(appointmentData.time),
    };

    if (editingIndex !== null) {
      const updatedAppointments = appointments.map((appt, index) =>
        index === editingIndex ? appointmentData : appt
      );
      setAppointments(updatedAppointments);
      setEditingIndex(null); // Reset editing index
    } else {
      try {
        // First, check doctor's availability before booking
        const available = await checkDoctorAvailability(appointmentData.doctor, appointmentData.date, appointmentData.time);
        if (!available) {
          setAvailabilityError('The doctor is not available at this time. Please choose another time.');
          return; // Stop the booking process if doctor is unavailable
        }
        
        const response = await fetch('http://localhost:8000/users/appointments/book/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Error booking appointment.');
          return;
        }

        const bookedAppointment = await response.json();
        setAppointments([...appointments, bookedAppointment]);
        setSuccess('Appointment successfully booked!');
      } catch (error) {
        setError('Failed to book appointment. Please try again.');
      }
    }

    // Clear the form and success/error messages after a short delay
    setAppointmentData({ doctor: '', date: '', time: '', end_time: '' });
    setTimeout(() => {
      setError(null);
      setSuccess(null);
      setAvailabilityError(null);
    }, 3000);
  };

  // Check if the doctor is available at the selected time and date
  const checkDoctorAvailability = async (doctorId, date, time) => {
    try {
      const response = await fetch(`http://localhost:8000/users/doctors/${doctorId}/availability/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time }),
      });

      if (!response.ok) throw new Error('Error checking availability');

      const data = await response.json();
      return data.is_available;
    } catch (error) {
      setError('Error checking doctor availability. Please try again.');
      return false; // Assume unavailable if there is an error
    }
  };

  const handleEdit = (index) => {
    setAppointmentData(appointments[index]);
    setEditingIndex(index);
  };

  const handleCancel = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    setSuccess('Appointment canceled successfully.');
    setTimeout(() => setSuccess(null), 3000);
  };

  const calculateEndTime = (startTime) => {
    const timeParts = startTime.split(':');
    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1]);
    const endHour = hour + 1; // Assuming appointments are 1 hour long
    return `${endHour < 10 ? '0' : ''}${endHour}:${minute < 10 ? '0' : ''}${minute}`;
  };

  return (
    <div>
      <h3>Book or Manage Appointments</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {availabilityError && <p style={{ color: 'red' }}>{availabilityError}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Doctor:</label>
        <select name="doctor" value={appointmentData.doctor} onChange={handleChange} required>
          <option value="" disabled>Select a doctor</option>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <option key={doctor.user.id} value={doctor.user.id}>
                {doctor.user.username} - {doctor.specialty}
              </option>
            ))
          ) : (
            <option value="" disabled>No doctors available</option>
          )}
        </select>

        <label>Date:</label>
        <input type="date" name="date" value={appointmentData.date} onChange={handleChange} required />

        <label>Time:</label>
        <input type="time" name="time" value={appointmentData.time} onChange={handleChange} required />

        <button type="submit">
          {editingIndex !== null ? 'Update Appointment' : 'Book Appointment'}
        </button>
      </form>

      <h4>Your Appointments</h4>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appt, index) => (
            <li key={index}>
              {appt.doctor} - {appt.date} at {appt.start_time}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleCancel(index)}>Cancel</button>
            </li>
          ))
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </ul>
    </div>
  );
};

export default BookAppointment;
