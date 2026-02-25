import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { callApi } from "../Helpers";
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
        const response = await callApi("/services", "GET", null, appContext.token);
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
  }, [appContext.token]);

  const handleCreateService = () => {
    appContext.navTo({ item: "service-form" });
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <div>
          <h1>Services</h1>
          <p>Manage all available services</p>
        </div>
        <button className="btnPrimary" onClick={handleCreateService}>
          + Create Service
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Services Yet</h3>
          <p>Start by creating your first service</p>
          <button className="btnPrimary" onClick={handleCreateService}>
            Create First Service
          </button>
        </div>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.uuid} className="service-card">
              {service.logo && (
                <img
                  src={service.logo}
                  alt={service.name}
                  className="service-logo"
                />
              )}
              <div className="card-content">
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
