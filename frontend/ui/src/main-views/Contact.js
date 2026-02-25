import { useContext } from "react";
import { AppContext } from "../App";
import ContactLanding from "../views/ContactLanding";

export default function Contact() {
  const appContext = useContext(AppContext);

  if (!appContext.navSubItem) {
    return <ContactLanding />;
  }

  return null;
}
