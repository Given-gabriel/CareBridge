export default function Footer() {
  return (
    <footer
      className="pt-5 pb-4"
      style={{ backgroundColor: "#0b2545", color: "#ffffff" }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3">
              <span style={{ color: "#0d6efd" }}>Care</span>Bridge
            </h4>
            <p className="text-light" style={{ opacity: 0.85 }}>
              A professional customer care outsourcing company dedicated to
              helping businesses strengthen customer trust through structured
              complaint management, transparent communication, and measurable
              service improvement strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3" style={{ color: "#0d6efd" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="text-light" style={{ opacity: 0.85 }}>
                  Home
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light" style={{ opacity: 0.85 }}>
                  About Us
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light" style={{ opacity: 0.85 }}>
                  Services
                </span>
              </li>
              <li>
                <span className="text-light" style={{ opacity: 0.85 }}>
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3" style={{ color: "#0d6efd" }}>
              Contact Information
            </h6>
            <p className="text-light mb-2" style={{ opacity: 0.85 }}>
              Dar es Salaam, Tanzania
            </p>
            <p className="text-light mb-2" style={{ opacity: 0.85 }}>
              support@carebridge.co.tz
            </p>
            <p className="text-light" style={{ opacity: 0.85 }}>
              +255 700 000 000
            </p>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <div className="text-center mt-3">
          <small style={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} CareBridge. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
