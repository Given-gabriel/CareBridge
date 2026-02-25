import HomeHero from "../Ones/HomeHero.js";
import ServicesGrid from "../Ones/ServicesGrid.js";
import AboutSection from "../Ones/AboutSection";
import ContactSection from "../Ones/ContactSection";
import Footer from "../Ones/Footer";

export default function HomeLanding() {
  return (
    <>
      <HomeHero />
      <AboutSection short={true} />
      <ServicesGrid preview={true} />
      <ContactSection preview={true} />
      <Footer />
    </>
  );
}
