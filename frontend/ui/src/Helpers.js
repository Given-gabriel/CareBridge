import axios from "axios";

// ===== MAIN VIEWS =====
import Home from "./main-views/Home";
import About from "./main-views/About";
import Services from "./main-views/Services";
import Contact from "./main-views/Contact";
import ServiceDetails from "./main-views/ServiceDetails";

// ===== API BASE =====
export const BASE_API = "http://localhost:3000";
// change later to production backend

// =====================================================
// MAIN VIEW CONTROLLER (Hash Navigation Based)
// =====================================================

export function getMainView(app) {
  if (app.navItem === "home") {
    return <Home />;
  } else if (app.navItem === "about") {
    return <About />;
  } else if (app.navItem === "services") {
    return <Services />;
  } else if (app.navItem === "service_details" && app.navSubItem) {
    return <ServiceDetails serviceId={app.navSubItem} />;
  } else if (app.navItem === "contact") {
    return <Contact />;
  } else {
    // Default
    return <Home />;
  }
}

// =====================================================
// SIMPLE API CALL
// =====================================================

export async function callApi(url, method = "POST", data = {}, token = null) {
  try {
    const headers = {};

    // Only set JSON header if not FormData
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      method,
      url: BASE_API + url,
      headers,
    };

    // Only attach body for non-GET requests
    if (method !== "GET") {
      config.data = data;
    }

    const response = await axios(config);

    return response.data;
  } catch (error) {
    return {
      status: 0,
      msg: "Network Error",
      error,
    };
  }
}

// =====================================================
// SMALL HELPERS
// =====================================================

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
