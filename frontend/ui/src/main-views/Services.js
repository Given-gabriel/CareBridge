import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import ServicesLanding from "../views/ServicesLanding";
import ServiceDetailsLanding from "../views/ServiceDetailsLanding";
import { callApi } from "../Helpers";

export default function Services() {
  const appContext = useContext(AppContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(() => appContext?.navSubItem);

  useEffect(() => {
    if (appContext?.navSubItem) {
      callApi(`/services/${appContext.navSubItem}`, "GET").then((data) => {
        if (data && data.status === 1 && data.data) {
          setService(data.data);
        }
        setLoading(false);
      });
    }
  }, [appContext?.navSubItem]);

  if (!appContext.navSubItem) {
    return <ServicesLanding />;
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <ServiceDetailsLanding service={service} />;
}
