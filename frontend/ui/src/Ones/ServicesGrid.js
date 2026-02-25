import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { callApi } from "../Helpers";

export default function ServicesGrid({ preview }) {
  const appContext = useContext(AppContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      console.log("Fetching services...");
      const response = await callApi("/services", "GET");
      console.log("Services API response:", response);
      // Backend returns { status: 1, data: [...] } or { status: 0, msg: "..." }
      // Extract the data array from the response
      if (response && response.status === 1 && Array.isArray(response.data)) {
        console.log("Services data:", response.data);
        setServices(response.data);
      } else {
        console.log("No services or error:", response);
        // Set empty array if API fails or returns error
        setServices([]);
      }
    }
    fetchServices();
  }, []);

  const displayed = preview ? services.slice(0, 3) : services;

  const handleServiceClick = (serviceId) => {
    if (appContext?.navTo) {
      appContext.navTo({
        item: "service_details",
        subItem: serviceId,
      });
    }
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#F4F9FB" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#0B3C5D" }}>
            Organizations We Serve
          </h2>
          <p className="text-muted">
            We partner with institutions that value customer trust,
            transparency, and structured communication.
          </p>
        </div>

        <div className="row g-4">
          {displayed.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => handleServiceClick(service.uuid)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="card-body text-center p-4">
                  <img
                    src={service.logo}
                    alt={service.name}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />

                  <h5 className="fw-bold mb-3" style={{ color: "#0B3C5D" }}>
                    {service.name}
                  </h5>

                  <p className="text-muted">{service.description}</p>
                </div>

                <div
                  style={{
                    height: "4px",
                    backgroundColor: "#00A8A8",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
