import { useState, useEffect } from "react";
import "./Header.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { logotext, socialprofils } from "../../data/content.jsx";
import Themetoggle from "../ThemeToggle/ThemeToggle";

const Headermain = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
    document.body.classList.toggle("menu-open");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isActive) {
        setActive(false);
        document.body.classList.remove("ovhidden", "menu-open");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isActive]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("ovhidden", "menu-open");
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="site__header">
        <div className="header-container">
          <div className="header-logo-wrapper">
            <Link className="logo-link" to="/">
              {logotext}
            </Link>
          </div>
          <div className="header-right">
            <Themetoggle />
            <button
              className="mobile-menu-btn"
              onClick={handleToggle}
              aria-label="Toggle menu"
            >
              {isActive ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION */}
      <div className={`mobile-nav ${isActive ? "active" : ""}`}>
        <div className="mobile-nav-overlay">
          <div className="mobile-nav-container">
            <button
              className="mobile-close-btn"
              onClick={handleToggle}
              aria-label="Close menu"
            >
              <VscClose />
            </button>

            <ul className="mobile-nav-menu">
              <li><Link to="/" onClick={handleToggle}>Home</Link></li>
              <li><Link to="/portfolio" onClick={handleToggle}>Portfolio</Link></li>
              <li><Link to="/about" onClick={handleToggle}>About</Link></li>
              <li><Link to="/contact" onClick={handleToggle}>Contact</Link></li>
            </ul>

            <div className="mobile-nav-footer">
              <p className="copyright m-0">copyright __ {logotext}</p>
            </div>
          </div>
        </div>
      </div>

      {/* DECORATIVE BORDERS */}
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;