import { useState } from 'react';
import axios from 'axios';

const SearchDoctorBySpeciality = () => {
  const [specialty, setSpecialty] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setNoResults(false);

    const token = localStorage.getItem('accessToken'); // Retrieve the token

    try {
      const response = await axios.get(`http://localhost:8000/doctors/?specialty=${specialty}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Use backticks here
        },
      });
      const results = response.data;
      setSearchResults(results);
      setNoResults(results.length === 0); // Set noResults based on the response length
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('An error occurred while fetching doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Search Doctor by Speciality</h3>
      <input
        type="text"
        placeholder="Enter specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="error-message">{error}</p>} {/* Display error message */}

      {noResults && <p>No doctors found for the specialty "{specialty}".</p>} {/* Handle no results */}

      <ul>
        {searchResults.map((doctor, index) => (
          <li key={index}>
            {doctor.user.username} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDoctorBySpeciality;
