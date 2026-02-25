import { useContext } from "react";
import { AppContext } from "../App";
import HomeLanding from "../views/HomeLanding";

export default function Home() {
  const appContext = useContext(AppContext);

  if (!appContext.navSubItem) {
    return <HomeLanding />;
  }

  return null;
}
