import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { callApi } from "../Helpers";
import ServicesList from "../views/ServicesList";
import "./services.css";

export default function Services() {
  const appContext = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await callApi(
          "/services",
          "GET",
          null,
          appContext.token,
        );
        setServices(response.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load services");
        appContext.tellError("Failed to fetch services");
        console.error("Fetch services error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [appContext.token, appContext]);

  const handleCreateService = () => {
    appContext.navTo({ item: "service-form" });
  };

  return (
    <ServicesList
      services={services}
      loading={loading}
      error={error}
      onCreateService={handleCreateService}
    />
  );
}
