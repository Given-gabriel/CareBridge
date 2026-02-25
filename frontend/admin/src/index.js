import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./index.css";
import "./App.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter basename="/">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:_navItem" element={<App />} />
      <Route path="/:_navItem/:_navSubItem" element={<App />} />
    </Routes>
  </HashRouter>,
);
