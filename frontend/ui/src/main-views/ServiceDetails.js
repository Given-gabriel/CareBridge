import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import ServiceDetailsLanding from "../views/ServiceDetailsLanding";
import { callApi } from "../Helpers";

export default function ServiceDetails() {
  const appContext = useContext(AppContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!appContext.navSubItem) {
        setLoading(false);
        return;
      }

      try {
        const response = await callApi(
          `/services/${appContext.navSubItem}`,
          "GET",
        );
        if (response && response.status === 1 && response.data) {
          setService(response.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [appContext.navSubItem]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <ServiceDetailsLanding service={service} />;
}
