import { useContext } from "react";
import { AppContext } from "../App.js";
import AboutLanding from "../views/AboutLanding.js";

export default function About() {
  const appContext = useContext(AppContext);

  if (!appContext.navSubItem) {
    return <AboutLanding />;
  }

  return null;
}
