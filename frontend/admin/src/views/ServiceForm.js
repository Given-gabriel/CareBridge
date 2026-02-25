import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { callApi } from "../Helpers";
import "./serviceform.css";

export default function ServiceForm() {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
  });
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Service name is required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    setLoading(true);

    try {
      // Create form data for file upload
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("logo", formData.logo);

      const response = await callApi(
        "/services",
        "POST",
        form,
        appContext.token,
      );

      if (response.status === 1 || response.id) {
        appContext.tellSuccess("Service created successfully");
        appContext.navTo({ item: "services" });
      } else {
        setError(response.msg || "Failed to create service");
        appContext.tellError(response.msg || "Failed to create service");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      appContext.tellError("Network error");
      console.error("Create service error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <button
            className="back-btn"
            onClick={() => appContext.navTo({ item: "services" })}
          >
            ← Back
          </button>
          <h1>Create New Service</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label htmlFor="name">Service Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter service name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Enter service description"
              rows="5"
              value={formData.description}
              onChange={handleInputChange}
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="logo">Service Logo</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="logo"
                name="logo"
                className="file-input"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label htmlFor="logo" className="file-label">
                <span className="file-icon">📸</span>
                <span>Click to upload or drag and drop</span>
                <span className="file-hint">PNG, JPG or GIF (MAX 5MB)</span>
              </label>
            </div>

            {preview && (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <button
                  type="button"
                  className="remove-preview"
                  onClick={() => {
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, logo: null }));
                  }}
                  disabled={loading}
                >
                  ✕ Remove
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btnOutline"
              onClick={() => appContext.navTo({ item: "services" })}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btnPrimary" disabled={loading}>
              {loading ? "Creating..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
