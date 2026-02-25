import { useContext } from "react";
import { AppContext } from "../App";

export default function TopBar() {
  const app = useContext(AppContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-4"
      style={{ backgroundColor: "#0B3C5D" }}
    >
      <span className="navbar-brand fw-bold">CareBridge Admin</span>

      <div className="ms-auto d-flex gap-3">
        <button
          className="btn btn-outline-light"
          onClick={() => app.navTo({ item: "dashboard" })}
        >
          Dashboard
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => app.navTo({ item: "services" })}
        >
          Services
        </button>
        <button className="btn btn-danger" onClick={app.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
