import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../api/adminApi";
import Home from "../components/Home";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminLoginPage = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  // Get login method from AdminAuthContext
  const { login } = useContext(AdminAuthContext);

  // Handles admin login form submit
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await adminApi.login(adminEmail, adminPassword);

      // Use context login to set token & localStorage internally
      login(response.token);

      console.log("Admin login successful");
      navigate("/adminpage");
    } catch (err) {
      console.error("Login failed:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  // Close login modal and navigate home
  const handleCloseLogin = () => {
    setShowLogin(false);
    navigate("/");
  };

  return (
    <>
      <Home />

      {showLogin && (
        <>
          <div
            className="container position-absolute top-50 start-50 translate-middle"
            style={{
              zIndex: 10,
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "50%",
            }}
          >
            <h2 className="text-center mb-4">Admin Login</h2>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleAdminLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Admin Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Admin Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-danger w-100">
                Admin Login
              </button>
            </form>

            <button
              className="btn btn-outline-danger w-100 mt-3 fw-bold"
              onClick={handleCloseLogin}
            >
              Close
            </button>
          </div>

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
            }}
          ></div>
        </>
      )}
    </>
  );
};

export default AdminLoginPage;
