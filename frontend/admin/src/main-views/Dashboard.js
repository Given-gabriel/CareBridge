import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { callApi } from "../Helpers";
import DashboardHome from "../views/DashboardHome";
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
        if (
          complaintsResponse &&
          complaintsResponse.status === 1 &&
          Array.isArray(complaintsResponse.data)
        ) {
          complaintsCount = complaintsResponse.data.reduce(
            (sum, item) => sum + (item.total || 0),
            0,
          );
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
  }, [appContext.token, appContext]);

  const handleServicesRedirect = () => {
    appContext.navTo({ item: "services" });
  };

  return (
    <DashboardHome stats={stats} onServicesRedirect={handleServicesRedirect} />
  );
}
