export default function AboutSection({ short }) {
  return (
    <section className="py-5" style={{ backgroundColor: "#f4f7fb" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center mb-4">
            <h2 className="fw-bold mb-3" style={{ color: "#0b2545" }}>
              About CareBridge
            </h2>

            <div
              className="mx-auto"
              style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#0d6efd",
                borderRadius: "2px",
              }}
            ></div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="bg-white p-4 p-md-5 shadow-sm rounded-4">
              <p className="lead text-dark">
                CareBridge was established to help organizations manage one of
                their most valuable assets — customer trust. In today's
                competitive environment, businesses must listen, respond, and
                improve continuously. We serve as the structured bridge between
                companies and their customers.
              </p>

              <p className="text-muted">
                Our team ensures that every complaint and suggestion is
                documented, categorized, analyzed, and forwarded appropriately.
                We provide detailed reporting, performance insights, and
                structured follow-up processes that enable organizations to
                transform feedback into measurable improvement.
              </p>

              {!short && (
                <>
                  <p className="text-muted">
                    By outsourcing complaint management to CareBridge, companies
                    reduce operational strain, increase transparency, and
                    improve overall customer satisfaction metrics. Our
                    structured workflow ensures accountability at every stage of
                    the complaint resolution process.
                  </p>

                  <p className="text-muted">
                    We believe that every complaint is an opportunity for
                    improvement and every suggestion is a step toward
                    innovation. Through consistency, professionalism, and
                    strategic analysis, we help organizations strengthen trust
                    and build lasting relationships with their customers.
                  </p>

                  <div className="mt-4 text-center">
                    <span
                      className="badge px-4 py-2"
                      style={{
                        backgroundColor: "#0d6efd",
                        fontSize: "0.9rem",
                      }}
                    >
                      Transparency • Accountability • Continuous Improvement
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
