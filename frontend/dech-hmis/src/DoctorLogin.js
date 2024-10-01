import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDoctor } from "./DoctorContext"; // Import the useDoctor hook

const DoctorLogin = () => {
  // State to handle form inputs
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { setDoctorName } = useDoctor(); // Destructure setDoctorName from useDoctor

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // API call to login
    const response = await axios.post(
      "http://127.0.0.1:8000/users/login/",
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Log the full API response to check the structure
    console.log("Full API response:", response.data); 

    // Show success message
    alert("Login successful!");

    // Extract doctor name from the response
    const doctorName = response.data.name; // Directly access the name field
    if (doctorName) {
      setDoctorName(doctorName); // Set the doctor name in context
    } else {
      console.error("Doctor's name not found in response");
    }

    // Optionally store tokens or user info in local storage
    localStorage.setItem("accessToken", response.data.tokens.access);
    localStorage.setItem("refreshToken", response.data.tokens.refresh);

    // Navigate to the doctor's dashboard
    navigate("/doctor-dashboard");

    // Clear form after submission
    setLoginData({ email: "", password: "" });
    setErrorMessage(""); // Reset error message
  } catch (error) {
    console.error("Login failed:", error);
    setErrorMessage("Invalid email or password"); // Set error message
  }
};


  return (
    <div className="doctor-login">
      <h2>Doctor Login</h2>
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

        {/* Display error message */}
        {errorMessage && (
          <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Link to Register page */}
      <p>
        Don't have an account?{" "}
        <Link to="/register-doctor">Register here</Link>
      </p>
    </div>
  );
};

export default DoctorLogin;
