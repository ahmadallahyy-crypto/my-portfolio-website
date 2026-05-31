import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import Headermain from "./components/Header/Header";
import AnimatedCursor from "./hooks/AnimatedCursor";
import Socialicons from "./components/SocialIcons/SocialIcons";
import AppRoutes from "./routes";

import "./App.css";

function ScrollToTop({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <>{children}</>;  // ✅ wrap in fragment
}

function AppContent() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "black";  // ✅ safe lazy init
    } catch {
      return "black";
    }
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      if (currentTheme) setTheme(currentTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isBlack = theme === "black";
  const cursorColor = isBlack ? "255, 255, 255" : "0, 0, 0";
  const smokeColor  = isBlack ? "220, 220, 220" : "40, 40, 40";

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color={cursorColor}
        outerAlpha={0.25}
        innerScale={0.7}
        outerScale={6}
        trailingSpeed={8}
        smokeEnabled={true}
        smokeDensity={4}
        smokeSize={24}
        smokeFadeSpeed={600}
        smokeColor={smokeColor}
      />
      <Socialicons />
      <ScrollToTop>
        <Headermain />
        <AppRoutes />
      </ScrollToTop>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}