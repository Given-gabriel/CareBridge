import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getInlineLoader } from "../Helpers";

export default function DashboardHome() {
  const appContext = useContext(AppContext);
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState({
    services: 0,
    complaints: 0,
  });

  async function init() {
    setReady(false);

    const response = await fetch("http://localhost:5000/admin/stats");
    const data = await response.json();

    setStats(data);
    setReady(true);
  }

  useEffect(() => {
    init();
  }, []);

  if (!ready) {
    return <div className="container mSupportLoading">{getInlineLoader()}</div>;
  }

  return (
    <div className="container">
      <h4 className="main-section-title mb-4 text-primary-brand">
        Welcome Admin
      </h4>

      <div className="row">
        <div className="col-md-6">
          <div
            className="card custom-card p-4"
            style={{ cursor: "pointer" }}
            onClick={() => {
              appContext.navTo({ item: "services" });
            }}
          >
            <h2 className="text-primary-brand">{stats.services}</h2>
            <h6 className="text-muted">Total Services</h6>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card custom-card p-4">
            <h2 className="text-primary-brand">{stats.complaints}</h2>
            <h6 className="text-muted">Complaints / Suggestions</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
