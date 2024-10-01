import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  // State to handle form inputs
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook to programmatically navigate

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

      const data = response.data; // Use response.data to get the parsed JSON

      if (response.status === 200) { // Check for successful response status
        // Successful login
        console.log("Login successful:", data);
        alert("Successfully logged in!"); // Show alert message
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Login failed. Please try again."); // Show error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during login. Please try again."); // Show error message
    }

    // Clear form after submission
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
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
        <Link to="/register-admin">Register here</Link>
      </p>
    </div>
  );
};

export default AdminLogin;
