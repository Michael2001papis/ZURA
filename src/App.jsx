import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Nav from "./components/Nav";
import LoginModal from "./components/LoginModal";
import BusinessArea from "./components/BusinessArea";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ContactOverlay, {
  getVisitCount,
  setVisitCount,
  shouldShowOverlay,
  OVERLAY_CLOSED_KEY,
} from "./components/ContactOverlay";
import ScrollToTop from "./components/ScrollToTop";
import SkipToContent from "./components/SkipToContent";

const BUSINESS_USER = "zura";

function AppContent() {
  const { user } = useAuth();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const isBusiness = user === BUSINESS_USER;

  useEffect(() => {
    const count = getVisitCount();
    setVisitCount(count + 1);

    if (shouldShowOverlay()) {
      localStorage.removeItem(OVERLAY_CLOSED_KEY);
      const t = setTimeout(() => setOverlayOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const closeOverlay = () => {
    setOverlayOpen(false);
    localStorage.setItem(OVERLAY_CLOSED_KEY, "true");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (overlayOpen || loginModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [overlayOpen, loginModalOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (overlayOpen) closeOverlay();
      if (loginModalOpen) setLoginModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlayOpen, loginModalOpen]);

  return (
    <>
      <SkipToContent />
      <Nav onOpenLogin={() => setLoginModalOpen(true)} />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        {isBusiness && <BusinessArea />}
      </main>
      <Footer />
      <ContactOverlay open={overlayOpen} onClose={closeOverlay} />
      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
