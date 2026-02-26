import { getInlineLoader } from "../Helpers";
import "../main-views/dashboard.css";

export default function DashboardHome({ stats, onServicesRedirect }) {
  if (stats.loading) {
    return <div className="container mSupportLoading">{getInlineLoader()}</div>;
  }

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
          <button className="btnPrimary" onClick={onServicesRedirect}>
            Go to Services →
          </button>
        </div>
      </div>
    </div>
  );
}
