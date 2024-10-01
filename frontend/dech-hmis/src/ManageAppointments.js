import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/doctor/appointments/')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const cancelAppointment = (id) => {
    axios.post('http://127.0.0.1:8000/users/doctor/appointments/', { appointment_id: id, cancel: true })
      .then(response => alert('Appointment canceled'))
      .catch(error => console.error('Error canceling appointment:', error));
  };

  const rescheduleAppointment = (id, newTime) => {
    axios.post('http://127.0.0.1:8000/users/doctor/appointments/', { appointment_id: id, new_time: newTime })
      .then(response => alert('Appointment rescheduled'))
      .catch(error => console.error('Error rescheduling appointment:', error));
  };

  return (
    <div>
      <h2>Manage Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.patient_name} - {appointment.date} at {appointment.start_time}
            <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
            <button onClick={() => rescheduleAppointment(appointment.id, '10:00')}>Reschedule</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAppointments;
