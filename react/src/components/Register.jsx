import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import userApi from "../api/userApi";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("User trying to register with:", formData);

    try {
      // Step 1: Get CSRF token (probably needed for Laravel backend or similar)
      const csrf = await userApi.getCsrfToken();

      // Step 2: Actually send the registration data
      await userApi.register(formData, csrf);

      console.log("User registered successfully 🎉");
      nav("/login"); // Redirect to login after success
    } catch (err) {
      console.error("Registration error:", err?.response?.data?.error || err.message);
      // TODO: Show error message to user in UI (e.g., toast or inline error)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleFormSubmit}
        className="w-50 w-sm-40 w-md-35 p-5 rounded shadow-lg"
        style={{ backgroundColor: "#1e3c72" }}
      >
        <h2 className="text-center text-white mb-4">Create Account</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="form-label text-white">Username</label>
          <div className="input-group">
            <span className="input-group-text" style={{ backgroundColor: "#1e3c72", color: "#fff" }}>
              <FaUser />
            </span>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              className="form-control"
              style={{ borderColor: "#6F4F9F" }}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label text-white">Email Address</label>
          <div className="input-group">
            <span className="input-group-text" style={{ backgroundColor: "#1e3c72", color: "#fff" }}>
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="example@mail.com"
              style={{ borderColor: "#6F4F9F" }}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="pass" className="form-label text-white">Password</label>
          <div className="input-group">
            <span className="input-group-text" style={{ backgroundColor: "#1e3c72", color: "#fff" }}>
              <FaLock />
            </span>
            <input
              type="password"
              id="pass"
              className="form-control"
              placeholder="••••••••"
              style={{ borderColor: "#6F4F9F" }}
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-100 py-2"
          style={{
            backgroundColor: "#1e3c72",
            color: "#fff",
            borderRadius: "25px",
          }}
        >
          Register
        </button>

        {/* Already have account? */}
        <div className="mt-3 text-center">
          <small className="text-white">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-decoration-none"
              style={{ color: "#F5C6A5" }}
            >
              Log in here
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Register;
