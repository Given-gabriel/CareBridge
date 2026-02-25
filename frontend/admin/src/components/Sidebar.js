import { AppContext } from "../App";
import "./sidebar.css";

export default function Sidebar({ appContext }) {

  const handleLogout = () => {
    appContext.logout();
  };

  const handleNavigation = (item) => {
    appContext.navTo({ item });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">CareBridge Admin</h2>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item" onClick={() => handleNavigation("dashboard")}>
          <i className="icon">📊</i>
          <span>Dashboard</span>
        </div>

        <div className="nav-item" onClick={() => handleNavigation("services")}>
          <i className="icon">⚙️</i>
          <span>Services</span>
        </div>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <i className="icon">🚪</i>
        <span>Logout</span>
      </button>
    </aside>
  );
}
