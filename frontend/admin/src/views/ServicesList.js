import "../main-views/services.css";

export default function ServicesList({
  services,
  loading,
  error,
  onCreateService,
}) {
  return (
    <div className="services-container">
      <div className="services-header">
        <div>
          <h1>Services</h1>
          <p>Manage all available services</p>
        </div>
        <button className="btnPrimary" onClick={onCreateService}>
          + Create Service
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Services Yet</h3>
          <p>Start by creating your first service</p>
          <button className="btnPrimary" onClick={onCreateService}>
            Create First Service
          </button>
        </div>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.uuid} className="service-card">
              {service.logo && (
                <img
                  src={service.logo}
                  alt={service.name}
                  className="service-logo"
                />
              )}
              <div className="card-content">
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
