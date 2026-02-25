import { createContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMainView } from "./Helpers";
import Sidebar from "./components/Sidebar";

export const AppContext = createContext(null);

export default function App() {
  const navigate = useNavigate();
  const { _navItem = "login", _navSubItem = null } = useParams();
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  function navTo(nav) {
    if (!nav) return;

    let path = "/";

    if (nav.item) path += `${nav.item}/`;
    if (nav.subItem) path += `${nav.subItem}/`;

    navigate(path);
  }

  async function logout() {
    try {
      // Call backend logout API to invalidate token in database
      const response = await fetch("http://localhost:3000/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Logout response:", data);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage and redirect
      localStorage.removeItem("adminToken");
      setToken(null);
      navTo({ item: "login" });
    }
  }

  function tellError(msg) {
    console.error(msg);
  }

  function tellSuccess(msg) {
    console.log(msg);
  }

  const appContext = {
    navItem: _navItem,
    navSubItem: _navSubItem,
    navTo,
    token,
    setToken,
    logout,
    tellError,
    tellSuccess,
  };

  // If not logged in and trying to access other pages, redirect to login
  if (!token && _navItem !== "login") {
    return getMainView(appContext);
  }

  return (
    <div className="admin-layout">
      {token && _navItem !== "login" && <Sidebar appContext={appContext} />}
      <div className="admin-main">
        <AppContext.Provider value={appContext}>
          {getMainView(appContext)}
        </AppContext.Provider>
      </div>
    </div>
  );
}
