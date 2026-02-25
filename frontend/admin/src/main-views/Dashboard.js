import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { callApi } from "../Helpers";
import "./dashboard.css";

export default function Dashboard() {
  const appContext = useContext(AppContext);
  const [stats, setStats] = useState({
    servicesCount: 0,
    complaintsCount: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch services count
        const servicesResponse = await callApi(
          "/services/count",
          "GET",
          null,
          appContext.token,
        );
        const servicesCount = servicesResponse.count || 0;

        // Fetch complaints stats - the backend has /complaints/stats endpoint
        // Returns grouped data: [{ category, status, total }, ...]
        const complaintsResponse = await callApi(
          "/complaints/stats",
          "GET",
          null,
          appContext.token,
        );
        let complaintsCount = 0;
        if (complaintsResponse && complaintsResponse.status === 1 && Array.isArray(complaintsResponse.data)) {
          complaintsCount = complaintsResponse.data.reduce((sum, item) => sum + (item.total || 0), 0);
        }

        setStats({
          servicesCount,
          complaintsCount,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load statistics",
        }));
        appContext.tellError("Failed to load dashboard data");
      }
    };

    fetchStats();
  }, [appContext.token]);

  const handleServicesRedirect = () => {
    appContext.navTo({ item: "services" });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your overview.</p>
      </div>

      {stats.error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {stats.error}
        </div>
      )}

      <div className="dashboard-grid">
        {/* Services Card */}
        <div className="stat-card">
          <div className="stat-icon services">📊</div>
          <div className="stat-content">
            <h3>Services Available</h3>
            <p className="stat-number">{stats.servicesCount}</p>
            <p className="stat-label">Total services registered</p>
          </div>
        </div>

        {/* Complaints Card */}
        <div className="stat-card">
          <div className="stat-icon complaints">📝</div>
          <div className="stat-content">
            <h3>Complaints/Suggestions</h3>
            <p className="stat-number">{stats.complaintsCount}</p>
            <p className="stat-label">Total complaints received</p>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="action-section">
        <div className="action-card">
          <h3>Manage Services</h3>
          <p>View, create, and manage all available services</p>
          <button className="btnPrimary" onClick={handleServicesRedirect}>
            Go to Services →
          </button>
        </div>
      </div>
    </div>
  );
}
