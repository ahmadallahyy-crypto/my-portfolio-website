// ThemeToggle.jsx
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const Themetoggle = () => {
  // Initialize theme from localStorage or default to "light" (not "white")
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    // Check if theme exists in localStorage
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      return savedTheme;
    }
    return "light";  // Changed from "white" to "light"
  });

  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute("data-theme", theme);
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? (
        <FiMoon size={22} />  // Increased icon size, removed text
      ) : (
        <FiSun size={22} />   // Increased icon size, removed text
      )}
    </button>
  );
};

export default Themetoggle;