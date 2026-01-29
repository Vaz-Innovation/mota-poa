import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Lawyers from "@/components/Lawyers";
import LatestNews from "@/components/LatestNews";
import Contact from "@/components/Contact";
import ProcessConsultation from "@/components/ProcessConsultation";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <ProcessConsultation />
        <About />
        <PracticeAreas />
        <Lawyers />
        <LatestNews />
        <Contact />
      </main>
      <Newsletter />
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
};

export default Index;
