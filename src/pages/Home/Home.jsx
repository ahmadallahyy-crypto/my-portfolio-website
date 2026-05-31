import React from "react";
import "./Home.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { introdata, meta, socialprofils, resumeLink } from "../../data/content.jsx";
import { HiBriefcase, HiDownload } from "react-icons/hi";

export const Home = () => {
  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeLink.url;
    link.download = resumeLink.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <section className="hero__section">

        {/* Main hero content */}
        <div className="hero__main">

          {/* Left — text content */}
          <div className="hero__left">
            <motion.p
              className="hero__greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Hello, I am
            </motion.p>

            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {introdata.title || "Enesi Y.Y"}
            </motion.h1>

            <motion.div
              className="hero__typewriter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Typewriter
                options={{
                  strings: [
                    introdata.animated.first,
                    introdata.animated.second,
                    introdata.animated.third,
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                }}
              />
            </motion.div>

            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {introdata.description}
            </motion.p>

            <motion.div
              className="hero__meta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <p className="hero__meta__item">
                <span className="hero__meta__label">Title</span>
                <span className="hero__meta__value">{meta.title}</span>
              </p>
              <p className="hero__meta__item">
                <span className="hero__meta__label">Based in</span>
                <span className="hero__meta__value">Kano State, Nigeria</span>
              </p>
              <p className="hero__meta__item">
                <span className="hero__meta__label">Available for</span>
                <span className="hero__meta__value">Freelance & Full-time</span>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <a href="/portfolio" className="hero__btn hero__btn--primary">
                <HiBriefcase /> View My Portfolio
              </a>
              <button onClick={handleDownloadResume} className="hero__btn hero__btn--primary">
                <HiDownload /> Download Resume
              </button>
              <a href="/contact" className="hero__btn hero__btn--outline">
                {introdata.buttons.contactMe}
              </a>
            </motion.div>
          </div>

          {/* Right — profile image */}
          <motion.div
            className="hero__right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hero__img__wrapper">
              <img
                src={introdata.your_img_url}
                alt={introdata.title}
                className="hero__img"
              />
            </div>
          </motion.div>

        </div>

      </section>
    </HelmetProvider>
  );
};

export default Home;