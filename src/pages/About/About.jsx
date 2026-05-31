import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  dataabout,
  meta,
  skills,
  services,
  education,
} from "../../data/content.jsx";
import "./About.css";

export const About = () => {
  const categories = [...new Set(skills.map((skill) => skill.category))];

  // Load Font Awesome reliably via DOM injection
  useEffect(() => {
    const existing = document.querySelector('link[data-fa="true"]');
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css";
      link.setAttribute("data-fa", "true");
      document.head.appendChild(link);
    }
  }, []);

  const getSkillIcon = (skillName) => {
    const icons = {
      "JavaScript / TypeScript":    "fab fa-js",
      "React / Next.js":            "fab fa-react",
      "Python / Django":            "fab fa-python",
      "Node.js / Express":          "fab fa-node-js",
      "HTML5 / CSS3 / Tailwind":    "fab fa-html5",
      "SQL / MongoDB":              "fas fa-database",
      "Process Optimization":       "fas fa-sliders",
      "Chemical Process Simulation":"fas fa-flask",
      "Industrial Safety":          "fas fa-hard-hat",
      "Plant Operations":           "fas fa-industry",
      "Technical Analysis":         "fas fa-chart-line",
      "Fundamental Analysis":       "fas fa-magnifying-glass-chart",
      "Risk Management":            "fas fa-shield-halved",
      "Trading Psychology":         "fas fa-brain",
      "MetaTrader Platforms":       "fas fa-desktop",
      "Market Trend Analysis":      "fas fa-globe",
    };
    return icons[skillName] || "fas fa-circle-dot";
  };

  return (
    <HelmetProvider>
      <div className="about-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* Header */}
        <div className="about-header">
          <h1 className="display-4 mb-4">About me</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </div>

        {/* Two Column Grid */}
        <div className="two-column-grid">

          {/* ── LEFT COLUMN ── */}
          <div className="left-column">

            {/* About Me */}
            <div className="section-card">
              <div className="section-header">
                <span className="section-header-icon">
                  <i className="fas fa-user"></i>
                </span>
                <h3 className="section-title">{dataabout.title}</h3>
              </div>
              <div className="section-content">
                <p className="about-text">{dataabout.aboutme}</p>
              </div>
            </div>

            {/* Education */}
            <div className="section-card">
              <div className="section-header">
                <span className="section-header-icon">
                  <i className="fas fa-graduation-cap"></i>
                </span>
                <h3 className="section-title">Education</h3>
              </div>
              <div className="section-content">
                {education && education.map((edu, i) => (
                  <div key={edu.id || i} className="education-item">
                    <div className="education-header">
                      <h4 className="education-degree">{edu.degree}</h4>
                      <span className="education-date">{edu.date}</span>
                    </div>
                    <p className="education-institution">
                      <i className="fas fa-building-columns"></i>
                      {edu.institution} · {edu.location}
                    </p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="education-achievements">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>
                            <i className="fas fa-angle-right"></i>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="right-column">

            {/* Skills */}
            <div className="section-card">
              <div className="section-header">
                <span className="section-header-icon">
                  <i className="fas fa-layer-group"></i>
                </span>
                <h3 className="section-title">Skills</h3>
              </div>
              <div className="section-content">
                {categories.map((category, catIndex) => (
                  <div key={catIndex} className="skill-category">
                    <h4 className="skill-category-title">{category}</h4>
                    <ul className="skills-list">
                      {skills
                        .filter((skill) => skill.category === category)
                        .map((skill, idx) => (
                          <li key={idx} className="skill-item">
                            <span className="skill-icon">
                              <i className={getSkillIcon(skill.name)}></i>
                            </span>
                            <span className="skill-name">{skill.name}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="section-card">
              <div className="section-header">
                <span className="section-header-icon">
                  <i className="fas fa-concierge-bell"></i>
                </span>
                <h3 className="section-title">Services</h3>
              </div>
              <div className="section-content">
                <div className="services-list">
                  {services && services.map((data, i) => (
                    <div className="service-item" key={i}>
                      <h5 className="service__title">{data.title}</h5>
                      <p className="service_desc">{data.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default About;