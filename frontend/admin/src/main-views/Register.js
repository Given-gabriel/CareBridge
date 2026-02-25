import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import "./register.css";

export default function Register() {
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
      const response = await fetch("http://localhost:3000/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        appContext.tellSuccess(
          data.message || "Account created. Please login.",
        );
        appContext.navTo({ item: "login" });
      } else {
        setError(data.message || "Registration failed");
        appContext.tellError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      appContext.tellError("Network error");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Admin</h1>
          <p>Create an account to access CareBridge Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Choose a username"
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
              placeholder="Choose a secure password"
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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="login-alt">
          <p>
            Already have an account?{" "}
            <button
              className="linkBtn"
              onClick={() => appContext.navTo({ item: "login" })}
            >
              Login
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
