import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import "./login.css";

export default function Login() {
  const appContext = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with your actual backend endpoint
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.admin?.token) {
        localStorage.setItem("adminToken", data.admin.token);
        appContext.setToken(data.admin.token);
        appContext.navTo({ item: "dashboard" });
      } else {
        setError(data.message || "Invalid credentials");
        appContext.tellError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      appContext.tellError("Network error");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>CareBridge Admin</h1>
          <p>Admin Panel Access</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btnPrimary login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-alt">
          <p>
            Don't have an account?{" "}
            <button
              className="linkBtn"
              onClick={() => appContext.navTo({ item: "register" })}
            >
              Register
            </button>
          </p>
        </div>

        <div className="login-footer">
          <p>© 2026 CareBridge Admin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
