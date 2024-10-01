import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/users/doctor/patients/'); // Ensure this URL is correct
          setPatients(response.data);
        } catch (err) {
          setError('Error fetching patients. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPatients();
    }, []);

  if (loading) {
    return <p>Loading assigned patients...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h2>Assigned Patients</h2>
      {patients.length === 0 ? (
        <p>No patients assigned.</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              {patient.name} (Gender: {patient.gender}, Age: {patient.age}) {/* Add more patient details as necessary */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewPatients;
