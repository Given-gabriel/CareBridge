import axios from "axios";
import Login from "./main-views/Login";
import Register from "./main-views/Register";
import Dashboard from "./main-views/Dashboard";
import Services from "./main-views/Services";
import ServiceForm from "./views/ServiceForm";

export const BASE_API = "http://localhost:3000";

export function getMainView(app) {
  if (!app.token && app.navItem !== "login") {
    if (app.navItem === "register") return <Register />;
    return <Login />;
  }

  if (app.navItem === "dashboard") return <Dashboard />;
  if (app.navItem === "services") return <Services />;
  if (app.navItem === "service-form") return <ServiceForm />;
  if (app.navItem === "register") return <Register />;
  return <Login />;
}

export async function callApi(url, method = "POST", data = {}, token = null) {
  try {
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (data instanceof FormData) {
      delete headers["Content-Type"];
    }

    const config = {
      method,
      url: BASE_API + url,
      headers,
    };

    // Only attach data for non-GET requests
    if (method !== "GET") {
      config.data = data;
    }

    const res = await axios(config);

    if (res.data.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "#/login";
    }

    return res.data;
  } catch (error) {
    return { status: 0, msg: "Network Error", error };
  }
}
