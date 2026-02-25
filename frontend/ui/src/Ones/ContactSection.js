export default function ContactSection() {
  return (
    <section className="py-5" style={{ backgroundColor: "#f4f7fb" }}>
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center mb-5 text-center">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-3" style={{ color: "#0b2545" }}>
              Contact CareBridge
            </h2>

            <div
              className="mx-auto mb-3"
              style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#0d6efd",
                borderRadius: "2px",
              }}
            ></div>

            <p className="text-muted">
              CareBridge is committed to transparency, responsiveness, and
              structured communication. If you require general information or
              institutional engagement, you may reach us through the channels
              below.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="bg-white p-4 shadow-sm rounded-4 h-100 text-center">
              <h5 className="fw-semibold mb-3" style={{ color: "#0b2545" }}>
                Our Office
              </h5>
              <p className="text-muted mb-0">
                CareBridge Headquarters
                <br />
                Dar es Salaam, Tanzania
                <br />
                East Africa
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white p-4 shadow-sm rounded-4 h-100 text-center">
              <h5 className="fw-semibold mb-3" style={{ color: "#0b2545" }}>
                Email Support
              </h5>
              <p className="text-muted mb-0">
                support@carebridge.co.tz
                <br />
                info@carebridge.co.tz
              </p>
              <small className="text-muted">
                Responses are typically provided within 24 hours.
              </small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white p-4 shadow-sm rounded-4 h-100 text-center">
              <h5 className="fw-semibold mb-3" style={{ color: "#0b2545" }}>
                Working Hours
              </h5>
              <p className="text-muted mb-0">
                Monday – Friday
                <br />
                8:00 AM – 5:00 PM
              </p>
              <small className="text-muted">Closed on public holidays.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
