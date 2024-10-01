import { useState, useContext } from "react"; // Import useContext
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "./UserContext"; // Import UserContext

const PatientLogin = () => {
  // State to handle form inputs
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { setUser } = useContext(UserContext); // Access setUser from UserContext

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/login/",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full API response:", response.data); 

      alert("Login successful!");

      // Extract patient details from the response
      const patientData = {
        name: response.data.name, // Extracting the patient's name
        email: response.data.email, // You can also extract other details as needed
        // Add any other relevant fields here
      };

      if (patientData.name) {
        setUser(patientData); // Set the patient data in context
      } else {
        console.error("Patient's name not found in response");
      }

      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      navigate("/patient-dashboard");

      setLoginData({ email: "", password: "" });
      setErrorMessage(""); 
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="patient-login">
      <h2>Patient Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Link to Register page */}
      <p>
        Don't have an account?{" "}
        <Link to="/register-patient">Register here</Link>
      </p>
    </div>
  );
};

export default PatientLogin;
