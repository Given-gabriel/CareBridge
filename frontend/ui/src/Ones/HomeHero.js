import { useContext } from "react";
import { AppContext } from "../App";

export default function HomeHero() {
  const appContext = useContext(AppContext);

  const handleNavToServices = () => {
    if (appContext?.navTo) {
      appContext.navTo({ item: "services" });
    }
  };

  const handleNavToContact = () => {
    if (appContext?.navTo) {
      appContext.navTo({ item: "contact" });
    }
  };

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #0B3C5D 0%, #0F4C75 100%)",
        color: "#FFFFFF",
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-9">
            <h1 className="display-4 fw-bold mb-4">
              Bridging Businesses and Customers Through Professional Complaint
              Management
            </h1>

            <p className="lead mb-4" style={{ color: "#E6F2F7" }}>
              CareBridge is a customer care outsourcing company dedicated to
              helping organizations build trust, transparency, and customer
              satisfaction. We handle complaints, suggestions, and feedback
              professionally so companies can focus on innovation, growth, and
              operational excellence.
            </p>

            <p className="mb-5" style={{ color: "#D0E8F0" }}>
              Our structured complaint management system ensures that every
              customer voice is heard, documented, analyzed, and addressed with
              precision and care.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                className="btn btn-lg px-4"
                style={{
                  backgroundColor: "#00A8A8",
                  color: "#FFFFFF",
                  border: "none",
                }}
                onClick={handleNavToServices}
              >
                View Our Services
              </button>

              <button
                className="btn btn-lg btn-outline-light px-4"
                onClick={handleNavToContact}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
