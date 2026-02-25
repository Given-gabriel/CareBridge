import ComplaintFormSection from "../Ones/ComplaintFormSection";
import Footer from "../Ones/Footer";

const ServiceDetailsLanding = ({ service }) => {
  return (
    <>
      {service && (
        <div className="py-4" style={{ backgroundColor: "#0B3C5D" }}>
          <div className="container text-center">
            <img
              src={service.logo}
              alt={service.name}
              className="mb-3"
              style={{ maxHeight: "80px", objectFit: "contain" }}
            />
            <h2 className="mb-2" style={{ color: "#ffffff" }}>
              {service.name}
            </h2>
            <p className="mb-0" style={{ color: "rgba(255,255,255,0.8)" }}>
              {service.description}
            </p>
          </div>
        </div>
      )}
      <ComplaintFormSection service={service} />
      <Footer />
    </>
  );
};

export default ServiceDetailsLanding;
