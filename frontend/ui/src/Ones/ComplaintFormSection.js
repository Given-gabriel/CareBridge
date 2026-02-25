import { useState } from "react";
import { callApi } from "../Helpers";

export default function ComplaintFormSection({ service }) {
  const [formData, setFormData] = useState({
    type: "",
    email: "",
    phone: "",
    title: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleTypeChange = (e) => {
    setFormData((prev) => ({ ...prev, type: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.type) {
      setError("Please select a category (Complaint or Suggestion)");
      return;
    }
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }
    if (!formData.title) {
      setError("Please enter a title");
      return;
    }
    if (!formData.description) {
      setError("Please enter a description");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const data = {
        service_uuid: service?.uuid,
        type: formData.type,
        email: formData.email,
        phone: formData.phone,
        title: formData.title,
        description: formData.description,
      };

      const response = await callApi("/complaints", "POST", data);

      if (response && response.status === 1) {
        setSuccess(true);
        setFormData({
          type: "",
          email: "",
          phone: "",
          title: "",
          description: "",
        });
      } else {
        setError(response?.msg || "Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="py-5" style={{ backgroundColor: "#f4f7fb" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="bg-white p-5 shadow-sm rounded-4">
                <div
                  className="mb-4"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="fw-bold mb-3" style={{ color: "#0b2545" }}>
                  Submission Successful!
                </h3>
                <p className="text-muted mb-4">
                  Thank you for your{" "}
                  {formData.type === "complaint" ? "complaint" : "suggestion"}.
                  We have received your submission and will review it shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn btn-lg"
                  style={{ backgroundColor: "#0d6efd", color: "#ffffff" }}
                >
                  Submit Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5" style={{ backgroundColor: "#f4f7fb" }}>
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-3" style={{ color: "#0b2545" }}>
              Submit a Complaint or Suggestion
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
              If you have experienced any issue or would like to provide
              structured feedback regarding{" "}
              <strong>{service?.name || "this service"}</strong>, please
              complete the form below. All submissions are handled
              confidentially and forwarded through a structured review process.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bg-white p-4 p-md-5 shadow-sm rounded-4">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Type Selection */}
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#0b2545" }}
                  >
                    Select Category
                  </label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      value="complaint"
                      id="complaint"
                      checked={formData.type === "complaint"}
                      onChange={handleTypeChange}
                    />
                    <label className="form-check-label" htmlFor="complaint">
                      Complaint
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      value="suggestion"
                      id="suggestion"
                      checked={formData.type === "suggestion"}
                      onChange={handleTypeChange}
                    />
                    <label className="form-check-label" htmlFor="suggestion">
                      Suggestion
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#0b2545" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#0b2545" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#0b2545" }}
                  >
                    Title of Your Submission
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Brief title of your complaint or suggestion"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#0b2545" }}
                  >
                    Detailed Description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="6"
                    placeholder="Provide detailed information so we can understand and address your submission effectively..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "#0d6efd",
                      color: "#ffffff",
                    }}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit for Review"}
                  </button>
                </div>
              </form>
            </div>

            {/* Assurance Note */}
            <div className="text-center mt-4">
              <small className="text-muted">
                Your information will be handled with strict confidentiality and
                processed through CareBridge's structured review framework.
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
