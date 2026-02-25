import React, { createContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { getMainView } from "./Helpers";

export const AppContext = createContext(null);

export default function App() {
  const navigate = useNavigate();
  const {
    _navItem = "home",
    _navSubItem = null,
    _navExtraItem = null,
    _navMoreItem = null,
  } = useParams();

  function navTo(nav) {
    if (!nav) return;

    let path = "/";

    if (nav.item) path += `${nav.item}/`;
    if (nav.subItem) path += `${nav.subItem}/`;
    if (nav.extraItem) path += `${nav.extraItem}/`;
    if (nav.moreItem) path += `${nav.moreItem}/`;

    navigate(path);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function tellError(msg) {
    console.error(msg);
  }

  function tellSuccess(msg) {
    console.log(msg);
  }

  function refresh() {
    window.location.reload();
  }

  // Scroll to top when navigation item changes
  useEffect(() => {
    scrollToTop();
  }, [_navItem]);

  const appContext = {
    navTo,
    navItem: _navItem,
    navSubItem: _navSubItem,
    navExtraItem: _navExtraItem,
    navMoreItem: _navMoreItem,
    tellError,
    tellSuccess,
    refresh,
    scrollToTop,
  };

  return (
    <AppContext.Provider value={appContext}>
      <Navbar />
      {getMainView(appContext)}
    </AppContext.Provider>
  );
}
